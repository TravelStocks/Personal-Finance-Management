const assert = require('node:assert/strict');
const {test} = require('node:test');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('spending-detail-model');
const base = {id:'old',name:'订阅',plan:100,actual:50,required:false,fixed:true};
test('old categories stay unassigned, preserving ambiguous subscriptions and historical amounts',()=>{
  assert.equal(m.getSpendingGroup(base),'unassigned');
  assert.equal(m.getSpendingGroup({...base,group:'wrong'}),'unassigned');
  const before=structuredClone(base);
  const added=m.addSpendingDetailPresets([base]);
  assert.deepEqual(added[0],before);
  assert.ok(added.length>1);
  assert.ok(added.slice(1).every(row=>row.actual===0 && row.plan===0));
  assert.equal(m.addSpendingDetailPresets(added).length,added.length);
  assert.deepEqual(base,before);
});
test('learning summary uses confirmed group, net refunds and explicit notes only',()=>{
  const rows=[base,
    {...base,id:'course',name:'课程',group:'learning',actual:199.9,note:'测试课程'},
    {...base,id:'refund',name:'退款',group:'learning',actual:-29.9,note:'课程退款'},
    {...base,id:'books',name:'资料',group:'learning',actual:10.01,note:''},
    {...base,id:'daily',group:'daily',actual:300},
  ];
  const summary=m.summarizeLearning(rows);
  assert.equal(summary.total,180.01);
  assert.equal(summary.rows.length,3);
  assert.equal(summary.unassigned,50);
  assert.equal(summary.missingNotes,1);
  assert.equal(m.summarizeLearning([]).total,0);
});
test('new month carries classifications and reference amounts, not last month usage or actuals',()=>{
  const row={...base,group:'learning',note:'Previous month course'};
  const next=m.nextMonthSpendingRows([row]);
  assert.equal(next[0].actual,0);
  assert.equal(next[0].note,'');
  assert.equal(next[0].group,'learning');
  assert.equal(next[0].plan,100);
  assert.equal(row.note,'Previous month course');
  assert.equal(row.actual,50);
});
