const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const {loadModel}=require('../scripts/finance-review.cjs');
const m=loadModel('finance-review-model');
const d=loadModel('review-dashboard-sync');
const modules=loadModel('review-module-sync');
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
    moduleUpdates:state.reviewUpdates ?? [],moduleSignatures:Object.fromEntries(Object.keys(modules.reviewModuleLabels).map(key=>[key,modules.reviewModuleSignature(state,key)])),
    onSaveModule:(draft,module,signature)=>{
      if(fail)throw new Error('Storage quota exceeded');
      const result=modules.commitReviewModule(state,draft,module,signature,'2026-10-29T01:00:00Z','2026-10-29');state=result.data;
      return {patch:result.patch,moduleSignature:modules.reviewModuleSignature(state,module),sourceSignature:d.dashboardSourceSignature(state)};
    },
    investments:{holdings:state.holdings,fxUsd:7,fxHkd:1},goals:state.goals,dashboardAsOf:state.dashboardAsOf,
    sourceSignature:d.dashboardSourceSignature(state),focusSource:{projects:[],bills:[],assets:[],debts:[],holdings:state.holdings[0].value},
    ledgerMonths:state.monthlyRecords,datedEntries:[],onSaveIncome:()=>{},onDeleteIncome:()=>{},onOpenModule:()=>{},
    onChange:(records,request)=>{
      if(fail)throw new Error('Storage quota exceeded');
      state=d.commitReviewUpdate(state,records,request,'2026-10-29T01:00:00Z','2026-10-29');
      return {sourceSignature:d.dashboardSourceSignature(state)};
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
    for(const label of ['已核对本期期末账户余额','已核对目标余额（不重复计入个人现金）']) {
      const node=find(n=>n.type==='label'&&Array.isArray(n.props.children)&&n.props.children.includes(label));
      node.props.children[0].props.onChange({target:{checked:true}});render();
    }
  }
  function submit(invalid=null){const form=find(n=>n.type==='form');assert.equal(form.props.noValidate,true);form.props.onSubmit({preventDefault:()=>{},currentTarget:{querySelector:()=>invalid}});render();}
  updateProps();render();
  return {prepare,submit,button,input,find,state:()=>state,refresh:()=>{updateProps();render();}};
}

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
  assert.match(message,/投资账户、目标余额、大花费项目、账单与订阅、资产负债/);
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
