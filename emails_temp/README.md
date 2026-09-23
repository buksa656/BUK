# FlowForma Email Template Editor V2

Self-hosted on Synology Web Station.

## Folder

Copy the contents into:

`/web/aci/`

## V2 features

- Visual email editing
- HTML source editing
- Visual/source synchronization
- Desktop/mobile preview
- Basic formatting toolbar
- Undo/redo
- Template selector
- Protected FlowForma `fftoken` elements in the visual editor
- Copy/download HTML
- Save to NAS through `api.php`
- Automatic `.history` backups when a template is saved

## Important NAS setup

V2's **Save to NAS** button requires PHP for `api.php`.

Install PHP 8.2 (or another supported PHP version) in Web Station and configure the `aci` web service to use a PHP profile. The static HTML/CSS/JS parts continue to be served by Nginx.

The PHP process needs write permission to:

`/web/aci/templates/`

and should ideally have access to create:

`/web/aci/templates/.history/`

Do not expose this editor publicly until authentication/access control is configured.

## FlowForma tokens

Existing tokens in the source template are preserved. V2 marks `img.fftoken` elements as protected in the visual editor so their internal `data-value` and token image cannot be casually edited.

The token insertion buttons are intentionally conservative in V2: they do not invent replacement base64 token images. New token creation should use an existing valid FlowForma token from the source template.
