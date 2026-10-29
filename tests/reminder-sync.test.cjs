const assert = require('node:assert/strict');
const {test} = require('node:test');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('finance-review-model');
const source = () => ({projects:[{id:'trip',name:'旅行',target:1000,current:200,dueDate:'2026-11-10'}],
  bills:[{id:'rent',name:'房租',amount:2000,date:'2026-07-10',kind:'房租'}],
  assets:[{id:'asset',name:'物品',amount:100}],debts:[{id:'debt',name:'分期',amount:500}],holdings:2000});

test('reminders use Shanghai calendar dates, never the old June reference', () => {
  assert.equal(m.reviewDayDistance('2026-11-10','2026-10-29'),12);
  assert.equal(m.reviewDayDistance('2026-11-18','2026-10-29'),20);
  assert.equal(m.reviewDayDistance('2026-11-01','2026-10-29'),3);
  assert.equal(m.reviewDayDistance('2027-01-01','2026-12-31'),1);
  assert.equal(m.reviewDayDistance('2028-03-01','2028-02-28'),2);
  assert.equal(m.reviewToday(new Date('2026-10-28T15:59:59Z')),'2026-10-28');
  assert.equal(m.reviewToday(new Date('2026-10-28T16:00:00Z')),'2026-10-29');
});

test('today, past dates and invalid inputs are not silently displayed as zero days', () => {
  assert.equal(m.reviewDeadlineLabel('2026-10-29','2026-10-29'),'今天');
  assert.equal(m.reviewDeadlineLabel('2026-10-28','2026-10-29'),'已过 1 天，待核实');
  assert.equal(m.reviewDeadlineLabel('2026-11-01','2026-10-29'),'3 天后');
  for (const value of ['', 'garbage', '2026-02-30']) {
    assert.equal(m.reviewDayDistance(value,'2026-10-29'),null);
    assert.equal(m.reviewDeadlineLabel(value,'2026-10-29'),'日期待补');
  }
});

test('live focus updates only changed checks, keeps notes and does not mutate source or old snapshots', () => {
  const before = m.newReviewFocus(source());
  before.checks = {projects:true,bills:true,balance:true};
  before.notes = {projects:'保留项目说明',bills:'保留账单说明',balance:'保留资产说明'};
  const original = structuredClone(before);
  const current = source();
  current.bills[0] = {...current.bills[0],amount:2750,date:'2026-11-10'};
  const after = m.syncReviewFocus(before,current);
  assert.equal(after.bills[0].amount,2750);
  assert.equal(after.bills[0].date,'2026-11-10');
  assert.deepEqual(after.checks,{projects:true,bills:false,balance:true});
  assert.deepEqual(after.notes,before.notes);
  assert.deepEqual(before,original,'Saved history must remain unchanged');
  after.bills[0].amount = 1;
  assert.equal(current.bills[0].amount,2750,'Do not share mutable source rows');
});

test('live focus handles additions, removals, zero balances and repeat renders without losing unrelated checks', () => {
  const before = {...m.newReviewFocus(source()),checks:{projects:true,bills:true,balance:true}};
  assert.equal(m.syncReviewFocus(before,source()),before,'No change returns the same object');
  const current = source();
  current.projects = [];
  current.debts[0].amount = 0;
  current.holdings = 0;
  current.assets.push({id:'new',name:'新物品',amount:20});
  const after = m.syncReviewFocus(before,current);
  assert.deepEqual(after.checks,{projects:false,bills:true,balance:false});
  assert.equal(after.projects.length,0);
  assert.equal(after.debts[0].amount,0);
  assert.equal(after.holdings,0);
  assert.deepEqual(m.syncReviewFocus(undefined,current),m.newReviewFocus(current));
});
