const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {cycleFocusHistory}=loadModel('cycle-focus-model');
const bill=(amount)=>({id:'b',name:'订阅',kind:'订阅',amount,date:'2026-11-18'});
const record=(end,amount)=>({type:'week',end,savedAt:end+'T12:00:00Z',focus:{checks:{bills:true},bills:[bill(amount)],notes:{bills:'调价'}}});
const patch=(asOf,before,after,saved)=>({published:true,module:'bills',reviewId:'week:2026-11-09',asOf,savedAt:saved,
  before:{reminders:before},after:{reminders:after},moduleDraft:{focus:{notes:{bills:'本周更新'}}}});
const section=(week,key)=>week.sections.find(s=>s.scope===key);

test('all and only weeks of the tenth-to-ninth cycle appear, with clipped edges and automatic rollover',()=>{
  const data=cycleFocusHistory('2026-11-14',[],[]);
  assert.deepEqual(data.weeks.map(w=>[w.start,w.end]),[['2026-11-10','2026-11-15'],['2026-11-16','2026-11-22'],['2026-11-23','2026-11-29'],['2026-11-30','2026-12-06'],['2026-12-07','2026-12-09']]);
  assert.equal(section(data.weeks[0],'projects').status,'未记录');assert.equal(section(data.weeks[1],'projects').status,'未到本周');
  assert.equal(cycleFocusHistory('2027-01-09',[],[]).cycle.start,'2026-12-10');
  assert.equal(cycleFocusHistory('2027-01-10',[],[]).cycle.start,'2027-01-10');
});
test('prior-cycle baseline, individual save and same-week revision reconcile without double counting',()=>{
  const history=[record('2026-11-08',10),record('2026-11-12',20)];
  const updates=[patch('2026-11-14',[bill(20)],[bill(30)],'2026-11-14T13:00:00Z')];
  const w=cycleFocusHistory('2026-11-14',history,updates).weeks[0];
  assert.deepEqual(section(w,'bills').lines,['订阅：登记金额 ¥10.00 → ¥30.00']);assert.equal(section(w,'bills').note,'本周更新');
  assert.equal(section(w,'balance').status,'未记录');
});
test('first standalone save uses before/after; imported baseline does not invent a payment',()=>{
  const w=cycleFocusHistory('2026-11-14',[],[patch('2026-11-14',[],[bill(33)],'2026-11-14T13:00:00Z')]).weeks[0];
  assert.match(section(w,'bills').lines[0],/新增登记.*33\.00/);
  const r=record('2026-11-14',10);r.focus.checks.projects=true;r.focus.projects=[{id:'p',name:'搬家',target:450,current:100,dueDate:'2026-12-01'}];
  const first=section(cycleFocusHistory('2026-11-14',[r],[]).weeks[0],'projects');
  assert.equal(first.status,'首次基准');assert.match(first.lines[0],/实际 ¥100.00，目标 ¥450.00/);
});
