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
  assert.match(html,/日常灵活资金/);
  assert.doesNotMatch(html,/复盘期末净资产/);
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
  assert.match(render(rows),/待关联账户/);
});

test('flexible daily money sums only eligible daily accounts and uses live balances',()=>{
  const accounts=[{id:'salary',name:'工资卡',purpose:'工资主账户-日常使用',balance:2759.3},
    {id:'small',name:'微信',purpose:'小额支付',balance:189},
    ...['投资基金','应急基金','旅游基金','学习基金','父母储蓄','伴侣基金'].map((purpose,i)=>({id:String(i),name:purpose,purpose,balance:10000})),
    {id:'excluded',name:'其他',purpose:'日常使用',balance:900,includedInPersonal:false},
    {id:'locked',name:'冻结',purpose:'小额支付',balance:800,liquid:false}];
  const before=structuredClone(accounts);
  assert.equal(m.dailyFlexibleCash(accounts).total,2948.3);
  const prior=accounts.slice(0,2).map(row=>({...row,balance:100}));
  assert.equal(m.dailyFlexibleCashChange(accounts,prior).delta,2748.3);
  assert.equal(m.dailyFlexibleCashChange(accounts,prior.slice(0,1)).delta,null);
  assert.equal(m.dailyFlexibleCash([{...accounts[0],balance:0}]).total,0);
  assert.equal(m.dailyFlexibleCash([]).total,null);
  const html=renderToStaticMarkup(React.createElement(exported.default,{records:[record('2026-10-29')],accounts,onOpen:()=>{}}));
  assert.match(html,/2,948\.30/);
  assert.match(html,/当前账户余额/);
  assert.deepEqual(accounts,before);
});

test('weekly trend excludes transfers, shows exact cents and compares only adjacent equal-length weeks',()=>{
  const first=record('2026-10-18',{income:13000});
  const second=record('2026-10-25',{income:12.34});
  second.amounts={...second.amounts,daily:100.11,investment:2750,emergency:500};
  const partial=record('2026-10-29');
  const trend=m.overviewWeeklyTrend([partial,second,first]);
  assert.equal(trend.rows[1].spending,100.11);
  assert.equal(trend.rows[1].surplus,-87.77);
  assert.equal(trend.rows[1].changes.income,-12987.66);
  assert.equal(trend.rows[2].changes,null);
  assert.equal(trend.month.income,14012.34);
  assert.equal(trend.month.coveredDays,18);
  assert.equal(trend.month.days,20);
  assert.equal(m.overviewWeeklyTrend([first,partial]).rows[1].comparison,'中间缺周');
  const html=render([first,second,partial]);
  assert.match(html,/本月收入 · 已记录/);
  assert.match(html,/每周收支变化/);
  assert.match(html,/每周实际消费/);
});

test('month follows the tenth, only splits dated boundary income, and never adds monthly reports or revisions twice',()=>{
  const boundary=record('2026-10-11',{income:300,savedAt:'2026-10-11T00:00:00Z'});
  const last=record('2026-10-18',{income:100});
  assert.equal(m.overviewWeeklyTrend([boundary,last]).month.income,100);
  assert.equal(m.overviewWeeklyTrend([boundary,last]).month.boundaryMissing,true);
  boundary.incomeLedger=[{id:'a',date:'2026-10-09',flow:'income',categoryId:'salary',amount:200,note:'',name:'工资',group:'income'},
    {id:'b',date:'2026-10-10',flow:'income',categoryId:'otherIncome',amount:100,note:'',name:'其他',group:'income'}];
  const revised={...last,income:50,savedAt:'2099-01-01T00:00:00Z'};
  const monthly={...last,type:'month',income:99999};
  const result=m.overviewWeeklyTrend([boundary,last,monthly,revised]);
  assert.equal(result.rows.length,2);
  assert.equal(result.month.income,150);
  assert.equal(result.month.coveredDays,9);
  assert.equal(result.month.boundaryMissing,false);
  assert.equal(m.overviewWeeklyTrend([record('2027-01-03')]).month.start,'2026-12-10');
  assert.equal(m.overviewWeeklyTrend([]).month,null);
});
