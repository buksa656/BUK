const $ = id => document.getElementById(id);
const canvas = $("canvas"), source = $("source"), select = $("templateSelect");
let templates = [], current = null, iframe = null, syncing = false, history = [], future = [];
let deviceWidth = 700;

const TOKEN_DEFS = {
  formlink: {
    label: "FormLink",
    html: "[FormLink]"
  },
  "change-control": {
    label: "Change Control",
    html: `<img class="fftoken" data-text="Unique Change Control number" data-value="{'StepCode':'PreA QA','QuestionCode':'PreA.1a-Q4','Type':'question','SubQuestionCode':null,'StepId':33,'QuestionId':149}" src="data:image/png;base64,REPLACE_WITH_EXISTING_TOKEN_IMAGE" style="height:1em;border:1px solid black;vertical-align:middle;" />`
  },
  "change-title": {
    label: "Change Title",
    html: `<img class="fftoken" data-text="Change Title" data-value="{'StepCode':'PreA','QuestionCode':'PreA.GTUyWCuLg3','Type':'question','SubQuestionCode':null,'StepId':28,'QuestionId':139}" src="data:image/png;base64,REPLACE_WITH_EXISTING_TOKEN_IMAGE" style="height:1em;border:1px solid black;vertical-align:middle;" />`
  },
  requester: {
    label: "Requester",
    html: `<img class="fftoken" data-text="Change Requester" data-value="{'StepCode':'PreA','QuestionCode':'PreA.ptqGWau51U','Type':'question','SubQuestionCode':null,'StepId':28,'QuestionId':140}" src="data:image/png;base64,REPLACE_WITH_EXISTING_TOKEN_IMAGE" style="height:1em;border:1px solid black;vertical-align:middle;" />`
  },
  "step-title": {
    label: "Step Title",
    html: `<img class="fftoken" data-text="Step Title" data-value="{StepTitle}" src="data:image/png;base64,REPLACE_WITH_EXISTING_TOKEN_IMAGE" style="height:1em;border:1px solid black;vertical-align:middle;" />`
  },
  "step-assigned": {
    label: "Step Assigned To",
    html: `<img class="fftoken" data-text="Step Assigned To" data-value="{StepAssignedTo}" src="data:image/png;base64,REPLACE_WITH_EXISTING_TOKEN_IMAGE" style="height:1em;border:1px solid black;vertical-align:middle;" />`
  }
};

async function getJSON(url){
  const r=await fetch(url,{cache:"no-store"});
  if(!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}
async function getText(url){
  const r=await fetch(url,{cache:"no-store"});
  if(!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.text();
}
function state(t){$("saveState").textContent=t}
function currentHTML(){return source.value}
function setSource(html){source.value=html}
function cleanForEditor(doc){
  doc.querySelectorAll("img.fftoken").forEach(el=>{
    el.contentEditable="false";
    el.classList.add("token-locked");
    el.draggable=false;
  });
  doc.querySelectorAll("script").forEach(el=>el.remove());
  doc.body.contentEditable="true";
}
function attachEditor(){
  const doc=iframe.contentDocument;
  if(!doc || !doc.body) return;
  cleanForEditor(doc);
  doc.addEventListener("selectionchange", updateSelection);
  doc.body.addEventListener("input", ()=>{
    if(syncing) return;
    pushHistory();
    syncFromVisual();
  });
  doc.addEventListener("click", e=>{
    if(e.target.closest("img.fftoken")) e.preventDefault();
  });
  updateSelection();
}
function makeFrame(html){
  const f=document.createElement("iframe");
  f.className="email-frame";
  f.style.width=deviceWidth+"px";
  f.srcdoc=html;
  f.addEventListener("load",attachEditor,{once:true});
  return f;
}
function render(html){
  canvas.innerHTML="";
  iframe=makeFrame(html);
  canvas.appendChild(iframe);
}
function serialize(){
  if(!iframe?.contentDocument) return source.value;
  const doc=iframe.contentDocument;
  return "<!doctype html>\n"+doc.documentElement.outerHTML;
}
function syncFromVisual(){
  syncing=true;
  setSource(serialize());
  syncing=false;
  state("Modified");
}
function syncFromSource(){
  syncing=true;
  render(source.value);
  syncing=false;
  state("Modified");
}
function pushHistory(){
  const v=currentHTML();
  if(!history.length || history[history.length-1]!==v) history.push(v);
  if(history.length>40) history.shift();
  future=[];
}
function restore(v){
  syncing=true; setSource(v); render(v); syncing=false; state("Modified");
}
function updateSelection(){
  if(!iframe?.contentDocument) return;
  const sel=iframe.contentDocument.getSelection();
  if(!sel || !sel.rangeCount){$("selectionInfo").textContent="Nothing selected";return}
  const el=sel.anchorNode?.nodeType===3?sel.anchorNode.parentElement:sel.anchorNode;
  if(!el){$("selectionInfo").textContent="Nothing selected";return}
  const locked=el.closest?.(".fftoken");
  $("selectionInfo").textContent=locked ? "FlowForma token (protected)" : el.tagName.toLowerCase();
}
function exec(cmd,val=null){
  if(!iframe?.contentDocument) return;
  iframe.contentDocument.execCommand(cmd,false,val);
  syncFromVisual();
}
async function loadTemplate(id){
  const t=templates.find(x=>x.id===id);
  if(!t) return;
  current=t;
  const html=await getText(t.file);
  history=[html]; future=[];
  setSource(html); render(html); state("Loaded");
}
function populate(){
  select.innerHTML="";
  templates.forEach(t=>{
    const o=document.createElement("option");o.value=t.id;o.textContent=t.name;select.appendChild(o);
  });
  if(templates[0]){select.value=templates[0].id;loadTemplate(select.value).catch(e=>state("Load failed: "+e.message))}
}
async function saveToNAS(){
  const html=currentHTML();
  try{
    state("Saving…");
    const r=await fetch("api.php?action=save",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:current.id,html})
    });
    const data=await r.json();
    if(!r.ok || !data.ok) throw new Error(data.error||"Save failed");
    state("Saved to NAS");
    history=[html];future=[];
  }catch(e){
    state("Save unavailable");
    alert("The editor could not save to the NAS.\n\n"+e.message+"\n\nMake sure PHP is enabled for this Web Station site and api.php is available.");
  }
}
$("saveBtn").onclick=saveToNAS;
$("copyBtn").onclick=async()=>{await navigator.clipboard.writeText(currentHTML());state("HTML copied")};
$("downloadBtn").onclick=()=>{
  const b=new Blob([currentHTML()],{type:"text/html;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=(current?.id||"template")+".html";a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),500);state("Downloaded");
};
source.addEventListener("input",()=>{syncFromSource()});
select.addEventListener("change",()=>loadTemplate(select.value).catch(e=>state("Load failed: "+e.message)));

document.querySelectorAll("[data-cmd]").forEach(b=>b.onclick=()=>exec(b.dataset.cmd));
$("fontSize").onchange=e=>{if(e.target.value)exec("fontSize",e.target.value);e.target.value=""};
$("align").onchange=e=>{if(e.target.value)exec(e.target.value);e.target.value=""};
$("textColor").oninput=e=>exec("foreColor",e.target.value);
$("linkBtn").onclick=()=>{
  const url=prompt("Link URL:");
  if(url) exec("createLink",url);
};
$("undoBtn").onclick=()=>{
  if(history.length>1){future.push(history.pop());restore(history[history.length-1])}
};
$("redoBtn").onclick=()=>{
  if(future.length){const v=future.pop();history.push(v);restore(v)}
};
document.querySelectorAll(".device").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".device").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");deviceWidth=Number(b.dataset.width);
  if(iframe) iframe.style.width=deviceWidth+"px";
});
document.querySelectorAll(".token-btn").forEach(b=>b.onclick=()=>{
  if(!iframe?.contentDocument) return;
  const key=b.dataset.token;
  if(key==="formlink"){ exec("insertText","[FormLink]"); return; }

  const wanted={
    "change-control":"Unique Change Control number",
    "change-title":"Change Title",
    requester:"Change Requester",
    "step-title":"Step Title",
    "step-assigned":"Step Assigned To"
  }[key];

  const existing=[...iframe.contentDocument.querySelectorAll("img.fftoken")]
    .find(img=>img.dataset.text===wanted);

  if(!existing){
    alert("This FlowForma token is not present in the current template, so V2 will not invent one.");
    return;
  }

  const clone=existing.cloneNode(true);
  clone.classList.add("token-locked");
  clone.contentEditable="false";
  const sel=iframe.contentDocument.getSelection();
  if(sel && sel.rangeCount){
    const range=sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(clone);
    range.setStartAfter(clone);
    range.collapse(true);
  } else {
    iframe.contentDocument.body.appendChild(clone);
  }
  syncFromVisual();
});

getJSON("templates.json").then(x=>{templates=x;populate()}).catch(e=>state("Cannot load templates: "+e.message));
