import type {FinanceReview} from "./finance-review-model";
import {reviewMoney, reviewTotals} from "./finance-review-model";

export default function WeeklyLedgerView({records,flow}:{records:FinanceReview[];flow:"income"|"expense"}) {
  const weeks=records.filter(row=>row.type==="week").sort((a,b)=>a.start.localeCompare(b.start));
  return <details className="review-method" open><summary>{flow==="income" ? "每周收入变化" : "每周支出变化"} · 已保存复盘</summary>
    {!weeks.length ? <p className="review-caption">尚未保存周复盘。</p> : <div className="table-wrap"><table className="review-table"><thead><tr><th>期间</th><th>{flow==="income" ? "收入" : "实际消费"}</th><th>较上期</th><th>收支结余</th><th>口径</th></tr></thead><tbody>{weeks.map((row,index)=>{
      const totals=reviewTotals(row), previous=weeks[index-1], prior=previous ? reviewTotals(previous) : null;
      const value=flow==="income" ? totals.income : totals.spending;
      const delta=prior ? value-(flow==="income" ? prior.income : prior.spending) : null;
      return <tr key={row.id}><th>{row.start} 至 {row.end}</th><td>{reviewMoney(value)}</td><td>{delta===null ? "首次基准" : reviewMoney(delta)}</td><td>{reviewMoney(totals.surplus)}</td><td>{totals.days} 天{prior&&prior.days!==totals.days ? ` / 上期 ${prior.days} 天` : ""}<small>保存时的实际发生额，不与账本再相加</small></td></tr>;
    })}</tbody></table></div>}
  </details>;
}
