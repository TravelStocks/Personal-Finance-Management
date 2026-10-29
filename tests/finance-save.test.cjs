const {test} = require('node:test');
const assert = require('node:assert/strict');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('finance-save-model');
const budget = loadModel('annual-budget-model');
const key = 'finance-test';
const storage = () => {
  const values = new Map();
  return {getItem:key=>values.get(key) ?? null,setItem:(key,value)=>values.set(key,value)};
};
const data = () => ({annualBudgetPlan:{...budget.initialAnnualBudgetPlan,emergencyMonthlyNeed:3000,emergencyTargetMonths:9},
  accounts:[{id:'emergency',balance:1234.56}],emergencyFund:0,emergencyMonths:9,emergencyMonthlyNeed:3000});

test('manual and periodic saves round-trip emergency settings and linked balances including zero', () => {
  const db = storage(), input = data();
  m.writeLocalFinanceData(db,key,input,false,'2026-10-29T01:00:00Z');
  const saved = JSON.parse(db.getItem(key));
  assert.deepEqual(m.financeDataOnly(saved),input);
  assert.equal(m.hasPendingFinanceSave(saved),true);
  assert.equal(input._localSave,undefined);
  assert.equal(budget.normalizeAnnualBudgetPlan(saved.annualBudgetPlan).emergencyMonthlyNeed,3000);
  assert.equal(budget.normalizeAnnualBudgetPlan(saved.annualBudgetPlan).emergencyTargetMonths,9);
});

test('unchanged checkpoints preserve a clean cloud state and original edit time', () => {
  const db = storage();
  m.writeLocalFinanceData(db,key,data(),true,'2026-10-29T01:00:00Z');
  m.writeLocalFinanceData(db,key,data(),false,'2026-10-29T01:00:30Z');
  assert.deepEqual(JSON.parse(db.getItem(key))._localSave,{updatedAt:'2026-10-29T01:00:00Z',cloudPending:false});
  assert.equal(m.financeBackupSignature({data:data(),snapshots:[],monthlyArchives:[],exportedAt:'first'}),
    m.financeBackupSignature({data:JSON.parse(db.getItem(key)),snapshots:[],monthlyArchives:[],exportedAt:'later'}));
});

test('failed or stale uploads leave local edits pending across reopen', () => {
  const db = storage(), sent = data();
  m.writeLocalFinanceData(db,key,sent);
  const newer = {...sent,emergencyFund:50};
  m.writeLocalFinanceData(db,key,newer);
  assert.equal(m.markFinanceCloudSaved(db,key,sent),false);
  assert.equal(m.hasPendingFinanceSave(JSON.parse(db.getItem(key))),true);
  assert.equal(m.markFinanceCloudSaved(db,key,newer),true);
  assert.equal(m.hasPendingFinanceSave(JSON.parse(db.getItem(key))),false);
});

test('legacy data remains readable and explicit recovery can replace invalid local JSON', () => {
  const db = storage();
  db.setItem(key,JSON.stringify(data()));
  assert.equal(m.hasPendingFinanceSave(JSON.parse(db.getItem(key))),false);
  m.writeLocalFinanceData(db,key,{...data(),emergencyFund:20.69});
  assert.equal(m.hasPendingFinanceSave(JSON.parse(db.getItem(key))),true);
  db.setItem(key,'invalid');
  m.writeLocalFinanceData(db,key,data());
  assert.deepEqual(m.financeDataOnly(JSON.parse(db.getItem(key))),data());
});

test('storage failures throw without claiming success or overwriting the previous value', () => {
  const db = storage();
  m.writeLocalFinanceData(db,key,data());
  const before = db.getItem(key);
  const full = {...db,setItem:()=>{throw new Error('quota exceeded');}};
  assert.throws(()=>m.writeLocalFinanceData(full,key,{...data(),emergencyFund:99}),/quota/);
  assert.equal(db.getItem(key),before);
});

test('an older tab cannot overwrite newer storage during a timer or manual save', () => {
  const db = storage(), original = data();
  m.writeLocalFinanceData(db,key,original);
  const expected = JSON.stringify(original);
  const otherTab = {...original,emergencyFund:777};
  m.writeLocalFinanceData(db,key,otherTab);
  for (const attempt of [original,{...original,emergencyFund:888}]) {
    assert.throws(()=>m.writeLocalFinanceData(db,key,attempt,false,undefined,expected),error=>error.message===m.financeSaveConflict);
  }
  assert.deepEqual(m.financeDataOnly(JSON.parse(db.getItem(key))),otherTab);
});
