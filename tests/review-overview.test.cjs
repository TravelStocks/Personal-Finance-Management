const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {loadModel}=require('../scripts/finance-review.cjs');
const m=loadModel('finance-review-model');
const exported={};
const compiled=ts.transpileModule(fs.readFileSync(path.join(__dirname,'../app/review-overview.tsx'),'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}
}).outputText;
new Function('exports','require',compiled)(exported,name=>name==='./finance-review-model'?m:require(name));
const render=records=>renderToStaticMarkup(React.createElement(exported.default,{records,onOpen:()=>{}}));
const record=(end,overrides={})=>m.parseFinanceReview({...m.newReviewDraft('week',end),income:1000,
  amounts:Object.fromEntries(m.reviewCategories.map(row=>[row.id,0])),
  balances:{cash:10000,investments:5000,otherAssets:0,debt:2000},...overrides});

test('overview selects latest weekly period, not last edited historical or monthly report',()=>{
  const old=record('2026-10-18',{savedAt:'2026-10-30T00:00:00Z'});
  const current=record('2026-10-29',{savedAt:'2026-10-29T00:00:00Z'});
  const monthly=m.parseFinanceReview({...record('2026-10-29'),...m.reviewPeriod('month','2026-10-29'),type:'month'});
  const rows=[old,monthly,current],before=structuredClone(rows);
  assert.equal(m.latestWeeklyReview(rows).id,current.id);
  assert.deepEqual(rows,before);
  assert.equal(m.latestWeeklyReview([]),undefined);
  assert.match(render([]),/尚未保存周复盘/);
});

test('saved revisions immediately change overview, excluding transfers from consumption',()=>{
  const prior=record('2026-10-25');
  const current=record('2026-10-29');
  current.amounts={...current.amounts,daily:123,investment:2750,emergency:500};
  current.balances.cash=10877;
  let rows=m.upsertFinanceReview([prior],current);
  const html=render(rows);
  assert.match(html,/本周实际消费/);
  assert.match(html,/123\.00/);
  assert.match(html,/877\.00/);
  assert.match(html,/13,877\.00/);
  assert.match(html,/天数不同/);
  const changed={...current,amounts:{...current.amounts,daily:200}};
  rows=m.upsertFinanceReview(rows,changed);
  assert.match(render(rows),/800\.00/);
  assert.equal(rows.length,2);
});

test('overview restored from stored review records retains amounts and first baseline',()=>{
  const rows=m.parseFinanceReviews(JSON.parse(JSON.stringify([record('2026-10-29')])));
  assert.match(render(rows),/首次基准/);
  assert.match(render(rows),/2026-10-26 至 2026-10-29/);
  assert.match(render(rows),/13,000\.00/);
});
