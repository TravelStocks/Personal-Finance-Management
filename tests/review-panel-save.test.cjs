const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const {loadModel}=require('../scripts/finance-review.cjs');
const m=loadModel('finance-review-model');
const d=loadModel('review-dashboard-sync');
const modules=loadModel('review-module-sync');
const notes=loadModel('review-note-model');
const compiled=ts.transpileModule(fs.readFileSync(path.join(__dirname,'../app/finance-review-panel.tsx'),'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}
}).outputText;

function harness(fail=false) {
  let state={accounts:[{id:'bank',name:'Test bank',type:'bank',purpose:'daily',balance:100}],
    holdings:[{id:'broker',name:'Test broker',market:'A股',currency:'CNY',cost:100,value:200}],fxUsd:7,fxHkd:1,
    balanceAssets:[],liabilities:[],reminders:[],fundBuckets:[],goals:[],
    monthlyRecords:[{id:'2026-10',salary:0,otherIncome:0,stockIncome:0,budgets:[]}],datedEntries:[],financeReviews:[]};
  const slots=[];let cursor=0,dirty=false,tree,props;
  const react={...require('react'),useState:initial=>{
    const i=cursor++;if(!(i in slots))slots[i]=typeof initial==='function'?initial():initial;
    return [slots[i],next=>{slots[i]=typeof next==='function'?next(slots[i]):next;dirty=true;}];
  },useRef:()=>({current:null}),useEffect:()=>{}};
  const focusComponent=()=>null,investmentComponent=()=>null;
  const exported={};
  new Function('exports','require',compiled)(exported,name=>{
    if(name==='react')return react;
    if(name.endsWith('.css'))return {};
    if(name==='./finance-review-focus')return {default:focusComponent};
    if(name==='./review-investments')return {ReviewInvestmentsEditor:investmentComponent,ReviewInvestmentComparison:()=>null};
    if(name==='./use-finance-today')return {useFinanceToday:()=> '2026-10-29'};
    if(name==='./dated-ledger-editor')return {default:()=>null};
    if(name==='./finance-review-model')return {...m,reviewToday:()=> '2026-10-29'};
    if(name.startsWith('./'))return loadModel(name.slice(2));
    return require(name);
  });
  function updateProps(){props={records:state.financeReviews,plan:{mode:'normal',rows:[]},accounts:state.accounts,
    weeklyNotes:notes.parseWeeklyNotes(state.weeklyNotes),onSaveNote:(week,text)=>{
      if(fail)throw new Error('Storage quota exceeded');
      state={...state,...notes.saveWeeklyNote(state.financeReviews,state.weeklyNotes ?? {},week,text)};
    },
    moduleUpdates:state.reviewUpdates ?? [],moduleSignatures:Object.fromEntries(Object.keys(modules.reviewModuleLabels).map(key=>[key,modules.reviewModuleSignature(state,key)])),
    onSaveModule:(draft,module,signature)=>{
      if(fail)throw new Error('Storage quota exceeded');
      const result=modules.commitReviewModule(state,draft,module,signature,'2026-10-29T01:00:00Z','2026-10-29');state=result.data;
      return {patch:result.patch,moduleSignature:modules.reviewModuleSignature(state,module),sourceSignature:d.dashboardSourceSignature(state)};
    },
    investments:{holdings:state.holdings,fxUsd:7,fxHkd:1},goals:state.goals,dashboardAsOf:state.dashboardAsOf,
    sourceSignature:d.dashboardSourceSignature(state),focusSource:{projects:state.fundBuckets,bills:state.reminders,assets:state.balanceAssets,debts:state.liabilities,holdings:state.holdings[0].value},
    ledgerMonths:state.monthlyRecords,datedEntries:[],onSaveIncome:()=>{},onDeleteIncome:()=>{},onOpenModule:()=>{},
    onChange:(records,request)=>{
      if(fail)throw new Error('Storage quota exceeded');
      state=d.commitReviewUpdate(state,records,request,'2026-10-29T01:00:00Z','2026-10-29');
      return {sourceSignature:d.dashboardSourceSignature(state),record:records.find(row=>row.id===request?.record?.id),moduleSignatures:Object.fromEntries(Object.keys(modules.reviewModuleLabels).map(key=>[key,modules.reviewModuleSignature(state,key)]))};
    }};}
  function render(){let count=0;do{dirty=false;cursor=0;tree=exported.default(props);assert.ok(++count<10);}while(dirty);return tree;}
  function nodes(){const result=[];function walk(n){if(Array.isArray(n)){n.forEach(walk);return;}if(!n||typeof n!=='object')return;result.push(n);walk(n.props?.children);}walk(tree);return result;}
  function find(predicate){const n=nodes().find(predicate);assert.ok(n,'Expected UI control');return n;}
  function input(label,value){find(n=>n.type==='input'&&n.props['aria-label']===label).props.onChange({target:{value}});render();}
  function button(text){const node=find(n=>n.type==='button'&&(Array.isArray(n.props.children)?n.props.children.join(''):n.props.children)===text);node.props.onClick({currentTarget:{closest:()=>null,dataset:{reviewSave:node.props['data-review-save']}}});render();}
  function prepare(){
    input('本期外部收入','0');
    for(const row of m.reviewCategories)input(`${row.name}本期金额`,'0');
    input('Test bank复盘期末余额','450.50');
    const investment=find(n=>n.type===investmentComponent);
    investment.props.onChange({...investment.props.value,holdings:[{...investment.props.value.holdings[0],value:700}]});render();
    find(n=>n.type===investmentComponent).props.onConfirm(true);render();
    const focus=find(n=>n.type===focusComponent);
    focus.props.onChange({...focus.props.focus,checks:{projects:true,bills:true,balance:true}});render();
    for(const label of ['已核对本期期末账户余额']) {
      const node=find(n=>n.type==='label'&&Array.isArray(n.props.children)&&n.props.children.includes(label));
      node.props.children[0].props.onChange({target:{checked:true}});render();
    }
  }
  function submit(invalid=null){const form=find(n=>n.type==='form');assert.equal(form.props.noValidate,true);form.props.onSubmit({preventDefault:()=>{},currentTarget:{querySelector:()=>invalid}});render();}
  updateProps();render();
  return {prepare,submit,button,input,find,state:()=>state,refresh:()=>{updateProps();render();},reopen:()=>{slots.length=0;state=JSON.parse(JSON.stringify(state));updateProps();render();}};
}

test('project refresh imports current targets, actuals and deadlines without writing or losing other draft fields',()=>{
  const h=harness();h.prepare();
  const panel=()=>h.find(n=>typeof n.props?.onRefreshProjects==='function').props;
  const old={id:'p',name:'搬家',target:500,current:100,dueDate:'2026-11-01'};
  const original={...panel().focus,projects:[old,{...old,id:'removed'}],notes:{projects:'先付定金',bills:'已核对'}};
  panel().onChange(original);h.refresh();
  const latest=[{...old,target:650,current:225.5,dueDate:'2026-12-09',actualDate:'2026-10-28',includedInLedger:true},{...old,id:'new',current:0}];
  h.state().fundBuckets=latest;h.refresh();
  panel().onRefreshProjects();h.refresh();h.button('取消');assert.deepEqual(panel().focus,original);
  panel().onRefreshProjects();h.refresh();h.button('确认');
  assert.deepEqual(panel().focus,{...original,projects:latest,checks:{...original.checks,projects:false}});
  assert.equal(h.state().reviewUpdates,undefined);
  const button=panel().saveAction('projects');button.props.onClick({currentTarget:{closest:()=>null,dataset:{reviewSave:'projects'}}});h.refresh();
  assert.equal(h.state().reviewUpdates.at(-1).module,'projects');
  assert.equal(h.state().reviewUpdates.at(-1).moduleDraft.focus.notes.projects,'先付定金');
  assert.equal(h.state().reviewUpdates.at(-1).moduleDraft.focus.projects[0].actualDate,'2026-10-28');
  assert.equal(h.state().reviewUpdates.at(-1).moduleDraft.focus.projects[0].includedInLedger,true);
  assert.deepEqual(h.state().fundBuckets,latest);
});

test('bill refresh pulls the current reminder list only, retains notes and allows subsequent scoped save',()=>{
  const h=harness(), panel=()=>h.find(n=>typeof n.props?.onRefreshBills==='function').props;
  const original={...panel().focus, bills:[{id:'old',name:'旧订阅',date:'2026-10-28',amount:3,kind:'订阅'}],
    projects:[{id:'p',name:'搬家',target:100,current:7,dueDate:'2026-11-01'}],
    checks:{projects:true,bills:true,balance:true},notes:{bills:'调整了订阅',projects:'保持原计划'}};
  panel().onChange(original);h.refresh();
  const latest=[{id:'new',name:'新增订阅',date:'2026-11-09',amount:18.8,kind:'订阅'}];
  h.state().reminders=latest;h.refresh();
  panel().onRefreshBills();h.refresh();h.button('取消');assert.deepEqual(panel().focus,original);
  panel().onRefreshBills();h.refresh();h.button('确认');
  assert.deepEqual(panel().focus,{...original,bills:latest,checks:{...original.checks,bills:false}});
  assert.equal(h.state().reviewUpdates,undefined);
  const button=panel().saveAction('bills');button.props.onClick({currentTarget:{closest:()=>null,dataset:{reviewSave:'bills'}}});h.refresh();
  assert.equal(h.state().reviewUpdates.at(-1).module,'bills');assert.deepEqual(h.state().reminders,latest);
});

test('balance refresh replaces only balance rows, reconciles totals and allows a scoped save',()=>{
  const h=harness();h.prepare();const panel=()=>h.find(n=>typeof n.props?.onRefreshBalance==='function').props;
  const original={...panel().focus,assets:[{id:'old',name:'旧资产',amount:4}],notes:{balance:'核对说明'},checks:{balance:true,projects:true,bills:true}};
  panel().onChange(original);h.refresh();
  const assets=[{id:'a',name:'资产甲',amount:12.34},{id:'b',name:'资产乙',amount:0.11}];
  const debts=[{id:'d',name:'负债',amount:0}];h.state().balanceAssets=assets;h.state().liabilities=debts;h.refresh();
  panel().onRefreshBalance();h.refresh();h.button('取消');assert.deepEqual(panel().focus,original);
  panel().onRefreshBalance();h.refresh();h.button('确认');
  assert.deepEqual(panel().focus,{...original,assets,debts,checks:{balance:false,projects:true,bills:true}});
  assert.equal(h.find(n=>n.props?.['aria-label']==='其他个人资产').props.value,12.45);
  assert.equal(h.find(n=>n.props?.['aria-label']==='个人负债').props.value,0);
  assert.equal(h.state().reviewUpdates,undefined);
  const button=panel().saveAction('balance');button.props.onClick({currentTarget:{closest:()=>null,dataset:{reviewSave:'balance'}}});h.refresh();
  assert.equal(h.state().reviewUpdates.at(-1).module,'balance');assert.deepEqual(h.state().balanceAssets,assets);
});

test('refreshing changed bills unblocks full save without accepting a concurrent account change',()=>{
  const h=harness();h.prepare();const focus=()=>h.find(n=>typeof n.props?.onRefreshBills==='function').props;
  h.input('日常使用本期金额','12.34');
  h.state().reminders=[{id:'sub',name:'Test sub',kind:'订阅',date:'2026-11-01',amount:10}];
  h.state().accounts[0].balance=80;h.refresh();
  focus().onRefreshBills();h.refresh();h.button('确认');
  focus().onChange({...focus().focus,checks:{...focus().focus.checks,bills:true}});h.refresh();
  h.submit();assert.match(h.find(n=>n.props?.id==='review-result-message').props.children,/需重新核对：账户余额。/);
  assert.equal(h.state().financeReviews.length,0);assert.equal(h.state().accounts[0].balance,80);
  h.button('只带入变化的模块');h.button('确认');
  assert.equal(h.find(n=>n.props?.['aria-label']==='日常使用本期金额').props.value,12.34);
  assert.equal(focus().focus.checks.bills,true);
  h.find(n=>n.type==='label'&&Array.isArray(n.props.children)&&n.props.children.includes('已核对本期期末账户余额')).props.children[0].props.onChange({target:{checked:true}});h.refresh();
  h.submit();assert.equal(h.state().financeReviews.length,1);assert.equal(h.state().accounts[0].balance,80);
});

test('reopening an older week edits its own report and ledger without rolling back subsequent balances',()=>{
  const h=harness();h.prepare();h.input('日常使用本期金额','12.50');h.submit();h.refresh();
  const prior=structuredClone(h.state().financeReviews[0]);
  h.state().dashboardAsOf='2026-11-05';h.state().accounts[0].balance=900;
  h.refresh();h.button('修订本期');h.button('确认');
  assert.equal(h.find(n=>n.props?.['aria-label']==='日常使用本期金额').props.value,12.5);
  assert.equal(h.find(n=>n.props?.['aria-label']==='Test bank复盘期末余额').props.value,450.5);
  assert.equal(h.find(n=>n.type==='input'&&n.props.type==='date'&&n.props.required).props.readOnly,true);
  h.input('日常使用本期金额','32.25');h.button('保存并更新支出');h.refresh();
  assert.equal(h.state().monthlyRecords[0].budgets[0].actual,32.25);
  assert.equal(h.state().financeReviews[0].amounts.daily,32.25);
  h.input('日常使用本期金额','22.25');h.submit();h.button('确认');h.refresh();
  assert.equal(h.state().monthlyRecords[0].budgets.length,1);
  assert.equal(h.state().monthlyRecords[0].budgets[0].actual,22.25);
  assert.equal(h.state().financeReviews[0].id,prior.id);assert.equal(h.state().financeReviews[0].end,prior.end);
  assert.equal(h.state().reviewUpdates.at(-1).before.financeReviews[0].amounts.daily,32.25);
  assert.equal(h.state().accounts[0].balance,900);assert.equal(h.state().dashboardAsOf,'2026-11-05');
});

test('weekly spending revision ignores another month but requires renewed comparison for same-week changes',()=>{
  const h=harness();h.prepare();h.input('日常使用本期金额','12.50');h.submit();h.refresh();
  h.state().monthlyRecords.push({id:'2026-11',salary:0,otherIncome:0,budgets:[]});h.refresh();
  h.button('修订本期');h.button('确认');h.input('日常使用本期金额','14');h.button('保存并更新支出');h.refresh();
  const rows=()=>h.state().monthlyRecords[0].budgets;
  assert.equal(rows()[0].actual,14);
  rows()[0].actual=21;h.refresh();h.input('日常使用本期金额','16');h.input('日常使用本期事项','修订说明');
  h.button('保存并更新支出');assert.equal(rows()[0].actual,21);
  h.button('已核对，保留本次修订');assert.equal(rows()[0].actual,21);
  rows()[0].actual=22;h.refresh();h.button('保存并更新支出');assert.equal(rows()[0].actual,22);
  h.button('已核对，保留本次修订');h.button('保存并更新支出');assert.equal(rows().length,1);
  assert.equal(rows()[0].actual,16);assert.equal(rows()[0].note,'修订说明');
});

test('revision of a published report uses its saved baseline, not an artificial conflict',()=>{
  const h=harness();h.prepare();h.submit();h.refresh();h.button('修订本期');h.button('确认');
  h.prepare();h.submit();h.button('确认');h.refresh();
  assert.equal(h.state().reviewUpdates.length,2);assert.equal(h.state().financeReviews.length,1);
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'保存并更新完毕');
});

test('an account module save advances the full-save baseline without accepting a later outside edit',()=>{
  const h=harness();h.prepare();h.button('保存并更新账户余额');h.refresh();h.submit();h.refresh();
  assert.equal(h.state().financeReviews.length,1);assert.equal(h.state().reviewUpdates.length,2);
  h.state().accounts[0].balance=999;h.refresh();h.button('修订本期');h.button('确认');h.prepare();h.submit();
  assert.match(h.find(n=>n.props?.id==='review-result-message').props.children,/需重新核对：账户余额/);
  assert.equal(h.state().accounts[0].balance,999);assert.equal(h.state().reviewUpdates.length,2);
});

test('standalone note save requires no amounts, does not submit other edits, and restores in the same week',()=>{
  const h=harness();const field=()=>h.find(n=>n.type==='textarea'&&n.props['aria-label']==='整体变化说明情况');
  h.input('家用本期金额','123');field().props.onChange({target:{value:'这周减少了外卖。'}});h.refresh();
  h.button('保存并更新说明');assert.equal(h.state().financeReviews.length,0);
  assert.deepEqual(h.state().monthlyRecords[0].budgets,[]);assert.equal(h.state().accounts[0].balance,100);
  assert.equal(h.find(n=>n.props?.['aria-label']==='家用本期金额').props.value,123);
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'保存并更新完毕');
  h.reopen();assert.equal(field().props.value,'这周减少了外卖。');
  h.prepare();h.submit();h.refresh();assert.equal(h.state().financeReviews[0].overallChange,'这周减少了外卖。');
  h.button('修订本期');h.button('确认');const original=structuredClone(h.state().financeReviews[0]);
  field().props.onChange({target:{value:'本周修订'}});h.refresh();h.button('保存并更新说明');
  assert.deepEqual(h.state().financeReviews,[{...original,overallChange:'本周修订'}]);
  field().props.onChange({target:{value:''}});h.refresh();h.button('保存并更新说明');assert.equal(h.state().financeReviews[0].overallChange,undefined);
});

test('standalone note write failure keeps the input and does not report success',()=>{
  const h=harness(true);const field=()=>h.find(n=>n.type==='textarea'&&n.props['aria-label']==='整体变化说明情况');
  field().props.onChange({target:{value:'待保存'}});h.refresh();h.button('保存并更新说明');
  assert.equal(field().props.value,'待保存');assert.equal(h.state().weeklyNotes,undefined);
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'未保存，请检查');
});

test('successful UI save retains committed balances, report and source baseline after parent refresh',()=>{
  const h=harness();h.prepare();h.submit();
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'保存并更新完毕');
  assert.equal(h.state().accounts[0].balance,450.5);
  assert.equal(h.state().reviewUpdates.length,1);
  h.refresh();h.button('更新数据');
  assert.equal(h.find(n=>n.props?.['aria-label']==='Test bank复盘期末余额').props.value,450.5);
  assert.equal(h.find(n=>n.props?.['aria-label']==='现金及存款').props.value,450.5);
  assert.equal(h.find(n=>n.props?.['aria-label']==='证券账户总资产').props.value,700);
  h.submit();h.button('确认');h.refresh();
  assert.equal(h.state().reviewUpdates.length,2);
  assert.equal(h.state().financeReviews.length,1);
  assert.equal(h.state().reviewUpdates[0].before.accounts[0].balance,100);
  assert.equal(h.state().reviewUpdates[1].after.accounts[0].balance,450.5);
});

test('persistence failures keep inputs and never show a successful save',()=>{
  const h=harness(true);h.prepare();h.submit();
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'未保存，请检查');
  assert.match(h.find(n=>n.props?.id==='review-result-message').props.children,/Storage quota/);
  assert.equal(h.state().accounts[0].balance,100);
  assert.equal(h.find(n=>n.props?.['aria-label']==='Test bank复盘期末余额').props.value,450.5);
});

test('weekly reflection survives save, export and revision without affecting amounts or old reviews',()=>{
  const h=harness(); h.prepare();
  const note='本周有一笔临时开销。\n下周先核对交通支出。';
  const field=()=>h.find(n=>n.type==='textarea' && n.props['aria-label']==='整体变化说明情况');
  field().props.onChange({target:{value:note}}); h.refresh(); h.submit(); h.refresh();
  const restored=m.parseFinanceReviews(JSON.parse(JSON.stringify(h.state().financeReviews)))[0];
  assert.equal(restored.overallChange,note);
  assert.match(m.financeReviewReport(restored,[restored]),/## 整体变化说明情况\n本周有一笔临时开销。\n下周先核对交通支出。/);
  h.find(n=>n.type==='section' && n.props['aria-label']==='整体变化说明情况');
  h.button('修订本期'); h.button('确认'); assert.equal(field().props.value,note);
  const old=m.parseFinanceReview({...restored,overallChange:undefined,summary:'旧的补充事项'});
  assert.equal(old.summary,'旧的补充事项'); assert.equal(old.overallChange,undefined);
  assert.deepEqual(m.reviewTotals(old),m.reviewTotals(restored));
});

test('invalid controls including collapsed fields produce an explicit error before any write',()=>{
  const h=harness();
  h.submit({getAttribute:()=> 'Test bank复盘期末余额',type:'number',validationMessage:'Please fill out this field.'});
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'未保存，请检查');
  assert.match(h.find(n=>n.props?.id==='review-result-message').props.children,/Test bank/);
  assert.equal(h.state().financeReviews.length,0);
  h.find(n=>n.type==='button'&&n.props.children==='前往检查');
});

test('history-only saves explicitly distinguish reports from dashboard updates',()=>{
  const h=harness();h.prepare();
  h.find(n=>n.props?.['aria-label']==='复盘保存范围').props.onChange({target:{value:'history'}});
  h.refresh();h.submit();
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'历史报告保存完毕');
  assert.equal(h.state().accounts[0].balance,100);
  assert.equal(h.state().financeReviews[0].accounts[0].balance,450.5);
  assert.equal(h.state().reviewUpdates[0].published,false);
});

test('account module saves with empty spending and unchecked investment/goals, retaining other inputs',()=>{
  const h=harness();
  h.input('Test bank复盘期末余额','2357');
  h.input('日常使用本期金额','99');
  h.button('保存并更新账户余额');h.refresh();
  assert.equal(h.state().accounts[0].balance,2357);
  assert.equal(h.state().holdings[0].value,200);
  assert.equal(h.state().financeReviews.length,0);
  assert.equal(h.state().reviewUpdates[0].module,'accounts');
  assert.equal(h.find(n=>n.props?.['aria-label']==='日常使用本期金额').props.value,99);
  assert.equal(h.find(n=>n.props?.['aria-label']==='现金及存款').props.value,2357);
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'保存并更新完毕');
});

test('total save identifies the exact unconfirmed modules instead of blaming a confirmed account',()=>{
  const h=harness();
  h.input('Test bank复盘期末余额','2357');h.button('保存并更新账户余额');h.refresh();
  h.submit();
  const message=h.find(n=>n.props?.id==='review-result-message').props.children;
  assert.match(message,/投资账户、大花费项目、账单与订阅、资产负债/);
  assert.doesNotMatch(message,/账户余额/);
  assert.equal(h.state().accounts[0].balance,2357);
});

test('module persistence failure keeps the edited amount and does not create history or success',()=>{
  const h=harness(true);h.input('Test bank复盘期末余额','2357');h.button('保存并更新账户余额');
  assert.equal(h.state().accounts[0].balance,100);
  assert.equal(h.state().reviewUpdates,undefined);
  assert.equal(h.find(n=>n.props?.['aria-label']==='Test bank复盘期末余额').props.value,2357);
  assert.equal(h.find(n=>n.props?.id==='review-result-title').props.children,'未保存，请检查');
});
