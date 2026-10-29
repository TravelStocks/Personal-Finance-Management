const assert = require('node:assert/strict');
const {test} = require('node:test');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('dated-ledger-model');
const r = loadModel('finance-review-model');
const months = () => ['2026-09','2026-10','2026-11'].map(id=>({id,label:id,salary:13000,otherIncome:0,stockIncome:500,budgets:[
  {id:'food',name:'Lunch',plan:1000,actual:300,group:'daily',required:true,fixed:false},
  {id:'books',name:'Books',plan:1000,actual:0,group:'learning',required:false,fixed:false},
]}));
const entry = (overrides={})=>({id:'a',date:'2026-10-26',flow:'expense',categoryId:'food',amount:25.5,note:'Lunch',...overrides});

test('legacy backups stay undated; dates, IDs, cash categories and finite amounts validated',()=>{
  assert.deepEqual(m.parseDatedEntries(undefined),[]);
  for(const date of ['2026-02-30','2026-13-01','2026-1-02','']) assert.throws(()=>m.parseDatedEntries([entry({date})]),/日期/);
  for(const amount of [0,NaN,Infinity,1e13]) assert.throws(()=>m.parseDatedEntries([entry({amount})]),/金额/);
  assert.throws(()=>m.parseDatedEntries([entry(),entry()]),/编号/);
  assert.throws(()=>m.parseDatedEntries([entry({flow:'income',categoryId:'stockIncome'})]),/浮盈/);
  assert.equal(m.parseDatedEntries([entry({amount:-12.34})])[0].amount,-12.34);
});
test('new, edit, move, refund and delete update monthly totals exactly once and immutably',()=>{
  const original = months(), before = structuredClone(original);
  let state = m.changeDatedEntry(original,[],entry());
  assert.equal(state.records[1].budgets[0].actual,325.5);
  state = m.changeDatedEntry(state.records,state.entries,entry({amount:35.5}),'a');
  assert.equal(state.records[1].budgets[0].actual,335.5);
  state = m.changeDatedEntry(state.records,state.entries,entry({date:'2026-11-01',categoryId:'books',amount:35.5}),'a');
  assert.equal(state.records[1].budgets[0].actual,300);
  assert.equal(state.records[2].budgets[1].actual,35.5);
  state = m.changeDatedEntry(state.records,state.entries,entry({id:'refund',date:'2026-11-02',categoryId:'books',amount:-5.25}));
  assert.equal(state.records[2].budgets[1].actual,30.25);
  state = m.changeDatedEntry(state.records,state.entries,null,'a');
  assert.equal(state.records[2].budgets[1].actual,-5.25);
  assert.deepEqual(original,before);
});
test('backfilling only splits existing totals and prevents over-allocation',()=>{
  const original=months();
  let state=m.changeDatedEntry(original,[],entry({amount:100}),undefined,'allocate');
  assert.equal(state.records[1].budgets[0].actual,300);
  assert.equal(m.undatedAmount(state.records[1],state.entries,'expense','food'),200);
  assert.throws(()=>m.changeDatedEntry(state.records,state.entries,entry({id:'b',amount:201}),undefined,'allocate'),/超出/);
  assert.throws(()=>m.changeDatedEntry(state.records,state.entries,entry({id:'b',amount:-1}),undefined,'allocate'),/超出/);
  state=m.changeDatedEntry(state.records,state.entries,entry({amount:120}),'a','allocate');
  assert.equal(state.records[1].budgets[0].actual,320);
  const refundMonths=months();refundMonths[1].budgets[0].actual=-25;
  assert.equal(m.changeDatedEntry(refundMonths,[],entry({amount:-10}),undefined,'allocate').records[1].budgets[0].actual,-25);
});
test('salary receipt does not duplicate prefilled totals and planning cannot overwrite dated actuals',()=>{
  const state=m.changeDatedEntry(months(),[],entry({flow:'income',categoryId:'salary',amount:13000}),undefined,'allocate');
  assert.equal(state.records[1].salary,13000);
  assert.equal(m.undatedAmount(state.records[1],state.entries,'income','salary'),0);
  const result=m.preserveDatedSalaries(state.records.map(row=>({...row,salary:14000})),state.records,state.entries);
  assert.equal(result[1].salary,13000);
  assert.equal(result[2].salary,14000);
  const added=m.changeDatedEntry(state.records,state.entries,entry({id:'bonus',flow:'income',categoryId:'otherIncome',amount:10.01}));
  assert.equal(added.records[1].otherIncome,10.01);
});
test('missing references and duplicates fail before changing actuals',()=>{
  assert.throws(()=>m.changeDatedEntry(months(),[],entry({date:'2026-12-01'})),/月份/);
  assert.throws(()=>m.changeDatedEntry(months(),[],entry({categoryId:'gone'})),/分类/);
  assert.throws(()=>m.changeDatedEntry(months(),[entry()],entry()),/编号/);
  assert.throws(()=>m.changeDatedEntry(months(),[],null,'gone'),/原明细/);
});
test('inclusive calendar range crosses month boundaries without allocating undated totals or stock PnL',()=>{
  const entries=[entry({id:'outside',date:'2026-09-27'}),entry({id:'start',date:'2026-09-28',amount:10.1}),entry({id:'salary',date:'2026-10-01',flow:'income',categoryId:'salary',amount:13000}),entry({id:'end',date:'2026-10-04',amount:-0.1}),entry({id:'after',date:'2026-10-05'})];
  const source=m.datedReviewSource(months(),entries,'2026-09-28','2026-10-04');
  assert.equal(source.rows.length,3);
  assert.equal(source.income,13000);
  assert.equal(source.spending,10);
  assert.ok(source.undated.some(row=>row.month==='2026-09'&&row.name==='工资'));
  assert.deepEqual(m.datedReviewSource(months(),[],'2026-10-26','2026-10-29').rows,[]);
});
test('review links only consumption and external income, retaining transfers and user notes',()=>{
  const draft=r.newReviewDraft('week','2026-10-29');
  draft.amounts.investment=2750;draft.amounts.emergency=500;draft.notes.daily='confirmed';
  const linked=m.linkDatedReview(draft,m.datedReviewSource(months(),[entry()],'2026-10-26','2026-10-29').rows);
  assert.equal(linked.amounts.daily,25.5);
  assert.equal(linked.amounts.investment,2750);
  assert.equal(linked.amounts.emergency,500);
  assert.equal(linked.notes.daily,'confirmed');
  assert.equal(linked.income,0);
  assert.equal(draft.amounts.daily,null);
  const unknown=months();unknown[1].budgets[0].group='unassigned';
  const source=m.datedReviewSource(unknown,[entry()],'2026-10-26','2026-10-29');
  assert.equal(source.unassigned.length,1);
  assert.throws(()=>m.linkDatedReview(draft,source.rows),/分类/);
});
test('saved review freezes evidence, exports it and rejects tampering or out-of-period rows',()=>{
  const source=m.datedReviewSource(months(),[entry()],'2026-10-26','2026-10-29');
  const linked=m.linkDatedReview(r.newReviewDraft('week','2026-10-29'),source.rows);
  linked.amounts.investment=0;linked.amounts.emergency=0;
  linked.balances={cash:100,investments:200,otherAssets:0,debt:0};
  const saved=r.parseFinanceReview(linked);
  source.rows[0].amount=999;
  assert.equal(saved.ledger[0].amount,25.5);
  assert.equal(r.reviewTotals(saved).spending,25.5);
  assert.match(r.financeReviewReport(saved,[saved]),/日期收支快照/);
  assert.match(r.financeReviewReport(saved,[saved]),/Lunch/);
  assert.deepEqual(r.parseFinanceReviews(JSON.parse(JSON.stringify([saved])))[0],saved);
  assert.throws(()=>r.parseFinanceReview({...saved,income:100}),/不一致/);
  assert.throws(()=>r.parseFinanceReview({...saved,ledger:[{...saved.ledger[0],date:'2026-10-25'}]}),/不属于/);
  assert.throws(()=>r.parseFinanceReview({...saved,ledger:[{...saved.ledger[0],group:'unassigned'}]}),/分类/);
  assert.equal(r.parseFinanceReview({...saved,ledger:undefined}).ledger,undefined);
});

test('date details round-trip with monthly totals through the existing save and cloud payload',()=>{
  const save=loadModel('finance-save-model');
  const state=m.changeDatedEntry(months(),[],entry());
  const input={monthlyRecords:state.records,datedEntries:state.entries,financeReviews:[]};
  let raw=null;
  const storage={getItem:()=>raw,setItem:(_key,value)=>{raw=value;}};
  save.writeLocalFinanceData(storage,'test',input,false,'2026-10-29T01:00:00Z');
  const saved=save.financeDataOnly(JSON.parse(raw));
  assert.deepEqual(saved,input);
  assert.deepEqual(m.parseDatedEntries(saved.datedEntries),state.entries);
  assert.equal(save.hasPendingFinanceSave(JSON.parse(raw)),true);
  assert.equal(save.financeBackupSignature({data:saved,snapshots:[],monthlyArchives:[]}),save.financeBackupSignature({data:input,snapshots:[],monthlyArchives:[]}));
});
