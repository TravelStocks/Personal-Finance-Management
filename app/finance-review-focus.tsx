import {reviewFocusLabels, reviewMoney, type ReviewFocus, type ReviewFocusKey} from "./finance-review-model";

export default function ReviewFocusChecklist({focus, onChange, onRefresh, onOpen, onUseBalances}: {
  focus?: ReviewFocus;
  onChange: (focus: ReviewFocus) => void;
  onRefresh: () => void;
  onOpen: (module: "fundBuckets" | "reminders" | "balance") => void;
  onUseBalances: () => void;
}) {
  const total = (rows: Array<{amount:number}>) => rows.reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;
  const summaries = focus ? {
    projects: `${focus.projects.length} 项 · 缺口 ${reviewMoney(focus.projects.reduce((sum,row)=>sum+Math.max(0,Math.round((row.target-row.current)*100)),0)/100)}`,
    bills: `${focus.bills.length} 项登记 · 包含已登记的订阅提醒`,
    balance: `补录资产 ${reviewMoney(total(focus.assets))} · 负债 ${reviewMoney(total(focus.debts))}`,
  } : null;
  const modules = {projects:"fundBuckets", bills:"reminders", balance:"balance"} as const;
  return <section className="review-focus-entry" aria-label="关键事项核对">
    <div className="review-toolbar"><h3>关键事项核对</h3><button type="button" className="secondary-button" onClick={onRefresh}>刷新关键事项</button></div>
    {!focus ? <p className="review-caption">本期尚无项目、账单及资产负债明细快照。</p> : <>
      <p className="review-caption">来源：已保存模块。核对的是截至复盘日的登记状态，未勾选的事项保留为待核对，不计入本期消费。</p>
      {(Object.keys(reviewFocusLabels) as ReviewFocusKey[]).map(key => <div className="review-focus-check" key={key}>
        <details><summary><strong>{reviewFocusLabels[key]}</strong><span>{summaries![key]}</span></summary>
          <div className="table-wrap"><table className="review-table">
            {key === "projects" && <><thead><tr><th>项目</th><th>目标</th><th>已准备</th><th>截止日期</th></tr></thead><tbody>{focus.projects.map(row => <tr key={row.id}><th>{row.name}</th><td>{reviewMoney(row.target)}</td><td>{reviewMoney(row.current)}</td><td>{row.dueDate || "未填"}</td></tr>)}</tbody></>}
            {key === "bills" && <><thead><tr><th>账单 / 订阅</th><th>登记金额</th><th>提醒日期</th><th>类型</th></tr></thead><tbody>{focus.bills.map(row => <tr key={row.id}><th>{row.name}</th><td>{reviewMoney(row.amount)}</td><td>{row.date || "未填"}</td><td>{row.kind}</td></tr>)}</tbody></>}
            {key === "balance" && <><thead><tr><th>明细</th><th>金额</th><th>口径</th></tr></thead><tbody>
              {focus.assets.map(row=><tr key={`asset:${row.id}`}><th>{row.name}</th><td>{reviewMoney(row.amount)}</td><td>补录资产</td></tr>)}
              {focus.debts.map(row=><tr key={`debt:${row.id}`}><th>{row.name}</th><td>{reviewMoney(row.amount)}</td><td>负债余额</td></tr>)}
              <tr><th>投资持仓</th><td>{reviewMoney(focus.holdings)}</td><td>参考市值，不含未登记的证券现金</td></tr>
            </tbody></>}
          </table></div>
          <div className="data-actions"><button type="button" className="secondary-button" onClick={()=>onOpen(modules[key])}>前往{reviewFocusLabels[key]}</button>
            {key === "balance" && <button type="button" className="secondary-button" onClick={onUseBalances}>带入补录资产与负债合计</button>}
          </div>
          <label className="field"><span>{reviewFocusLabels[key]}变化说明（可选）</span><input type="text" value={focus.notes[key] ?? ""} onChange={event=>onChange({...focus,notes:{...focus.notes,[key]:event.target.value}})}/></label>
        </details>
        <label className="review-focus-confirm"><input type="checkbox" aria-label={`${reviewFocusLabels[key]}已核对`} checked={focus.checks[key]} onChange={event=>onChange({...focus,checks:{...focus.checks,[key]:event.target.checked}})}/>{focus.checks[key] ? "已核对" : "待核对"}</label>
      </div>)}
    </>}
  </section>;
}
