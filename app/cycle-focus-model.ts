import {reviewHoldingCny, reviewMoney, reviewPeriod, type FinanceReview} from "./finance-review-model";
import type {DashboardState, ReviewUpdate} from "./review-dashboard-sync";

const scopes = ["projects", "bills", "balance", "accounts", "investments"] as const;
type Scope = typeof scopes[number];
type Row = {id:string; name:string; fields:Record<string,string>};
type Observation = {scope:Scope; asOf:string; saved:string; rows:Row[]; before?:Row[]; note?:string};
const row = (id:string,name:string,fields:Record<string,string>):Row => ({id,name,fields});
const projects = (items:DashboardState['fundBuckets']) => items.map(p=>row(p.id,p.name,{实际:reviewMoney(p.current),目标:reviewMoney(p.target),预算日期:p.dueDate||'未填',实际日期:p.actualDate||'未填'}));
const bills = (items:DashboardState['reminders'],asOf:string) => items.map(p=>row(p.id,p.name,{登记金额:reviewMoney(p.amount),提醒:p.date||'未填',类型:p.kind,本月缴费:Object.hasOwn(p.payments??{},asOf.slice(0,7))?(p.payments?.[asOf.slice(0,7)]||'已缴'):'未标记'}));
const balance = (assets:DashboardState['balanceAssets'],debts:DashboardState['liabilities']) => [
  ...assets.map(p=>row('asset:'+p.id,p.name,{资产:reviewMoney(p.amount)})),...debts.map(p=>row('debt:'+p.id,p.name,{负债:reviewMoney(p.amount)}))];
const accounts = (items:Array<{id:string;name:string;balance:number}>) => items.map(p=>row(p.id,p.name,{账户余额:reviewMoney(p.balance)}));
const investments = (fx:NonNullable<FinanceReview['investments']>) => fx.holdings.map(p=>row(p.id,p.name,{持仓市值:reviewMoney(reviewHoldingCny(p,fx))}));
function snapshot(scope:Scope,s:DashboardState,asOf:string) {
  switch(scope){case 'projects':return projects(s.fundBuckets);case 'bills':return bills(s.reminders,asOf);
    case 'balance':return balance(s.balanceAssets,s.liabilities);case 'accounts':return accounts(s.accounts);case 'investments':return investments(s);}
}
function describe(now:Row[], prior?:Row[]) {
  const lines:string[]=[];
  for(const item of now){
    const old=prior?.find(r=>r.id===item.id);
    if(!old){lines.push(`${prior?'新增登记':'首次记录'}：${item.name} · ${Object.entries(item.fields).map(([k,v])=>`${k} ${v}`).join('，')}`);continue;}
    const edits=Object.entries(item.fields).filter(([k,v])=>old.fields[k]!==v).map(([k,v])=>`${k} ${old.fields[k]} → ${v}`);
    if(old.name!==item.name) edits.unshift(`名称 ${old.name} → ${item.name}`);
    if(edits.length) lines.push(`${item.name}：${edits.join('，')}`);
  }
  for(const item of prior??[]) if(!now.some(r=>r.id===item.id)) lines.push(`移出清单：${item.name}`);
  return lines;
}
export function cycleFocusHistory(today:string,records:FinanceReview[],updates:ReviewUpdate[]) {
  const cycle=reviewPeriod('month',today,10), events:Observation[]=[];
  for(const update of updates){
    if(!update.published || update.revisedWeek || !update.reviewId.startsWith('week:') || update.asOf>today) continue;
    for(const scope of scopes){
      if(update.module && update.module!==scope) continue;
      events.push({scope,asOf:update.asOf,saved:update.savedAt,rows:snapshot(scope,update.after as DashboardState,update.asOf),
        before:snapshot(scope,update.before as DashboardState,update.asOf),note:scope==='projects'||scope==='bills'||scope==='balance'?update.moduleDraft?.focus?.notes?.[scope]:undefined});
    }
  }
  for(const rec of records){
    if(rec.type!=='week'||rec.end>today)continue;
    const put=(scope:Scope,rows:Row[],note?:string)=>events.push({scope,rows,note,asOf:rec.end,saved:rec.savedAt});
    const f=rec.focus;
    if(f?.checks.projects)put('projects',projects(f.projects),f.notes.projects);
    if(f?.checks.bills)put('bills',bills(f.bills,rec.end),f.notes.bills);
    if(f?.checks.balance)put('balance',balance(f.assets,f.debts),f.notes.balance);
    if(rec.accounts)put('accounts',accounts(rec.accounts));
    if(rec.investments)put('investments',investments(rec.investments));
  }
  events.sort((a,b)=>a.asOf.localeCompare(b.asOf)||a.saved.localeCompare(b.saved));
  const weeks=[];
  for(let start=cycle.start;start<=cycle.limit;){
    const sunday=reviewPeriod('week',start).limit,end=sunday<cycle.limit?sunday:cycle.limit;
    const sections=scopes.map(scope=>{
      const history=events.filter(e=>e.scope===scope),week=history.filter(e=>e.asOf>=start&&e.asOf<=end),last=week.at(-1);
      if(!last)return {scope,status:start>today?'未到本周':'未记录',lines:[] as string[],note:'',asOf:'',comparison:''};
      const prior=history.filter(e=>e.asOf<start).at(-1);
      const baseline=prior?.rows??week.find(e=>e.before)?.before;
      const changes=describe(last.rows,baseline);
      const first=!prior && (!baseline || !changes.length);
      const lines=first ? describe(last.rows) : changes;
      // A full publish has both a report and a write-back receipt. The report owns its narrative.
      const note=last.note ?? week.filter(e=>e.asOf===last.asOf&&e.note!==undefined).at(-1)?.note ?? '';
      return {scope,status:first?'首次基准':lines.length?'有变化':'已核对，无变化',lines,note,asOf:last.asOf,
        comparison:prior?`与 ${prior.asOf} 核对记录相比`:first?'本期清单':`与本周首次保存前相比`};
    });
    weeks.push({start,end,sections});
    const next=new Date(`${end}T00:00:00Z`);next.setUTCDate(next.getUTCDate()+1);start=next.toISOString().slice(0,10);
  }
  return {cycle,weeks};
}
