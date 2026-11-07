const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {planYearProgress,planYearLabel}=loadModel('plan-year');
const expense=(date,amount)=>({date,amount,flow:'expense',categoryId:'daily'});

test('first plan year has twelve tenth-to-ninth periods, not twelve calendar months',()=>{
  assert.equal(planYearLabel,'2026-11-10 至 2027-11-09');
  for(const [day,status] of [['2026-11-09','尚未开始'],['2026-11-10','第 1 / 12 账期'],['2026-12-09','第 1 / 12 账期'],['2026-12-10','第 2 / 12 账期'],['2027-11-09','第 12 / 12 账期'],['2027-11-10','12 个账期已结束']]){
    assert.equal(planYearProgress(day,[],[]).status,status);
  }
});
test('include both endpoints but not earlier, future or next-year payments',()=>{
  const entries=[expense('2026-10-30',500),expense('2026-11-09',20),expense('2026-11-10',11.25),expense('2027-11-09',-2),expense('2027-11-10',90)];
  assert.equal(planYearProgress('2026-11-07',[],entries).spending,0);
  assert.equal(planYearProgress('2026-11-10',[],entries).spending,11.25);
  assert.equal(planYearProgress('2028-01-01',[],entries).spending,9.25);
});
test('dated amounts count once; ambiguous residuals stay out, fully covered months and weeks count',()=>{
  const months=[{id:'2026-11',budgets:[{id:'daily',actual:100},{id:'w1',actual:30,reviewPeriod:{start:'2026-11-09',end:'2026-11-15'}},
    {id:'w2',actual:25,reviewPeriod:{start:'2026-11-16',end:'2026-11-22'}}]}, {id:'2026-12',budgets:[{id:'daily',actual:60}]}];
  const entries=[expense('2026-11-09',10),expense('2026-11-11',20),expense('2026-12-18',40)];
  const progress=planYearProgress('2027-01-10',months,entries);
  assert.equal(progress.spending,105);assert.equal(progress.undated,true);
});
