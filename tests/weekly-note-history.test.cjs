const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {loadModel}=require('../scripts/finance-review.cjs');
const model=loadModel('review-note-model');
const exported={};
new Function('exports','require',ts.transpileModule(fs.readFileSync(path.join(__dirname,'../app/weekly-note-history.tsx'),'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText)(exported,
  name=>name==='./review-note-model'?model:require(name));
const render=(records,notes)=>renderToStaticMarkup(React.createElement(exported.default,{records,notes}));

test('standalone and report notes form one descending row per real week, without filling gaps',()=>{
  const notes={'2026-12-28':'跨年记录','2026-11-02':'旧草稿','2026-10-26':'已清空的旧说明'};
  const reports=[{type:'week',start:'2026-11-02',end:'2026-11-04',overallChange:'新版\n说明'},
    {type:'week',start:'2026-10-26',end:'2026-10-29'}, {type:'month',start:'2026-11-10',overallChange:'不属于周次'}];
  const rows=model.weeklyNoteHistory(reports,notes);
  assert.deepEqual(rows.map(row=>row.start),['2026-12-28','2026-11-02','2026-10-26']);
  assert.equal(rows[0].end,'2027-01-03');assert.equal(rows[1].reportEnd,'2026-11-04');
  const html=render(reports,notes);
  for(const value of ['新版\n说明','单独保存的说明','本周未填写说明','更早记录（1 周）']) assert.ok(html.includes(value),value);
  assert.doesNotMatch(html,/旧草稿|已清空的旧说明|不属于周次/);
});
test('saving, revising, restoring and clearing a standalone note immediately changes the list',()=>{
  const first=model.saveWeeklyNote([],{},'2026-11-02','本周减少外卖');
  const revised=model.saveWeeklyNote([],first.weeklyNotes,'2026-11-02','晚餐改在家吃');
  const restored=model.parseWeeklyNotes(JSON.parse(JSON.stringify(revised.weeklyNotes)));
  assert.ok(render([],restored).includes('晚餐改在家吃'));assert.ok(!render([],restored).includes('本周减少外卖'));
  const cleared=model.saveWeeklyNote([],restored,'2026-11-02','');
  assert.match(render([],cleared.weeklyNotes),/暂无周记录/);
});
