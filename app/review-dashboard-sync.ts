import {newReviewDraft, parseFinanceReview, reviewInvestmentTotal, reviewToday, type FinanceReview, type ReviewHolding} from "./finance-review-model";
import {mergeReviewModule, normalizeReviewModule, reviewModuleLabels, reviewModuleSignature, sameWeeklySpending, type ReviewModule, type ReviewModulePatch} from "./review-module-sync";
import {syncWeeklyReview} from "./review-ledger-sync";
import type {DatedEntry, LedgerMonth} from "./dated-ledger-model";
import {addParentSupport, mergeManualGoals, type GoalBalance} from "./goal-sync-model";

export type WeekRevision = {original:FinanceReview; spending:string};
export type ReviewUpdate = {id:string; reviewId:string; asOf:string; savedAt:string; published:boolean; revisedWeek?:boolean; module?:ReviewModule; moduleDraft?:ReviewModulePatch; before:Record<string,unknown>; after:Record<string,unknown>};
export type DashboardState = {
  monthlyRecords:LedgerMonth[]; datedEntries?:DatedEntry[]; financeReviews?:FinanceReview[];
  accounts:Array<{id:string;name:string;type:string;purpose:string;balance:number;includedInPersonal?:boolean}>;
  holdings:ReviewHolding[]; fxUsd:number; fxHkd:number;
  balanceAssets:Array<{id:string;name:string;amount:number}>; liabilities:Array<{id:string;name:string;amount:number}>;
  reminders:Array<{id:string;name:string;amount:number;date:string;kind:string}>;
  fundBuckets:Array<{id:string;name:string;target:number;current:number;dueDate:string;actualDate?:string;includedInLedger?:boolean}>;
  goals:GoalBalance[];
  dashboardAsOf?:string; reviewUpdates?:ReviewUpdate[]; selectedMonth?:string;
};
const total=(rows:Array<{amount:number}>)=>rows.reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;
function sameIds(a:Array<{id:string}>, b:Array<{id:string}>, label:string) {
  if(a.length!==b.length || new Set(b.map(row=>row.id)).size!==b.length || a.some(row=>!b.some(other=>row.id===other.id))) throw new Error(`${label}清单已变化，请重新带入当前模块并核对，不能遗漏或猜测账户。`);
}
function merge<T extends {id:string}, U extends {id:string}>(current:T[], updates:U[]) {
  return current.map(row=>({...row,...updates.find(update=>update.id===row.id)}));
}
export const dashboardScopes = ["accounts","investments","projects","bills","balance","goals"] as const;
export type DashboardScope = typeof dashboardScopes[number];
export function dashboardSourceSignature(state:DashboardState) {
  return JSON.stringify({accounts:state.accounts,investments:[state.holdings,state.fxUsd,state.fxHkd],projects:state.fundBuckets,
    bills:state.reminders,balance:[state.balanceAssets,state.liabilities],goals:state.goals});
}
export function changedDashboardScopes(base:string, next:string) {
  if(base===next) return [];
  const a=JSON.parse(base || "{}"), b=JSON.parse(next);
  return dashboardScopes.filter(key=>JSON.stringify(a[key])!==JSON.stringify(b[key]));
}
// A scoped refresh/save acknowledges only the sources actually read or written.
export function advanceDashboardSource(base:string,next:string,keys:readonly DashboardScope[]) {
  const a=JSON.parse(base || "{}"), b=JSON.parse(next);
  return JSON.stringify(Object.fromEntries(dashboardScopes.map(key=>[key,keys.includes(key)?b[key]:a[key]])));
}
export function dashboardSnapshotTotals(state:DashboardState) {
  const cash=state.accounts.filter(row=>row.includedInPersonal!==false).reduce((sum,row)=>sum+Math.round(row.balance*100),0)/100;
  const investments=reviewInvestmentTotal({holdings:state.holdings,fxUsd:state.fxUsd,fxHkd:state.fxHkd});
  const debt=total(state.liabilities);
  return {cash,investments,debt,netWorth:Math.round((cash+investments+total(state.balanceAssets)-debt)*100)/100};
}
export function parseReviewUpdates(value:unknown):ReviewUpdate[] {
  if(value===undefined) return [];
  if(!Array.isArray(value)) throw new Error("整期更新历史格式无效，未导入。");
  const ids=new Set<string>();
  return value.map(raw=>{
    const row=structuredClone(raw) as ReviewUpdate;
    if(!row || typeof row.id!=="string" || ids.has(row.id) || typeof row.reviewId!=="string" || typeof row.asOf!=="string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.asOf) || !Number.isFinite(Date.parse(row.savedAt)) || typeof row.published!=="boolean") throw new Error("整期更新历史编号或日期无效，未导入。");
    ids.add(row.id);
    if(row.module!==undefined) {
      if(!Object.hasOwn(reviewModuleLabels,row.module) || !row.moduleDraft || !row.published) throw new Error("模块更新历史无效，未导入。");
      const draft=newReviewDraft("week",row.asOf);
      if(row.reviewId!==`week:${draft.start}`) throw new Error("模块更新历史周期无效，未导入。");
      row.moduleDraft=normalizeReviewModule(mergeReviewModule(draft,row.moduleDraft),row.module);
    }
    for(const snapshot of [row.before,row.after]) {
      if(!snapshot || typeof snapshot!=="object" || "reviewUpdates" in snapshot || !["accounts","holdings","balanceAssets","liabilities","monthlyRecords","reminders","fundBuckets","goals"].every(key=>Array.isArray(snapshot[key]))) throw new Error("整期更新历史快照不完整，未导入。");
      try {
        if(Object.values(dashboardSnapshotTotals(snapshot as unknown as DashboardState)).some(value=>!Number.isFinite(value))) throw new Error();
      } catch {throw new Error("整期更新历史金额无效，未导入。");}
    }
    return structuredClone(row);
  });
}

// Validation and history are prepared together; the caller performs one atomic storage write before changing React state.
export function commitReviewUpdate<T extends DashboardState>(state:T, records:FinanceReview[], request:{record?:FinanceReview;publish:boolean;sourceSignature?:string;revision?:WeekRevision}, now=new Date().toISOString(), today=reviewToday()):T {
  let next={...state,financeReviews:records};
  const record=request.record ? parseFinanceReview(request.record) : undefined;
  if(request.revision) {
    const {original,spending}=request.revision;
    const prior=state.financeReviews?.find(row=>row.id===original.id);
    if(!request.publish || !prior || !record || record.type!=="week" || record.id!==prior.id || record.end!==prior.end || record.end>today)
      throw new Error("只能修订已保存周复盘的原时间段。");
    if(JSON.stringify(prior)!==JSON.stringify(original)) throw new Error("这期报告在修订期间有更新，请重新打开该期后核对。");
    if(JSON.stringify(record.amounts)!==JSON.stringify(prior.amounts) || JSON.stringify(record.notes)!==JSON.stringify(prior.notes) || record.income!==prior.income) {
      if(!sameWeeklySpending(spending,reviewModuleSignature(state,"spending"),record.start,record.end)) throw new Error("本周支出账本有变化，请核对后再提交修订。");
      const entries=state.datedEntries ?? [];
      // Older reports may contain hand-entered income; an expense correction doesn't rebook that income.
      const income=record.income!==prior.income ? record.income : entries.filter(row=>row.flow==="income" && row.date>=record.start && row.date<=record.end).reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;
      next.monthlyRecords=syncWeeklyReview(state.monthlyRecords,entries,{...record,income});
      if(record.amounts.parents!==prior.amounts.parents) next.goals=addParentSupport(state.goals,record.id,record.amounts.parents);
    }
    // Projects have one payment date across the ledger. Apply only edited fields, never an old list.
    for(const item of record.focus?.projects ?? []) {
      const old=prior.focus?.projects.find(p=>p.id===item.id);
      if(!old) continue;
      const changes=Object.entries(item).filter(([key,v])=>v!==old[key as keyof typeof old]);
      if(!changes.length) continue;
      const live=next.fundBuckets.find(p=>p.id===item.id);
      if(!live || changes.some(([key,v])=>live[key as keyof typeof live]!==old[key as keyof typeof old] && live[key as keyof typeof live]!==v))
        throw new Error(`“${item.name}”的付款资料后来已更改，请先在大花费项目核对，未覆盖新资料。`);
      next.fundBuckets=next.fundBuckets.map(p=>p.id===item.id?{...p,...Object.fromEntries(changes)}:p);
    }
    // Carry a corrected reminder forward only while its current registration still matches that week.
    next.reminders=state.reminders.map(live=>{
      const old=prior.focus?.bills.find(row=>row.id===live.id), edited=record.focus?.bills.find(row=>row.id===live.id);
      if(!old || !edited || live.date!==old.date || live.amount!==old.amount) return live;
      return {...live,date:edited.date,amount:edited.amount};
    });
    next.financeReviews=state.financeReviews!.map(row=>row.id===record.id?record:row);
  } else if(request.publish) {
    if(!record || record.type!=="week") throw new Error("只有周复盘可以更新当前看板。");
    const cutoff=[state.dashboardAsOf ?? "",...(state.financeReviews ?? []).filter(row=>row.type==="week").map(row=>row.end),...(state.reviewUpdates ?? []).filter(row=>row.published).map(row=>row.asOf)].sort().at(-1)!;
    if(record.end<cutoff || record.end>today) throw new Error("较早或未来一期不能覆盖当前看板，请选择仅保存历史报告。");
    if(request.sourceSignature!==dashboardSourceSignature(state)) throw new Error("当前模块在复盘期间已变化，请重新带入当前模块并核对后保存。");
    if(!record.accounts || !record.investments || !record.focus || !record.goals) throw new Error("请补齐账户、逐账户投资、关键事项和目标余额明细。");
    const focus=record.focus;
    if(Object.values(focus.checks).some(value=>!value)) throw new Error("请核对大花费项目、账单订阅及资产负债。");
    sameIds(state.accounts,record.accounts,"现金账户");sameIds(state.holdings,record.investments.holdings,"投资账户");
    sameIds(state.balanceAssets,focus.assets,"补录资产");sameIds(state.liabilities,focus.debts,"负债");
    sameIds(state.reminders,focus.bills,"账单");sameIds(state.fundBuckets,focus.projects,"大花费项目");sameIds(state.goals,record.goals,"目标");
    if(total(focus.assets)!==record.balances.otherAssets || total(focus.debts)!==record.balances.debt || focus.holdings!==reviewInvestmentTotal(record.investments)) throw new Error("资产负债合计与明细不一致，请重新核对。");
    next={...next,
      monthlyRecords:syncWeeklyReview(state.monthlyRecords,state.datedEntries ?? [],record),selectedMonth:record.end.slice(0,7),
      accounts:state.accounts.map(row=>{
        const update=record.accounts!.find(item=>item.id===row.id)!;
        return {...row,balance:update.balance,includedInPersonal:update.included};
      }),
      holdings:merge(state.holdings,record.investments.holdings),fxUsd:record.investments.fxUsd,fxHkd:record.investments.fxHkd,
      balanceAssets:merge(state.balanceAssets,focus.assets),liabilities:merge(state.liabilities,focus.debts),
      reminders:merge(state.reminders,focus.bills),fundBuckets:merge(state.fundBuckets,focus.projects),goals:merge(state.goals,record.goals),
      dashboardAsOf:record.end,
    };
    next.goals=addParentSupport(mergeManualGoals(state.goals,record.goals,next.accounts),record.id,record.amounts.parents);
    record.goals=next.goals.map(({id,name,current})=>({id,name,current}));
    next.financeReviews=records.map(row=>row.id===record.id ? record : row);
  }
  const snapshot=(value:DashboardState)=>{
    const copy={...value} as Record<string,unknown>;
    delete copy.reviewUpdates;
    return structuredClone(copy);
  };
  const update:ReviewUpdate={id:`${now}:${(state.reviewUpdates ?? []).length}`,reviewId:record?.id ?? "import",asOf:record?.end ?? today,savedAt:now,published:request.publish,...(request.revision?{revisedWeek:true}:{}),before:snapshot(state),after:snapshot(next)};
  return {...next,reviewUpdates:[...(state.reviewUpdates ?? []),update]} as T;
}
