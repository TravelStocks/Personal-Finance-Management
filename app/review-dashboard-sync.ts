import {newReviewDraft, parseFinanceReview, reviewInvestmentTotal, reviewToday, type FinanceReview, type ReviewHolding} from "./finance-review-model";
import {mergeReviewModule, normalizeReviewModule, reviewModuleLabels, type ReviewModule, type ReviewModulePatch} from "./review-module-sync";
import {syncWeeklyReview} from "./review-ledger-sync";
import type {DatedEntry, LedgerMonth} from "./dated-ledger-model";

export type ReviewUpdate = {id:string; reviewId:string; asOf:string; savedAt:string; published:boolean; module?:ReviewModule; moduleDraft?:ReviewModulePatch; before:Record<string,unknown>; after:Record<string,unknown>};
export type DashboardState = {
  monthlyRecords:LedgerMonth[]; datedEntries?:DatedEntry[]; financeReviews?:FinanceReview[];
  accounts:Array<{id:string;name:string;type:string;purpose:string;balance:number;includedInPersonal?:boolean}>;
  holdings:ReviewHolding[]; fxUsd:number; fxHkd:number;
  balanceAssets:Array<{id:string;name:string;amount:number}>; liabilities:Array<{id:string;name:string;amount:number}>;
  reminders:Array<{id:string;name:string;amount:number;date:string;kind:string}>;
  fundBuckets:Array<{id:string;name:string;target:number;current:number;dueDate:string}>;
  goals:Array<{id:string;name:string;current:number}>;
  dashboardAsOf?:string; reviewUpdates?:ReviewUpdate[]; selectedMonth?:string;
};
const total=(rows:Array<{amount:number}>)=>rows.reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;
function sameIds(a:Array<{id:string}>, b:Array<{id:string}>, label:string) {
  if(a.length!==b.length || new Set(b.map(row=>row.id)).size!==b.length || a.some(row=>!b.some(other=>row.id===other.id))) throw new Error(`${label}清单已变化，请重新带入当前模块并核对，不能遗漏或猜测账户。`);
}
function merge<T extends {id:string}, U extends {id:string}>(current:T[], updates:U[]) {
  return current.map(row=>({...row,...updates.find(update=>update.id===row.id)}));
}
export function dashboardSourceSignature(state:DashboardState) {
  return JSON.stringify([state.accounts,state.holdings,state.fxUsd,state.fxHkd,state.balanceAssets,state.liabilities,state.reminders,state.fundBuckets,state.goals]);
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
export function commitReviewUpdate<T extends DashboardState>(state:T, records:FinanceReview[], request:{record?:FinanceReview;publish:boolean;sourceSignature?:string}, now=new Date().toISOString(), today=reviewToday()):T {
  let next={...state,financeReviews:records};
  const record=request.record ? parseFinanceReview(request.record) : undefined;
  if(request.publish) {
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
  }
  const snapshot=(value:DashboardState)=>{
    const copy={...value} as Record<string,unknown>;
    delete copy.reviewUpdates;
    return structuredClone(copy);
  };
  const update:ReviewUpdate={id:`${now}:${(state.reviewUpdates ?? []).length}`,reviewId:record?.id ?? "import",asOf:record?.end ?? today,savedAt:now,published:request.publish,before:snapshot(state),after:snapshot(next)};
  return {...next,reviewUpdates:[...(state.reviewUpdates ?? []),update]} as T;
}
