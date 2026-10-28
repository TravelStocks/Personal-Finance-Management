const assert = require('node:assert/strict');
const {test} = require('node:test');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('finance-review-model');
const source = () => ({projects:[{id:'trip',name:'测试旅行',target:1000,current:200,dueDate:'2026-11-10'}],
  bills:[{id:'sub',name:'测试订阅',amount:20,date:'2026-10-30',kind:'订阅'}],
  assets:[{id:'other',name:'测试物品',amount:100}],debts:[{id:'loan',name:'测试借款',amount:500}],holdings:2000});
function record(end='2026-10-28',focus=m.newReviewFocus(source()),type='week') {
  return m.parseFinanceReview({...m.newReviewDraft(type,end),income:1000,
    amounts:Object.fromEntries(m.reviewCategories.map(row=>[row.id,row.id==='daily'?100:0])),
    balances:{cash:1000,investments:2000,otherAssets:100,debt:500},focus});
}
const checked = () => ({...m.newReviewFocus(source()),checks:{projects:true,bills:true,balance:true}});

test('source snapshots are independent, unconfirmed by default, and do not add assets or spending',()=>{
  const raw=source();
  const focus=m.newReviewFocus(raw);
  raw.projects[0].current=999;
  assert.equal(focus.projects[0].current,200);
  assert.equal(focus.checks.projects,false);
  const current=record(undefined,focus);
  assert.equal(m.reviewTotals(current).netWorth,2600);
  assert.equal(m.reviewTotals(current).spending,100);
  assert.equal(m.reviewHighlights(current).highlights.find(row=>row.id==='projects').state,'待核对');
  assert.equal(m.reviewHighlights(current).actions.length,0);
  assert.equal(m.reviewFocusMatchesSource(focus,raw),false);
  assert.equal(m.reviewFocusMatchesSource(focus,source()),true);
});
test('confirmed snapshots compare stable IDs, amounts and dates without inventing payment or cancellation',()=>{
  const previous=record('2026-10-25',checked());
  const focus=checked();
  focus.projects[0].current=400;
  focus.projects[0].dueDate='2026-11-08';
  focus.bills[0].amount=30;
  focus.bills.push({id:'phone',name:'测试话费',amount:50,date:'2026-11-01',kind:'话费'});
  focus.debts[0].amount=400;
  const current=record('2026-10-28',focus);
  const a=m.analyzeFinanceReview(current,[previous]);
  assert.equal(a.highlights.length,4);
  assert.match(a.highlights.find(row=>row.id==='projects').summary,/-¥200.00/);
  assert.match(a.highlights.find(row=>row.id==='bills').details.join(' '),/登记金额 ¥20.00 → ¥30.00/);
  assert.match(a.highlights.find(row=>row.id==='balance').details.join(' '),/不一致/);
  assert.ok(a.actions.length<=3);
  assert.match(m.financeReviewReport(current,[previous]),/本期关键变化/);
  const removed=record('2026-10-28',{...checked(),bills:[]});
  assert.match(m.reviewHighlights(removed,previous).highlights[2].details.join(' '),/移出本期清单，处理状态待确认/);
});
test('missing and unconfirmed baselines never become zero or no change',()=>{
  const current=record('2026-10-28',checked());
  const old=record('2026-10-25');
  delete old.focus;
  assert.equal(m.reviewHighlights(current,old).highlights[1].state,'首次基准');
  assert.match(m.reviewHighlights(current,old).highlights[1].summary,/无上期基准/);
  assert.equal(m.reviewHighlights(current,record('2026-10-25')).highlights[2].state,'首次基准');
  assert.equal(m.reviewHighlights(old).highlights[2].state,'未提供');
});
test('due windows use the review cutoff, while old reminders require status verification',()=>{
  const focus=checked();
  focus.projects.push({id:'old',name:'旧项目',target:500,current:0,dueDate:'2026-06-01'});
  focus.bills.push({id:'old-sub',name:'旧提醒',amount:10,date:'2026-06-01',kind:'订阅'});
  const highlights=m.reviewHighlights(record('2026-10-28',focus)).highlights;
  assert.match(highlights[1].summary,/未来 30 天 1 项/);
  assert.match(highlights[2].summary,/未来 7 天 1 项/);
  assert.match(highlights[1].details.join(' '),/不直接认定欠款/);
  assert.match(highlights[2].details.join(' '),/状态待核实/);
  const future=m.reviewHighlights(record('2026-11-11',focus)).highlights;
  assert.match(future[1].summary,/未来 30 天 0 项/);
});
test('invalid focus payloads fail before import and valid snapshots survive export normalization',()=>{
  const current=record();
  assert.deepEqual(m.parseFinanceReviews([current])[0].focus,current.focus);
  const invalid=checked(); invalid.projects[0].dueDate='2026-02-30';
  assert.throws(()=>record(undefined,invalid),/无效日期/);
  const duplicate=checked(); duplicate.bills.push({...duplicate.bills[0]});
  assert.throws(()=>record(undefined,duplicate),/唯一编号/);
  const negative=checked(); negative.holdings=-1;
  assert.throws(()=>record(undefined,negative),/非负数/);
});
test('quarter rollup takes only the final context and does not reuse an earlier missing snapshot',()=>{
  const months=['2026-07-31','2026-08-31','2026-09-30'].map(end=>record(end,checked(),'month'));
  const quarter=m.aggregateFinanceReviews(months,'quarter','2026-09-30');
  assert.deepEqual(quarter.focus,months[2].focus);
  assert.notEqual(quarter.focus,months[2].focus);
  delete months[2].focus;
  assert.equal(m.aggregateFinanceReviews(months,'quarter','2026-09-30').focus,undefined);
});
