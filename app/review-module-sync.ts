import {newReviewDraft, newReviewFocus, parseFinanceReview, reviewAccountCash, reviewInvestmentTotal, reviewPeriod, reviewToday, type ReviewDraft, type ReviewFocus} from "./finance-review-model";
import type {DashboardState, ReviewUpdate} from "./review-dashboard-sync";
import {syncWeeklyReview} from "./review-ledger-sync";
import {addParentSupport, mergeManualGoals, syncAccountGoals} from "./goal-sync-model";

export const reviewModuleLabels = {income:"收入",spending:"支出",accounts:"账户余额",investments:"投资账户",projects:"大花费项目",bills:"账单与订阅",balance:"资产负债",goals:"目标余额"} as const;
export type ReviewModule = keyof typeof reviewModuleLabels;
export type ReviewModulePatch = Partial<Pick<ReviewDraft,"income"|"incomeLedger"|"amounts"|"notes"|"accounts"|"investments"|"goals">> & {focus?:Partial<ReviewFocus>};
const total=(rows:Array<{amount:number}>)=>rows.reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;

export function mergeReviewModule(draft:ReviewDraft, patch:ReviewModulePatch):ReviewDraft {
  const focus=draft.focus ?? newReviewFocus({projects:[],bills:[],assets:[],debts:[],holdings:0});
  const next={...draft,...patch,notes:{...draft.notes,...patch.notes},focus:patch.focus ? {...focus,...patch.focus,checks:{...focus.checks,...patch.focus.checks},notes:{...focus.notes,...patch.focus.notes}} : draft.focus};
  next.balances={...draft.balances};
  if(patch.accounts) next.balances.cash=reviewAccountCash(patch.accounts);
  if(patch.investments) {
    next.balances.investments=reviewInvestmentTotal(patch.investments);
    if(next.focus) next.focus={...next.focus,holdings:next.balances.investments};
  }
  if(patch.focus?.assets) next.balances.otherAssets=total(patch.focus.assets);
  if(patch.focus?.debts) next.balances.debt=total(patch.focus.debts);
  return next;
}

// Reuse existing money/date/ID validators in isolation. The zero-filled validation shell is never saved as a report.
export function normalizeReviewModule(draft:ReviewDraft, module:ReviewModule):ReviewModulePatch {
  const shell={...newReviewDraft(draft.type,draft.end,draft.monthStartDay),start:draft.start,income:0,
    amounts:Object.fromEntries(Object.keys(draft.amounts).map(key=>[key,0])) as ReviewDraft["amounts"],
    balances:{cash:0,investments:0,otherAssets:0,debt:0}};
  let patch:ReviewModulePatch;
  if(module==="income") patch={income:draft.income,...(draft.incomeLedger?{incomeLedger:draft.incomeLedger}:{})};
  else if(module==="spending") patch={amounts:draft.amounts,notes:draft.notes};
  else if(module==="accounts") {
    if(!draft.accounts) throw new Error("请带入账户余额明细。");
    patch={accounts:draft.accounts};
  } else if(module==="investments") {
    if(!draft.investments) throw new Error("请带入投资账户明细。");
    patch={investments:draft.investments};
  } else if(module==="goals") {
    if(!draft.goals) throw new Error("请带入目标余额明细。");
    patch={goals:draft.goals};
  } else {
    if(!draft.focus) throw new Error("请带入关键事项明细。");
    const focus=newReviewFocus({projects:[],bills:[],assets:[],debts:[],holdings:0});
    if(module==="projects") focus.projects=draft.focus.projects;
    if(module==="bills") focus.bills=draft.focus.bills;
    if(module==="balance") {focus.assets=draft.focus.assets;focus.debts=draft.focus.debts;}
    focus.checks[module]=true;focus.notes[module]=draft.focus.notes[module];
    patch={focus};
  }
  const parsed=parseFinanceReview(mergeReviewModule(shell,patch));
  if(module==="income") return {income:parsed.income,...(parsed.incomeLedger?{incomeLedger:parsed.incomeLedger}:{})};
  if(module==="spending") return {amounts:parsed.amounts,notes:parsed.notes};
  if(module==="accounts") return {accounts:parsed.accounts};
  if(module==="investments") return {investments:parsed.investments};
  if(module==="goals") return {goals:parsed.goals};
  const focus=parsed.focus!;
  return {focus:{...(module==="balance" ? {assets:focus.assets,debts:focus.debts} : module==="projects" ? {projects:focus.projects} : {bills:focus.bills}),
    notes:{[module]:focus.notes[module]},checks:{[module]:true} as ReviewFocus["checks"]}};
}

export function reviewModuleSignature(state:DashboardState,module:ReviewModule):string {
  const entries=state.datedEntries ?? [];
  const values={accounts:state.accounts,investments:[state.holdings,state.fxUsd,state.fxHkd],projects:state.fundBuckets,bills:state.reminders,
    balance:[state.balanceAssets,state.liabilities],goals:[state.goals,state.accounts],
    income:[state.monthlyRecords.map(({id,salary,otherIncome})=>({id,salary,otherIncome})),entries.filter(row=>row.flow==="income")],
    spending:[state.monthlyRecords.map(({id,budgets})=>({id,budgets})),entries.filter(row=>row.flow==="expense")]};
  return JSON.stringify(values[module]);
}

export function restoreReviewModules(draft:ReviewDraft,updates:ReviewUpdate[],signatures:Record<ReviewModule,string>):ReviewDraft {
  let next=draft;
  for(const scope of Object.keys(reviewModuleLabels) as ReviewModule[]) {
    const update=[...updates].reverse().find(row=>row.reviewId===`${draft.type}:${draft.start}` && row.published && (!row.module || row.module===scope));
    if(update?.module===scope && update.asOf===draft.end && update.moduleDraft && reviewModuleSignature(update.after as DashboardState,scope)===signatures[scope]) {
      next=mergeReviewModule(next,update.moduleDraft);
    }
  }
  return next;
}

export function commitReviewModule<T extends DashboardState>(state:T,draft:ReviewDraft,module:ReviewModule,sourceSignature:string,now=new Date().toISOString(),today=reviewToday()):{data:T;patch:ReviewModulePatch} {
  if(!Object.hasOwn(reviewModuleLabels,module)) throw new Error("未知复盘模块。");
  const cutoff=[state.dashboardAsOf ?? "",...(state.financeReviews ?? []).filter(row=>row.type==="week").map(row=>row.end),...(state.reviewUpdates ?? []).filter(row=>row.published).map(row=>row.asOf)].sort().at(-1)!;
  if(draft.type!=="week" || draft.end<cutoff || draft.end>today || reviewPeriod("week",draft.end).start!==draft.start) throw new Error("仅当前最新周复盘可更新模块；历史和未来期间请保存历史报告。");
  if(sourceSignature!==reviewModuleSignature(state,module)) throw new Error(`${reviewModuleLabels[module]}已在其他位置修改，请重新带入并核对后保存。`);
  const patch=normalizeReviewModule(module==="goals" && draft.goals ? {...draft,goals:mergeManualGoals(state.goals,draft.goals,state.accounts)} : draft,module);
  const sameIds=(a:Array<{id:string}>,b:Array<{id:string}>)=>{
    if(a.length!==b.length || a.some(row=>!b.some(other=>row.id===other.id))) throw new Error(`${reviewModuleLabels[module]}清单已变化，请重新带入当前模块。`);
  };
  const merge=<A extends {id:string},B extends {id:string}>(rows:A[],updates:B[])=>{sameIds(rows,updates);return rows.map(row=>({...row,...updates.find(item=>item.id===row.id)}));};
  let next={...state};
  if(module==="accounts") {
    sameIds(state.accounts,patch.accounts!);
    next.accounts=state.accounts.map(row=>{const account=patch.accounts!.find(item=>item.id===row.id)!;return {...row,balance:account.balance!,includedInPersonal:account.included};});
  } else if(module==="investments") {
    next.holdings=merge(state.holdings,patch.investments!.holdings);next.fxUsd=patch.investments!.fxUsd;next.fxHkd=patch.investments!.fxHkd;
  } else if(module==="projects") next.fundBuckets=merge(state.fundBuckets,patch.focus!.projects!);
  else if(module==="bills") next.reminders=merge(state.reminders,patch.focus!.bills!);
  else if(module==="balance") {next.balanceAssets=merge(state.balanceAssets,patch.focus!.assets!);next.liabilities=merge(state.liabilities,patch.focus!.debts!);}
  else if(module==="goals") next.goals=mergeManualGoals(state.goals,merge(state.goals,patch.goals!),state.accounts);
  else {
    const income=(state.datedEntries ?? []).filter(row=>row.flow==="income"&&row.date>=draft.start&&row.date<=draft.end).reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;
    if(module==="income") {
      if(income!==patch.income) throw new Error("收入合计与到账明细不一致，请先保存带日期的工资和其他收入，或带入本期收入。");
    } else {
      const valid={...newReviewDraft("week",draft.end),income,amounts:patch.amounts!,notes:patch.notes!,balances:{cash:0,investments:0,otherAssets:0,debt:0}};
      next.monthlyRecords=syncWeeklyReview(state.monthlyRecords,state.datedEntries ?? [],parseFinanceReview(valid));
      next.goals=addParentSupport(state.goals,`week:${draft.start}`,patch.amounts!.parents!);
    }
    next.selectedMonth=draft.end.slice(0,7);
  }
  if(module==="accounts" || module==="spending" || module==="goals") next.goals=syncAccountGoals(next.goals,next.accounts);
  const snapshot=(data:DashboardState)=>{const copy={...data};delete copy.reviewUpdates;return structuredClone(copy);};
  const update:ReviewUpdate={id:`${now}:${(state.reviewUpdates ?? []).length}`,reviewId:`${draft.type}:${draft.start}`,asOf:draft.end,savedAt:now,published:true,module,moduleDraft:patch,before:snapshot(state),after:snapshot(next)};
  next={...next,reviewUpdates:[...(state.reviewUpdates ?? []),update]};
  return {data:next,patch};
}
