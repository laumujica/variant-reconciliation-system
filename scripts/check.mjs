import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fixtures=read('demo/fixtures.js'),app=read('demo/app.js');
const results=[];
function check(name,fn){fn();results.push(name);}

// No browser is simulated: these checks exercise the actual review-state,
// summary and export functions in a Node VM. Visual/interaction QA is separate.
const dataContext={window:{}};vm.createContext(dataContext);vm.runInContext(fixtures,dataContext);
const data=dataContext.window.VRS_FIXTURES;
check('short demo dimensions and representative choices',()=>{
  assert.equal(data.sources.length,3);assert.equal(data.components.length,4);
  assert.equal(data.components.reduce((n,c)=>n+c.options.length,0),9);
  assert.equal(new Set(data.components.flatMap(c=>c.options.map(o=>o.id))).size,9);
  assert.equal(data.components.filter(c=>c.mode==='multi').length,1);
});
check('all source references and SVG assets resolve',()=>{
  const sourceIDs=new Set(data.sources.map(s=>s.id));
  for(const c of data.components)for(const o of c.options){
    assert(o.sources.every(id=>sourceIDs.has(id)));assert(fs.existsSync(path.join(root,'demo',o.crop)));
    assert(read('demo/'+o.crop).includes('<svg'));
  }
  for(const s of data.sources)assert(fs.existsSync(path.join(root,'demo',s.thumb)));
});
check('public content has no remote source links or backend configuration',()=>{
  const prohibited=/drive\.google\.com|firebaseapp\.com|firebasestorage|apiKey/i;
  function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(/\.(html|css|js|md|svg|json)$/.test(entry.name))assert(!prohibited.test(fs.readFileSync(p,'utf8')),path.relative(root,p));
  }}
  walk(path.join(root,'demo'));walk(path.join(root,'docs'));assert(!prohibited.test(read('README.md')));
  assert(!/https?:\/\//.test(fixtures+app));assert(!/<script[^>]+src="https?:/.test(read('demo/index.html')));
});
check('JavaScript parses',()=>{new vm.Script(app);new vm.Script(fixtures);});

class NodeStub{
  constructor(){this.value='';this.innerHTML='';this.textContent='';this.style={};this.disabled=false;this.classList={add(){},remove(){},toggle(){},contains(){return false;}};}
  querySelector(){return new NodeStub();}querySelectorAll(){return [];}addEventListener(){}setAttribute(){}appendChild(){}click(){}remove(){}focus(){}
}
const nodes=new Map();
const get=q=>{if(!nodes.has(q))nodes.set(q,new NodeStub());return nodes.get(q);};
get('#globalReviewer').value='Reviewer';
const memory=new Map(),alerts=[],blobs=[],downloads=[];
const context={window:{VRS_FIXTURES:data,scrollTo(){}},document:{querySelector:get,querySelectorAll:()=>[],getElementById:id=>get('#'+id),createElement:()=>{const n=new NodeStub();n.click=()=>downloads.push(n.download);return n;},body:new NodeStub()},localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},console,Date,Blob,URL:{createObjectURL:b=>{blobs.push(b);return 'blob:test';},revokeObjectURL(){}},setTimeout:fn=>{fn();return 0;},alert:m=>alerts.push(m),confirm:()=>true};
vm.createContext(context);
const instrumented=app.replace('window.openBoard42=openBoard42;',`window.reviewTest={get state(){return state42;},components:C42,reset:()=>state42=baseState42(),normalize:normalize42,resolved:allResolved42,locked:finalApproved42,ready:adminReady42,save:save42,status:status42,summary:summaryCard42,export:exportMD42,chooseNone:chooseNone42,canApprove:canApprove42,approve:approveComponent42,addLink:addReferenceLink42,addFile:addReferenceFile42,removeReference:removeReference42,fileOperation:fileOperation42};window.openBoard42=openBoard42;`);
vm.runInContext(instrumented,context);
const engine=context.window.reviewTest;
context.URL=Object.assign(class extends URL{},context.URL);
check('fresh review blocks final approval and export',()=>{assert(!engine.resolved());assert(!engine.locked());assert(!engine.ready());engine.export();assert.equal(downloads.length,0);assert(alerts.length>0);});
check('single and multi selections preserve their extracted content',()=>{
  const opening=engine.state.components.c01;opening.selected=['c01_a'];opening.approved=true;opening.note='Keep this opening.';
  const callouts=engine.state.components.c04;callouts.selected=['c04_q1','c04_q3'];callouts.approved=true;
  assert(engine.summary(engine.components[0],0).includes('Keep this opening.'));
  const summary=engine.summary(engine.components.find(c=>c.id==='c04'),1);assert(summary.includes('Clarity before production'));assert(summary.includes('Ask one useful question'));
  assert(!engine.ready());
});
check('all resolved groups lock selections but still require Text QA',()=>{
  const exception=engine.state.components.c08;
  exception.selected=['c08_v4'];
  assert(engine.approve('c08','Use for the pilot only.','https://example.org/pilot'));
  engine.state.components.c05.excluded=true;
  assert(engine.resolved());assert(engine.locked());assert(!engine.ready());
  assert.deepEqual(Array.from(engine.status(engine.components.find(c=>c.id==='c05'))),['EXCLUDED','excl']);
});
check('ordinary approval retains notes and a typed reference link',()=>{
  const exception=engine.components.find(c=>c.id==='c08');
  assert.deepEqual(Array.from(engine.status(exception)),['APPROVED','ok']);
  assert(engine.summary(exception,2).includes('Use for the pilot only.'));
  assert(engine.summary(exception,2).includes('https://example.org/pilot'));
});
check('QA completion enables export; clearing QA disables it',()=>{
  engine.state.components.c01.qa=true;engine.state.components.c04.qa=true;
  assert(!engine.ready());engine.state.components.c08.qa=true;assert(engine.ready());
  engine.state.components.c01.qa=false;assert(!engine.ready());engine.state.components.c01.qa=true;
});
engine.state.sourceNotes[1]='Prefer the shorter introduction.';
check('None of these clears approval and blocks export until resolved',()=>{
  engine.chooseNone('c05');
  assert.deepEqual(Array.from(engine.status(engine.components.find(c=>c.id==='c05'))),['NONE OF THESE','rev']);
  assert(!engine.locked());assert(!engine.ready());
  assert.equal(engine.state.components.c05.selected.length,0);
  assert(engine.summary(engine.components.find(c=>c.id==='c05'),3).includes('No alternative accepted'));
  engine.state.components.c05.noneSelected=false;engine.state.components.c05.excluded=true;
  assert(engine.ready());
});
check('reference links validate protocol and survive saved state',()=>{
  assert.equal(engine.addLink('c08','javascript:alert(1)'),false);
  assert.equal(engine.addLink('c08','https://example.org/reference'),true);
  const saved=engine.normalize(JSON.parse(memory.get('vrs-demo-short-1')));
  assert(saved.components.c08.references.some(r=>r.url==='https://example.org/reference'));
});
// Exercise attachment metadata and binary storage with an in-memory IndexedDB
// adapter. Native browser storage and file-picker interaction remain browser QA.
const storedFiles=new Map();
context.window.indexedDB={open(){
  const request={result:{transaction(){
    const tx={objectStore:()=>({
      put(file,id){storedFiles.set(id,file);const req={};queueMicrotask(()=>tx.oncomplete());return req;},
      get(id){const req={result:storedFiles.get(id)};queueMicrotask(()=>tx.oncomplete());return req;},
      delete(id){storedFiles.delete(id);const req={};queueMicrotask(()=>tx.oncomplete());return req;}
    })};return tx;
  }}};queueMicrotask(()=>request.onsuccess());return request;
}};
const referenceFile=new Blob(['Reference attachment bytes'],{type:'text/plain'});
Object.defineProperty(referenceFile,'name',{value:'reference.txt'});
await engine.addFile('c08',referenceFile);
const fileRef=engine.state.components.c08.references.find(r=>r.kind==='file');
const storedFile=await engine.fileOperation('get',fileRef.id);
check('attachment bytes and metadata remain available after adding',()=>{
  assert.equal(storedFile.size,referenceFile.size);
  assert(engine.normalize(JSON.parse(memory.get('vrs-demo-short-1'))).components.c08.references.some(r=>r.name==='reference.txt'));
});
engine.export();
const exported=await blobs.at(-1).text();
check('export includes selections, notes, exclusions and source notes',()=>{
  assert.equal(downloads.at(-1),'Creative_Collaboration_Approved_Content.md');
  for(const text of ['Keep this opening.','Prefer the shorter introduction.','Decision: Excluded','Decision: Approved','Use for the pilot only.','A clear decision is a useful production input.','Ask the question that changes the next step.','Text QA: Confirmed','Source variants: 3','Reference link: https://example.org/reference','Reference link: https://example.org/pilot','Attachment: reference.txt'])assert(exported.includes(text),text);
});
check('persisted review restores notes and selections',()=>{
  engine.save(true,'Checked persistence','Approved review');
  const saved=JSON.parse(memory.get('vrs-demo-short-1'));const restored=engine.normalize(saved);
  assert.equal(restored.sourceNotes[1],'Prefer the shorter introduction.');assert.equal(restored.components.c01.note,'Keep this opening.');assert.equal(restored.components.c01.selected[0],'c01_a');
});
engine.chooseNone('c05');
check('None of these approves a typed link and restores its approval',()=>{
  assert(!engine.canApprove('c05'));assert(!engine.approve('c05','No reference yet'));
  assert(engine.canApprove('c05','https://example.org/alternative'));
  assert(engine.approve('c05','Use this alternative.','https://example.org/alternative'));
  assert(engine.ready());assert(!engine.state.components.c05.qa);
  const restored=engine.normalize(JSON.parse(memory.get('vrs-demo-short-1')));
  assert(restored.components.c05.approved&&restored.components.c05.noneSelected);
  const card=engine.summary(engine.components.find(c=>c.id==='c05'),3);
  assert(card.includes('Alternative supplied by file or link.'));assert(card.includes('Use this alternative.'));
});
engine.export();
const alternativeExport=await blobs.at(-1).text();
check('approved alternative reaches Markdown without nonexistent crop QA',()=>{
  assert(alternativeExport.includes('Selection: Alternative supplied by file or link'));
  assert(alternativeExport.includes('Text QA: Not applicable (reference only)'));
  assert(alternativeExport.includes('Reference link: https://example.org/alternative'));
  assert(alternativeExport.includes('Use this alternative.'));
});
engine.chooseNone('c05');
engine.removeReference('c05',engine.state.components.c05.references[0].id);
await engine.addFile('c05',referenceFile);
check('None of these approves a file; removing the last reference reopens it',()=>{
  assert(engine.canApprove('c05'));assert(engine.approve('c05','Use the attached alternative.'));
  assert(engine.ready());
  const restored=engine.normalize(JSON.parse(memory.get('vrs-demo-short-1')));
  assert(restored.components.c05.approved);assert.equal(restored.components.c05.references[0].name,'reference.txt');
  engine.removeReference('c05',engine.state.components.c05.references[0].id);
  assert(!engine.state.components.c05.approved);assert(!engine.ready());assert(!engine.canApprove('c05'));
});
check('demo reset clears only its own review key',()=>{
  memory.set('unrelated-review','keep');get('#resetDemo').onclick();
  assert(!engine.resolved());assert.equal(engine.state.components.c01.selected.length,0);assert.equal(engine.state.sourceNotes[1],'');assert.equal(memory.get('unrelated-review'),'keep');
});
check('export survives unavailable browser storage',()=>{
  for(const c of engine.components)engine.state.components[c.id].excluded=true;
  const write=context.localStorage.setItem;
  context.localStorage.setItem=()=>{throw new Error('Storage unavailable');};
  const count=downloads.length;
  try{assert.doesNotThrow(()=>engine.export());assert.equal(downloads.length,count+1);}
  finally{context.localStorage.setItem=write;}
});
console.log(results.map(n=>'PASS · '+n).join('\n'));
console.log(`\n${results.length} checks passed. Browser visual/interaction QA is separate.`);
