import {reviewFocusLabels, reviewMoney, type ReviewFocus, type ReviewFocusKey} from "./finance-review-model";

export default function ReviewFocusChecklist({focus, live, onChange, onRefresh, onOpen, onUseBalances}: {
  focus?: ReviewFocus;
  live: boolean;
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
  const edit = (key:ReviewFocusKey, field:"projects"|"bills"|"assets"|"debts", id:string, patch:object) => {
    if(focus) onChange({...focus,[field]:focus[field].map(row=>row.id===id?{...row,...patch}:row),checks:{...focus.checks,[key]:false}});
  };
  const numeric=(raw:string)=>raw.trim()===""?NaN:Number(raw);
  const amount=(key:ReviewFocusKey,field:"projects"|"bills"|"assets"|"debts",row:{id:string;name:string},name:string,value:number)=><input aria-label={`${row.name}复盘${name}`} type="number" min="0" step="0.01" required value={Number.isFinite(value)?value:""} onChange={event=>edit(key,field,row.id,{[name==="目标"?"target":name==="实际"?"current":"amount"]:numeric(event.target.value)})}/>;
  return <section className="review-focus-entry" aria-label="关键事项核对">
    <div className="review-toolbar"><h3>关键事项核对</h3><button type="button" className="secondary-button" onClick={onRefresh}>刷新关键事项</button></div>
    {!focus ? <p className="review-caption">本期尚无项目、账单及资产负债明细快照。</p> : <>
      <p className="review-caption">{live ? "当前模块实时联动；有变化的项目会重新标记为待核对，已填说明保留。" : "历史／修订快照，不自动替换为当前模块数据。"}登记金额不计入本期消费。</p>
      {(Object.keys(reviewFocusLabels) as ReviewFocusKey[]).map(key => <div className="review-focus-check" key={key}>
        <details><summary><strong>{reviewFocusLabels[key]}</strong><span>{summaries![key]}</span></summary>
          <div className="table-wrap"><table className="review-table">
            {key === "projects" && <><thead><tr><th>项目</th><th>目标</th><th>实际</th><th>截止日期</th></tr></thead><tbody>{focus.projects.map(row => <tr key={row.id}><th>{row.name}</th><td>{amount(key,"projects",row,"目标",row.target)}</td><td>{amount(key,"projects",row,"实际",row.current)}</td><td><input type="date" aria-label={`${row.name}复盘截止日期`} value={row.dueDate} onChange={event=>edit(key,"projects",row.id,{dueDate:event.target.value})}/></td></tr>)}</tbody></>}
            {key === "bills" && <><thead><tr><th>账单 / 订阅</th><th>登记金额</th><th>提醒日期</th><th>类型</th></tr></thead><tbody>{focus.bills.map(row => <tr key={row.id}><th>{row.name}</th><td>{amount(key,"bills",row,"金额",row.amount)}</td><td><input type="date" aria-label={`${row.name}复盘提醒日期`} value={row.date} onChange={event=>edit(key,"bills",row.id,{date:event.target.value})}/></td><td>{row.kind}</td></tr>)}</tbody></>}
            {key === "balance" && <><thead><tr><th>明细</th><th>金额</th><th>口径</th></tr></thead><tbody>
              {focus.assets.map(row=><tr key={`asset:${row.id}`}><th>{row.name}</th><td>{amount(key,"assets",row,"金额",row.amount)}</td><td>补录资产</td></tr>)}
              {focus.debts.map(row=><tr key={`debt:${row.id}`}><th>{row.name}</th><td>{amount(key,"debts",row,"金额",row.amount)}</td><td>负债余额</td></tr>)}
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
