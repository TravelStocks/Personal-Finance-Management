import type {FinanceReview} from "./finance-review-model";
import type {DatedEntry, LedgerMonth} from "./dated-ledger-model";
import type {SpendingGroup} from "./spending-detail-model";

const groups = {rent:"房租",parents:"家用",learning:"学习支出",travel:"旅游基金",partner:"伴侣基金",small:"小额支付",daily:"日常使用"};
const cents = (n:number)=>Math.round(n*100);
// Undated weekly amounts stay period summaries, never synthetic daily transactions.
export function syncWeeklyReview<T extends LedgerMonth>(months:T[],entries:DatedEntry[],review:FinanceReview):T[] {
  if(review.type!=="week") throw new Error("仅周复盘可回写账本，月度和季度报告不重复入账。");
  const selected = entries.filter(row=>row.date>=review.start&&row.date<=review.end);
  const income = selected.filter(row=>row.flow==="income").reduce((sum,row)=>sum+cents(row.amount),0);
  if(income!==cents(review.income)) throw new Error("收入合计与到账明细不一致，请先在复盘中补齐工资和其他收入的日期。");
  const amounts = Object.fromEntries(Object.keys(groups).map(group=>[group,0])) as Record<SpendingGroup,number>;
  for(const entry of selected.filter(row=>row.flow==="expense")) {
    const budget=months.find(month=>month.id===entry.date.slice(0,7))?.budgets.find(row=>row.id===entry.categoryId);
    if(!budget?.group || !(budget.group in groups)) throw new Error("本周日期支出有待归类项目，请先确认所属大类。");
    amounts[budget.group as SpendingGroup]+=cents(entry.amount);
  }
  const residual = Object.entries(groups).map(([group,name])=>({group:group as SpendingGroup,name,amount:(cents(review.amounts[group as SpendingGroup])-amounts[group as SpendingGroup])/100}));
  if(review.start.slice(0,7)!==review.end.slice(0,7)&&residual.some(row=>row.amount!==0)) throw new Error("本周跨自然月，未标日期的支出不能自动分摊。请先补齐日期明细，再同步保存。");
  if(!months.some(month=>month.id===review.end.slice(0,7))) throw new Error("请先在账本中添加复盘所属月份。");
  const overlapping=months.flatMap(month=>month.budgets).some(row=>row.reviewPeriod&&row.reviewPeriod.id!==review.id&&row.reviewPeriod.start<=review.end&&row.reviewPeriod.end>=review.start);
  if(overlapping) throw new Error("已有重叠期间的复盘汇总，请先核对，避免重复计账。");
  return months.map(month=>({...month,budgets:[...month.budgets.filter(row=>row.reviewPeriod?.id!==review.id),
    ...(month.id===review.end.slice(0,7) ? residual.filter(row=>row.amount!==0).map(row=>({
      id:`review-${review.id}-${row.group}`,name:`${row.name} · 周复盘汇总`,group:row.group,plan:0,actual:row.amount,required:false,fixed:false,
      note:review.notes[row.group] || "与本周已标日期支出核对后的差额",reviewPeriod:{id:review.id,start:review.start,end:review.end}
    })) : [])]}));
}
