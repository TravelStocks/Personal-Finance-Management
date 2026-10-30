const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {loadModel}=require('../scripts/finance-review.cjs');
const m=loadModel('finance-review-model');
const a=loadModel('review-activity-model');
const record=(end='2026-10-29')=>m.parseFinanceReview({...m.newReviewDraft('week',end),income:0,
  amounts:Object.fromEntries(m.reviewCategories.map(row=>[row.id,0])),balances:{cash:0,investments:0,otherAssets:0,debt:0},savedAt:'2026-10-29T01:00:00Z'});
const entry=(id,date,amount)=>({id,date,flow:'expense',categoryId:'d',group:'daily',name:'日常',amount,note:'午餐'});
const exported={};
new Function('exports','require',ts.transpileModule(fs.readFileSync(path.join(__dirname,'../app/review-activity.tsx'),'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText)(exported,
  name=>name==='./finance-review-model'?m:name==='./review-activity-model'?a:require(name));
const render=(records,updates=[])=>renderToStaticMarkup(React.createElement(exported.default,{records,updates}));

test('nine projects show saved amount, notes and actual dates, never invent dates for weekly totals',()=>{
  const r=record(); r.amounts={...r.amounts,daily:100,investment:2750,emergency:500};r.notes.daily='午餐与用品';
  r.ledger=[entry('e','2026-10-27',30)];
  const [p]=a.reviewActivityPeriods([r]); const items=a.reviewActivityItems(p);
  assert.equal(items.length,9);
  assert.equal(items.find(row=>row.id==='daily').undated,70);
  assert.deepEqual(items.find(row=>row.id==='daily').dates,['2026-10-27']);
  assert.deepEqual(items.find(row=>row.id==='investment').dates,[]);
  const html=render([r]);
  for(const text of ['午餐与用品','2026-10-27','70.00','本期净划拨，非消费','仅确认所属周','本期录入为 0']) assert.ok(html.includes(text),text);
  assert.doesNotMatch(html,/已完成付款/);
});
test('individual spending saves appear before a full review; revisions replace the same week',()=>{
  const r=record();r.amounts.daily=100;
  const update={id:'u',reviewId:'week:2026-10-26',asOf:'2026-10-29',savedAt:'2026-10-29T02:00:00Z',published:true,module:'spending',
    moduleDraft:{amounts:{...r.amounts,daily:80},notes:{daily:'更新后'}},before:{},after:{monthlyRecords:[],datedEntries:[]}};
  const before=structuredClone(update);
  let periods=a.reviewActivityPeriods([r],[update]);
  assert.equal(periods.length,1); assert.equal(periods[0].amounts.daily,80);
  assert.match(render([],[update]),/支出模块已保存并更新/);
  r.savedAt='2026-10-29T03:00:00Z';
  assert.equal(a.reviewActivityPeriods([r],[update])[0].amounts.daily,100);
  assert.deepEqual(update,before);
  assert.equal(a.reviewActivityPeriods([],[{...update,published:false}]).length,0);
  assert.equal(a.reviewActivityPeriods([],[{...update,module:'accounts'}]).length,0);
});
test('module dated evidence comes from its saved snapshot; refunds and history survive reload',()=>{
  const r=record();r.amounts.daily=-10;
  const update={id:'u',reviewId:'week:2026-10-26',asOf:r.end,savedAt:r.savedAt,published:true,module:'spending',moduleDraft:{amounts:r.amounts,notes:{}},
    before:{},after:{monthlyRecords:[{id:'2026-10',salary:0,otherIncome:0,budgets:[{id:'d',name:'日常',group:'daily',actual:-10}]}],datedEntries:[entry('refund','2026-10-28',-10)]}};
  const periods=a.reviewActivityPeriods([record('2026-10-18')],JSON.parse(JSON.stringify([update])));
  assert.equal(periods.length,2);assert.equal(periods[0].start,'2026-10-26');
  const daily=a.reviewActivityItems(periods[0]).find(row=>row.id==='daily');
  assert.equal(daily.undated,0);assert.deepEqual(daily.dates,['2026-10-28']);
});
test('monthly cards render before weekly income and remain unique; empty activity is honest',()=>{
  const page=fs.readFileSync(path.join(__dirname,'../app/page.tsx'),'utf8');
  assert.ok(page.indexOf('overviewCards.slice(0, 4)')<page.indexOf('<ReviewOverview'));
  assert.match(page,/overviewCards.slice\(4\)/);
  assert.match(render([]),/尚无已保存的周项目记录/);
});
