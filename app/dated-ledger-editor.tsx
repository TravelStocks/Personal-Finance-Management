"use client";

import {useState} from "react";
import {undatedAmount, type DatedEntry, type EntryMode, type LedgerMonth} from "./dated-ledger-model";
import {getSpendingGroup, spendingGroups, type SpendingGroup} from "./spending-detail-model";
import {reviewMoney} from "./finance-review-model";
import {useFinanceToday} from "./use-finance-today";
import "./dated-ledger.css";

export default function DatedLedgerEditor({flow,month,entries,onSave,onDelete,embedded=false,range,onDirtyChange}: {
  flow:DatedEntry["flow"]; month:LedgerMonth; entries:DatedEntry[];
  onSave:(entry:DatedEntry,previousId:string|undefined,mode:EntryMode,group?:SpendingGroup)=>void;
  onDelete:(id:string)=>void;
  embedded?:boolean; range?:{start:string;end:string}; onDirtyChange?:(dirty:boolean)=>void;
}) {
  const today = useFinanceToday();
  const name = flow==="income" ? "收入" : "支出";
  const categories = flow==="income" ? [{id:"salary",name:"工资到账"},{id:"otherIncome",name:"其他到账"}] : month.budgets;
  function categoryGroup(id:string) {
    const budget = month.budgets.find(row=>row.id===id);
    return budget ? getSpendingGroup(budget) : "unassigned";
  }
  const [editing,setEditing] = useState<string>();
  const [date,setDate] = useState(range ? (range.end.startsWith(month.id) ? range.end : range.start.startsWith(month.id) ? range.start : `${month.id}-01`) : today.startsWith(month.id) ? today : "");
  const [categoryId,setCategory] = useState(categories[0]?.id ?? "");
  const [group,setGroup] = useState<SpendingGroup | "unassigned">(()=>categoryGroup(categories[0]?.id ?? ""));
  const [amount,setAmount] = useState("");
  const [note,setNote] = useState("");
  const [mode,setMode] = useState<EntryMode>(()=>categories[0]&&undatedAmount(month,entries,flow,categories[0].id)>0 ? "allocate" : "new");
  const [status,setStatus] = useState("");
  const [deleting,setDeleting] = useState<string>();
  const rows = entries.filter(row=>row.flow===flow&&row.date.startsWith(month.id+"-")&&(!range||(row.date>=range.start&&row.date<=range.end)));
  const currentCategory = categories.find(row=>row.id===categoryId);
  const remaining = currentCategory ? undatedAmount(month,entries,flow,categoryId) : 0;
  const end = new Date(Date.UTC(Number(month.id.slice(0,4)),Number(month.id.slice(5)),0)).toISOString().slice(0,10);
  const minimum = range && range.start>`${month.id}-01` ? range.start : `${month.id}-01`;
  const maximum = [end,today,...(range ? [range.end] : [])].sort()[0];
  const Container = embedded ? "div" : "form";
  function reset() {setEditing(undefined);setAmount("");setNote("");onDirtyChange?.(false);}
  function save() {
    try {
      if (!date || date.slice(0,7)!==month.id || date>today) throw new Error("实际收支日期须在所选月份内且不晚于今天");
      if (range && (date<range.start || date>range.end)) throw new Error("到账日期须在本次复盘范围内");
      if (amount.trim()==="" || !Number.isFinite(Number(amount)) || !Number.isInteger(Number((Number(amount)*100).toFixed(6)))) throw new Error("请填写最多两位小数的有效金额");
      if (!currentCategory) throw new Error("请选择分类");
      if (flow==="expense"&&group==="unassigned") throw new Error("请选择分类归属，便于复盘汇总");
      onSave({id:editing ?? crypto.randomUUID(),date,flow,categoryId,amount:Number(amount),note},editing,mode,flow==="expense" ? group as SpendingGroup : undefined);
      setStatus(editing ? "明细已保存，月度实际已同步。" : mode==="allocate" ? "日期已补录，月度实际总额未增加。" : "明细已保存，月度实际已增加。记得保存到云端以供其他电脑读取。");
      reset();
    } catch (error) {setStatus(error instanceof Error ? error.message : "保存失败");}
  }
  return <section className="dated-ledger" aria-label={`${name}日期明细`}>
    <div className="review-toolbar"><h3>{name}日期明细</h3><span>{month.id} · {rows.length} 笔</span></div>
    <Container onSubmit={embedded ? undefined : event=>{event.preventDefault();save();}} onKeyDown={embedded ? event=>{if(event.key==="Enter"&&(event.target as HTMLElement).tagName==="INPUT"){event.preventDefault();save();}} : undefined}>
      <div className="dated-entry-fields">
        <label className="field"><span>日期</span><input type="date" required={!embedded} aria-label={`${name}日期`} min={minimum} max={maximum} value={date} onInput={event=>setDate(event.currentTarget.value)}/></label>
        <label className="field"><span>分类</span><select aria-label={`${name}分类`} value={categoryId} onChange={event=>{setCategory(event.target.value);setGroup(categoryGroup(event.target.value));setMode(undatedAmount(month,entries,flow,event.target.value)>0 ? "allocate" : "new");}}>{categories.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>
        {flow==="expense"&&<label className="field"><span>分类归属</span><select aria-label="日期支出分类归属" value={group} onChange={event=>setGroup(event.target.value as SpendingGroup)}><option value="unassigned">待确认</option>{spendingGroups.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>}
        <label className="field"><span>金额（退款为负）</span><input type="number" step="0.01" required={!embedded} aria-label={`${name}明细金额`} value={amount} onChange={event=>{setAmount(event.target.value);onDirtyChange?.(Boolean(event.target.value||note||editing));}}/></label>
        <label className="field"><span>记账口径</span><select aria-label={`${name}记账口径`} value={editing ? "new" : mode} disabled={Boolean(editing)} onChange={event=>setMode(event.target.value as EntryMode)}>{editing ? <option value="new">修改已有实际</option> : <><option value="allocate">补录日期 · 总额不变</option><option value="new">新增实际 · 计入总额</option></>}</select></label>
        <label className="field dated-note"><span>事项 / 用途</span><input type="text" aria-label={`${name}明细事项`} value={note} onChange={event=>{setNote(event.target.value);onDirtyChange?.(Boolean(event.target.value||amount||editing));}}/></label>
      </div>
      <div className="review-toolbar"><span className="review-caption">本月该分类未标日期：{reviewMoney(remaining)}{flow==="income" ? " · 未确认到账的工资规划不进入复盘" : " · 不含自有账户互转、预留及还款本金"}</span><div className="data-actions"><button className="primary-button" type={embedded ? "button" : "submit"} onClick={embedded ? save : undefined}>{editing ? "保存修改" : embedded ? "保存收入" : "保存明细"}</button>{(editing||(embedded&&(amount||note)))&&<button type="button" className="secondary-button" onClick={reset}>取消修改</button>}</div></div>
    </Container>
    {status&&<p role="status" className="review-status">{status}</p>}
    <details open={rows.length>0}><summary>已登记明细 · {rows.length} 笔</summary>
      {rows.length>0 ? <div className="table-wrap"><table className="review-table"><thead><tr><th>日期</th><th>分类</th><th>金额</th><th>事项 / 用途</th><th>操作</th></tr></thead><tbody>{rows.map(row=><tr key={row.id}>
        <td>{row.date}</td><td>{categories.find(category=>category.id===row.categoryId)?.name ?? "分类缺失"}</td><td>{reviewMoney(row.amount)}</td><td>{row.note||"未填写"}</td>
        <td><div className="data-actions">{deleting===row.id ? <><span>同时扣减月度实际？</span><button type="button" className="danger-button" onClick={()=>{try{onDelete(row.id);setDeleting(undefined);if(editing===row.id)reset();setStatus("已删除，月度实际已同步扣减。");}catch(error){setStatus(String(error));}}}>确认删除</button><button type="button" className="secondary-button" onClick={()=>setDeleting(undefined)}>取消</button></> : <><button type="button" className="secondary-button" onClick={()=>{setEditing(row.id);setDate(row.date);setCategory(row.categoryId);setAmount(String(row.amount));setNote(row.note);setGroup(categoryGroup(row.categoryId));setStatus("");onDirtyChange?.(true);}}>修改</button><button type="button" className="danger-button" onClick={()=>setDeleting(row.id)}>删除</button></>}</div></td>
      </tr>)}</tbody></table></div> : <p className="review-caption">暂无带日期的{name}。原月度金额保留，尚未计入任何周复盘。</p>}
    </details>
  </section>;
}
