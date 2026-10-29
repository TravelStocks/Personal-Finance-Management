import {compareReviewInvestments, reviewHoldingCny, reviewInvestmentTotal, reviewMoney, type FinanceReview, type ReviewInvestments} from "./finance-review-model";

export function ReviewInvestmentsEditor({value,onChange,confirmed,onConfirm,onOpen}:{value?:ReviewInvestments;onChange:(value:ReviewInvestments)=>void;confirmed:boolean;onConfirm:(value:boolean)=>void;onOpen:()=>void}) {
  const number=(raw:string)=>raw.trim()==="" ? NaN : Number(raw);
  return <section className="review-accounts" aria-label="逐账户投资核对">
    <div className="review-toolbar"><h3>投资账户 · 期末明细</h3><button type="button" className="secondary-button" onClick={onOpen}>前往投资管理</button></div>
    {!value ? <p>旧报告未保存投资明细，需重新带入当前模块后核对。</p> : <>
      <div className="review-fields">{(["fxUsd","fxHkd"] as const).map(key=><label className="field" key={key}><span>{key==="fxUsd"?"美元兑人民币":"港币兑人民币"}</span><input aria-label={`复盘${key==="fxUsd"?"美元":"港币"}汇率`} type="number" step="0.01" min="0.01" required value={Number.isFinite(value[key])?value[key]:""} onChange={event=>onChange({...value,[key]:number(event.target.value)})}/></label>)}</div>
      <div className="table-wrap"><table className="review-table"><thead><tr><th>账户 / 市场</th><th>币种</th><th>成本</th><th>期末金额</th><th>折人民币</th><th>变化说明</th></tr></thead><tbody>{value.holdings.map(row=><tr key={row.id}><th>{row.name}<small>{row.market}</small></th><td>{row.currency}</td>
        {(["cost","value"] as const).map(key=><td key={key}><input type="number" required min="0" step="0.01" aria-label={`${row.name}复盘${key==="cost"?"成本":"期末金额"}`} value={Number.isFinite(row[key])?row[key]:""} onChange={event=>onChange({...value,holdings:value.holdings.map(item=>item.id===row.id?{...item,[key]:number(event.target.value)}:item)})}/></td>)}
        <td>{Number.isFinite(reviewHoldingCny(row,value))?reviewMoney(reviewHoldingCny(row,value)):"待补"}</td><td><input aria-label={`${row.name}投资变化说明`} value={row.note ?? ""} onChange={event=>onChange({...value,holdings:value.holdings.map(item=>item.id===row.id?{...item,note:event.target.value}:item)})}/></td></tr>)}</tbody></table></div>
      <p>证券合计：{Number.isFinite(reviewInvestmentTotal(value))?reviewMoney(reviewInvestmentTotal(value)):"待补"} · 原币金额，证券现金如已含在账户总额中不再另计。</p>
      <label className="review-ledger-confirm"><input type="checkbox" checked={confirmed} onChange={event=>onConfirm(event.target.checked)}/>已核对所有投资账户及汇率</label>
    </>}
  </section>;
}

export function ReviewInvestmentComparison({current,previous}:{current:FinanceReview;previous?:FinanceReview}) {
  const rows=compareReviewInvestments(current,previous);
  if(!rows.length) return null;
  return <details className="review-method" open><summary>逐账户投资变化 · 人民币</summary><div className="table-wrap"><table className="review-table"><thead><tr><th>账户</th><th>本期</th><th>上期</th><th>余额变化</th><th>说明</th></tr></thead><tbody>{rows.map(row=><tr key={row.id}><th>{row.name}</th><td>{row.current===null?"未记录":reviewMoney(row.current)}</td><td>{row.previous===null?"无基准":reviewMoney(row.previous)}</td><td>{row.delta===null?"无基准":reviewMoney(row.delta)}</td><td>{row.note||"未填写"}</td></tr>)}</tbody></table></div><p className="review-caption">余额变化包含净投入及市值、汇率变化，不直接等于投资收益。</p></details>;
}
