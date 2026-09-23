<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$base = __DIR__ . DIRECTORY_SEPARATOR . 'templates';
$map = [
  'action-assigned' => 'action-assigned.html'
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || ($_GET['action'] ?? '') !== 'save') {
    http_response_code(405);
    echo json_encode(['ok'=>false,'error'=>'Only POST /api.php?action=save is supported.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? '';
$html = $input['html'] ?? '';

if (!isset($map[$id])) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'Unknown template.']);
    exit;
}
if (!is_string($html) || trim($html)==='') {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'Empty HTML.']);
    exit;
}

/* Basic guard: the editor must never save PHP into an email template. */
if (stripos($html, '<?php') !== false || stripos($html, '<?') !== false) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'Unsafe template content.']);
    exit;
}

$file = $base . DIRECTORY_SEPARATOR . $map[$id];
$backupDir = $base . DIRECTORY_SEPARATOR . '.history';
if (!is_dir($backupDir)) @mkdir($backupDir, 0775, true);

if (is_file($file)) {
    $stamp = date('Ymd-His');
    @copy($file, $backupDir . DIRECTORY_SEPARATOR . $id . '-' . $stamp . '.html');
}

if (@file_put_contents($file, $html, LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['ok'=>false,'error'=>'Could not write template file. Check Web Station/PHP permissions.']);
    exit;
}

echo json_encode(['ok'=>true,'file'=>$map[$id]]);
