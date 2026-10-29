import type {SpendingBudget, SpendingGroup} from "./spending-detail-model";
import type {ReviewDraft, ReviewLedgerRow} from "./finance-review-model";

export type DatedEntry = {id:string; date:string; flow:"income" | "expense"; categoryId:string; amount:number; note:string};
export type LedgerMonth = {id:string; salary:number; otherIncome:number; budgets:SpendingBudget[]};
export type EntryMode = "allocate" | "new";
const groups = ["rent", "parents", "learning", "travel", "partner", "small", "daily"] as const;
const cents = (n:number) => Math.round(n * 100);
const sum = (values:number[]) => values.reduce((total,n)=>total+cents(n),0)/100;

export function parseDatedEntries(value:unknown): DatedEntry[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error("日期收支明细须为列表");
  const ids = new Set<string>();
  return value.map(raw => {
    const row = raw as Partial<DatedEntry> | null;
    if (!row || typeof row.id !== "string" || !row.id || ids.has(row.id)) throw new Error("日期收支编号重复或缺失");
    ids.add(row.id);
    if (typeof row.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.date) || !Number.isFinite(Date.parse(`${row.date}T00:00:00Z`)) || new Date(`${row.date}T00:00:00Z`).toISOString().slice(0,10) !== row.date) throw new Error("请填写有效的收支日期");
    if (!["income","expense"].includes(String(row.flow)) || typeof row.categoryId !== "string" || !row.categoryId) throw new Error("收支类型或分类缺失");
    if (row.flow === "income" && !["salary","otherIncome"].includes(row.categoryId)) throw new Error("收入仅记录工资或其他实际到账，不含股票浮盈");
    if (typeof row.amount !== "number" || !Number.isFinite(row.amount) || Math.abs(row.amount) > 1e12 || cents(row.amount) === 0) throw new Error("金额须为有效非零数，退款填负数");
    return {id:row.id,date:row.date,flow:row.flow!,categoryId:row.categoryId,amount:cents(row.amount)/100,note:typeof row.note === "string" ? row.note : ""};
  });
}
function categoryTotal(month:LedgerMonth, flow:DatedEntry["flow"], categoryId:string) {
  if (flow === "income") return categoryId === "salary" ? month.salary : month.otherIncome;
  const budget = month.budgets.find(row=>row.id===categoryId);
  if (!budget) throw new Error("支出分类已不存在，请重新选择");
  return budget.actual;
}
export function undatedAmount(month:LedgerMonth, entries:DatedEntry[], flow:DatedEntry["flow"], categoryId:string) {
  return sum([categoryTotal(month,flow,categoryId), ...entries.filter(row=>row.date.startsWith(month.id+"-") && row.flow===flow && row.categoryId===categoryId).map(row=>-row.amount)]);
}

// Monthly totals remain canonical. Dated entries describe a portion of those totals, never an extra layer of spending.
export function changeDatedEntry<T extends LedgerMonth>(months:T[], entries:DatedEntry[], entry:DatedEntry | null, previousId?:string, mode:EntryMode="new", group?:SpendingGroup) {
  const next = entry ? parseDatedEntries([entry])[0] : null;
  const previous = previousId ? entries.find(row=>row.id===previousId) : undefined;
  if (previousId && !previous) throw new Error("原明细已不存在，请刷新后重试");
  if (next && entries.some(row=>row.id===next.id && row.id!==previousId)) throw new Error("收支编号已存在");
  if (!next && !previous) throw new Error("请选择收支明细");
  for (const row of [next,previous]) {
    if (!row) continue;
    const month = months.find(month=>month.id===row.date.slice(0,7));
    if (!month) throw new Error("请先添加该日期所属的月份");
    categoryTotal(month,row.flow,row.categoryId);
  }
  if (next && !previous && mode === "allocate") {
    const month = months.find(month=>month.id===next.date.slice(0,7))!;
    const remaining = undatedAmount(month,entries,next.flow,next.categoryId);
    if (Math.sign(remaining)!==Math.sign(next.amount) || Math.abs(cents(next.amount))>Math.abs(cents(remaining))) throw new Error("补录金额超出该分类未标日期金额；新发生的收支请选择新增实际");
  }
  const changes = [...(previous ? [{...previous,amount:-previous.amount}] : []), ...(next && (previous || mode === "new") ? [next] : [])];
  const records = months.map(month=> {
    const deltas = changes.filter(row=>row.date.slice(0,7)===month.id);
    return {...month,
      salary:sum([month.salary,...deltas.filter(row=>row.flow==="income"&&row.categoryId==="salary").map(row=>row.amount)]),
      otherIncome:sum([month.otherIncome,...deltas.filter(row=>row.flow==="income"&&row.categoryId==="otherIncome").map(row=>row.amount)]),
      budgets:month.budgets.map(budget=>({...budget,
        actual:sum([budget.actual,...deltas.filter(row=>row.flow==="expense"&&row.categoryId===budget.id).map(row=>row.amount)]),
        ...(next?.flow==="expense" && next.date.slice(0,7)===month.id && next.categoryId===budget.id && group ? {group} : {})}))};
  });
  return {records,entries:[...entries.filter(row=>row.id!==previousId),...(next ? [next] : [])].sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id))};
}
export function preserveDatedSalaries<T extends LedgerMonth>(updated:T[], original:T[], entries:DatedEntry[]) {
  const protectedMonths = new Set(entries.filter(row=>row.flow==="income"&&row.categoryId==="salary").map(row=>row.date.slice(0,7)));
  return updated.map(row=>protectedMonths.has(row.id) ? {...row,salary:original.find(old=>old.id===row.id)?.salary ?? row.salary} : row);
}
export function datedReviewSource(months:LedgerMonth[], entries:DatedEntry[], start:string, end:string) {
  const rows:ReviewLedgerRow[] = entries.filter(row=>row.date>=start&&row.date<=end).map(row=> {
    const month = months.find(month=>month.id===row.date.slice(0,7));
    const budget = month?.budgets.find(budget=>budget.id===row.categoryId);
    const group = budget?.group;
    return {...row,name:row.flow==="income" ? row.categoryId==="salary" ? "工资到账" : "其他到账" : budget?.name ?? "分类缺失",
      group:row.flow==="income" ? "income" : groups.includes(group as SpendingGroup) ? group as SpendingGroup : "unassigned"};
  });
  const undated = months.filter(month=>month.id>=start.slice(0,7)&&month.id<=end.slice(0,7)).flatMap(month=> {
    const categories = [{flow:"income" as const,id:"salary",name:"工资"},{flow:"income" as const,id:"otherIncome",name:"其他收入"},...month.budgets.map(row=>({flow:"expense" as const,id:row.id,name:row.name}))];
    return categories.map(category=>({month:month.id,name:category.name,amount:undatedAmount(month,entries,category.flow,category.id)})).filter(row=>row.amount!==0);
  });
  return {rows,undated,unassigned:rows.filter(row=>row.group==="unassigned"),
    income:sum(rows.filter(row=>row.group==="income").map(row=>row.amount)),
    spending:sum(rows.filter(row=>row.flow==="expense").map(row=>row.amount))};
}
export function linkDatedReview(draft:ReviewDraft, rows:ReviewLedgerRow[]):ReviewDraft {
  if (rows.some(row=>row.group==="unassigned")) throw new Error("请先在支出模块确认明细的分类归属");
  const amounts = {...draft.amounts};
  for (const group of groups) amounts[group] = sum(rows.filter(row=>row.group===group).map(row=>row.amount));
  return {...draft,income:sum(rows.filter(row=>row.group==="income").map(row=>row.amount)),amounts,ledger:rows.map(row=>({...row}))};
}
