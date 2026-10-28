"use client";

import {useEffect, useRef, useState} from "react";
import type {AnnualBudgetPlan, BudgetMonthMode} from "./annual-budget-model";
import {aggregateFinanceReviews, analyzeFinanceReview, balanceLabels, financeReviewReport, newReviewDraft, parseFinanceReview, parseFinanceReviews, reviewCategories, reviewMoney, reviewTypeNames, upsertFinanceReview, type FinanceReview, type ReviewDraft, type ReviewType} from "./finance-review-model";
import "./finance-review-panel.css";

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const numeric = (value: string) => value.trim() === "" ? null : Number(value);
const change = (value: number | null) => value === null ? "无基准" : `${value > 0 ? "+" : ""}${reviewMoney(value)}`;

export default function FinanceReviewPanel({records, plan, onChange}: {records: FinanceReview[]; plan: AnnualBudgetPlan; onChange: (records: FinanceReview[]) => void}) {
  const [draft, setDraft] = useState<ReviewDraft>(() => newReviewDraft());
  const [view, setView] = useState<"entry" | "report">(records.length ? "report" : "entry");
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? "");
  const [status, setStatus] = useState("");
  const [budgetMode, setBudgetMode] = useState<BudgetMonthMode>(plan.mode);
  const fileInput = useRef<HTMLInputElement>(null);
  const confirmDialog = useRef<HTMLDialogElement>(null);
  const [confirmation, setConfirmation] = useState<{message: string; action: () => void} | null>(null);
  const selected = records.find(record => record.id === selectedId) ?? records[0];
  const analysis = selected ? analyzeFinanceReview(selected, records) : null;
  const hasDraft = draft.income !== null || Object.values(draft.amounts).some(value => value !== null) || Object.values(draft.balances).some(value => value !== null) || Boolean(draft.summary) || Object.values(draft.notes).some(Boolean);

  useEffect(() => {
    if (confirmation) confirmDialog.current?.showModal();
    else confirmDialog.current?.close();
  }, [confirmation]);
  function runAction(action: () => void) {
    try {action();} catch (error) {setStatus(error instanceof Error ? error.message : "操作失败");}
  }
  function confirmOrRun(required: boolean, message: string, action: () => void) {
    if (required) setConfirmation({message, action});
    else runAction(action);
  }

  function resetDraft(type = draft.type, end = draft.end) {
    confirmOrRun(hasDraft, "切换会清空当前未保存的输入，是否继续？", () => {
      setDraft(newReviewDraft(type, end));
      setView("entry");
      setStatus("");
    });
  }
  function save() {
    try {
      const budget = draft.type === "month" ? draft.budget ?? {mode: budgetMode, amounts: Object.fromEntries(plan.rows.map(row => [row.id, row[budgetMode]]))} : undefined;
      const record = parseFinanceReview({...draft, budget, savedAt: new Date().toISOString()});
      confirmOrRun(records.some(item => item.id === record.id), "该周期已有记录，是否用本次数据更新？", () => {
        onChange(upsertFinanceReview(records, record));
        setSelectedId(record.id);
        setView("report");
        setDraft(newReviewDraft(draft.type, draft.end));
        setStatus("复盘已记录；跨电脑使用前请保存完整版本到云端。");
      });
    } catch (error) {setStatus(error instanceof Error ? error.message : "保存失败");}
  }
  async function importFile(file: File) {
    try {
      const imported = parseFinanceReviews(JSON.parse(await file.text()));
      const conflicts = imported.filter(record => records.some(item => item.id === record.id));
      confirmOrRun(conflicts.length > 0, `有 ${conflicts.length} 个相同周期，是否更新这些记录？`, () => {
        onChange(imported.reduce(upsertFinanceReview, records));
        setSelectedId(imported[0]?.id ?? selectedId);
        setView("report");
        setStatus(`已导入 ${imported.length} 条复盘；跨电脑使用前请保存完整版本到云端。`);
      });
    } catch (error) {setStatus(error instanceof Error ? error.message : "导入失败");}
    finally {if (fileInput.current) fileInput.current.value = "";}
  }
  function aggregate() {
    try {
      if (draft.type === "week") return;
      const aggregated = aggregateFinanceReviews(records, draft.type, draft.end);
      confirmOrRun(hasDraft, "汇总将替换当前输入，是否继续？", () => {
        setDraft(aggregated);
        setStatus("已汇总连续覆盖的记录，请核对后保存。");
      });
    } catch (error) {setStatus(error instanceof Error ? error.message : "汇总失败");}
  }

  return <div className="finance-review">
    <dialog ref={confirmDialog} className="review-confirm" aria-labelledby="review-confirm-title" onCancel={event => {event.preventDefault();setConfirmation(null);}}>
      <h3 id="review-confirm-title">确认更新</h3><p>{confirmation?.message}</p>
      <div className="data-actions"><button type="button" className="secondary-button" autoFocus onClick={() => setConfirmation(null)}>取消</button><button type="button" className="primary-button" onClick={() => {const action=confirmation?.action;setConfirmation(null);if (action) runAction(action);}}>确认</button></div>
    </dialog>
    <div className="review-toolbar">
      <div className="period-tabs" aria-label="复盘视图">
        <button type="button" className={view === "entry" ? "active" : ""} aria-pressed={view === "entry"} onClick={() => setView("entry")}>更新数据</button>
        <button type="button" className={view === "report" ? "active" : ""} aria-pressed={view === "report"} onClick={() => setView("report")}>前后对比</button>
      </div>
      <div className="data-actions">
        <button className="secondary-button" type="button" onClick={() => download("finance-review-template.json", JSON.stringify(newReviewDraft(draft.type, draft.end), null, 2), "application/json")}>下载模板</button>
        <button className="secondary-button" type="button" onClick={() => fileInput.current?.click()}>导入复盘</button>
        <button className="secondary-button" type="button" disabled={!records.length} onClick={() => download("finance-reviews.json", JSON.stringify({app:"personal-finance-review", version:1, records}, null, 2), "application/json")}>导出记录</button>
        <input className="visually-hidden" ref={fileInput} type="file" accept=".json,application/json" aria-label="导入周期复盘文件" onChange={event => {const file = event.target.files?.[0]; if (file) void importFile(file);}}/>
      </div>
    </div>
    {status && <p className="review-status" role="status">{status}</p>}
    {view === "entry" && <form onSubmit={event => {event.preventDefault(); save();}}>
      <div className="review-fields">
        <label className="field"><span>复盘周期</span><select value={draft.type} onChange={event => resetDraft(event.target.value as ReviewType)}>{Object.entries(reviewTypeNames).map(([type,name]) => <option key={type} value={type}>{name}</option>)}</select></label>
        <label className="field"><span>数据截至</span><input type="date" required value={draft.end} onInput={event => {if (event.currentTarget.validity.valid && event.currentTarget.value && event.currentTarget.value !== draft.end) resetDraft(draft.type, event.currentTarget.value);}}/></label>
        <label className="field"><span>本期外部收入</span><input aria-label="本期外部收入" type="number" step="0.01" required value={draft.income ?? ""} onChange={event => setDraft({...draft, income:numeric(event.target.value)})}/></label>
      </div>
      <p className="review-caption">{draft.start} 至 {draft.end} · 人民币 · 填该日期范围内的发生额，不填跨期累计数。没有发生填 0，空白保留为待补。</p>
      {draft.type === "month" && <label className="field"><span>月预算口径</span><select value={draft.budget?.mode ?? budgetMode} onChange={event => {setBudgetMode(event.target.value as BudgetMonthMode);setDraft({...draft,budget:undefined});}}><option value="normal">普通月</option><option value="trip">出差月</option></select></label>}
      <div className="table-wrap"><table className="review-table">
        <thead><tr><th>项目</th><th>本期金额</th><th>发生事项／变化原因（可选）</th></tr></thead>
        <tbody>{reviewCategories.map(row => <tr key={row.id}><th scope="row">{row.name}<small>{row.id === "investment" ? "净划入，取回填负数" : row.id === "emergency" ? "净转入，取用填负数" : "实际净支出，扣除退款"}</small></th>
          <td><input type="number" step="0.01" required aria-label={`${row.name}本期金额`} value={draft.amounts[row.id] ?? ""} onChange={event => setDraft({...draft, amounts:{...draft.amounts,[row.id]:numeric(event.target.value)}})}/></td>
          <td><input type="text" aria-label={`${row.name}本期事项`} value={draft.notes[row.id] ?? ""} onChange={event => setDraft({...draft, notes:{...draft.notes,[row.id]:event.target.value}})}/></td></tr>)}</tbody>
      </table></div>
      <p className="review-caption">投资、应急划拨不计消费。微信充值、自有账户互转、学习／旅游／伴侣基金预留不记支出；实际付款只记一次。小额支付含早餐、地铁、小零食，其余归日常使用。</p>
      <h3>期末个人资产与负债</h3>
      <div className="review-fields balances">{Object.entries(balanceLabels).map(([key,label]) => <label className="field" key={key}><span>{label}</span><input type="number" min="0" step="0.01" required aria-label={label} value={draft.balances[key as keyof typeof draft.balances] ?? ""} onChange={event => setDraft({...draft,balances:{...draft.balances,[key]:numeric(event.target.value)}})}/></label>)}</div>
      <p className="review-caption">现金及存款含微信、应急与本人持有的专项现金；证券账户总资产含其中现金和持仓，两边不重复。已交给家人的钱不计个人资产。</p>
      <label className="field"><span>本期补充事项（可选）</span><textarea rows={2} value={draft.summary} onChange={event => setDraft({...draft,summary:event.target.value})}/></label>
      <div className="review-toolbar">
        <button className="primary-button" type="submit">保存并分析</button>
        {draft.type !== "week" && <button className="secondary-button" type="button" onClick={aggregate}>从已有记录汇总</button>}
      </div>
    </form>}
    {view === "report" && (!selected || !analysis ? <p>尚无复盘记录。</p> : <section aria-label="周期对比报告">
      <div className="review-toolbar">
        <label className="field"><span>报告期间</span><select aria-label="报告期间" value={selected.id} onChange={event => setSelectedId(event.target.value)}>{records.map(record => <option key={record.id} value={record.id}>{reviewTypeNames[record.type]} · {record.start} 至 {record.end}</option>)}</select></label>
        <div className="data-actions"><button className="secondary-button" type="button" onClick={() => confirmOrRun(hasDraft, "修订会替换当前未保存的输入，是否继续？", () => {setDraft({...selected});setView("entry");setStatus("");})}>修订本期</button>
          <button className="secondary-button" type="button" onClick={() => download(`finance-${selected.type}-${selected.start}.md`,financeReviewReport(selected,records),"text/markdown;charset=utf-8")}>下载报告</button></div>
      </div>
      <p className="review-caption">{analysis.previous ? `对比上期：${analysis.previous.start} 至 ${analysis.previous.end}` : "首次基准，暂无上期对比"}</p>
      <div className="review-metrics">
        <div><span>本期收入</span><strong>{reviewMoney(analysis.totals.income)}</strong></div>
        <div><span>本期实际消费</span><strong>{reviewMoney(analysis.totals.spending)}</strong></div>
        <div><span>本期收支结余</span><strong>{reviewMoney(analysis.totals.surplus)}</strong></div>
        <div><span>期末净资产</span><strong>{reviewMoney(analysis.totals.netWorth)}</strong><small>较上期余额 {change(analysis.netWorthDelta)}</small></div>
      </div>
      <div className="table-wrap"><table className="review-table"><thead><tr><th>项目</th><th>本期</th><th>上期</th><th>变化</th><th>本期事项</th></tr></thead>
        <tbody>{analysis.rows.map(row => <tr key={row.id}><th scope="row">{row.name}{row.flow === "transfer" && <small>划拨，不计消费</small>}</th><td>{reviewMoney(row.amount)}</td><td>{row.previous === null ? "无基准" : reviewMoney(row.previous)}</td><td>{change(row.delta)}</td><td>{row.note || "未填写"}</td></tr>)}</tbody>
      </table></div>
      {selected.budget && <details className="review-method" open><summary>月预算核对 · {selected.budget.mode === "normal" ? "普通月" : "出差月"}</summary>
        <div className="table-wrap"><table className="review-table"><thead><tr><th>项目</th><th>整月预算</th><th>本期金额</th><th>预算减本期</th></tr></thead><tbody>{analysis.budgetRows.map(row => <tr key={row.id}><th>{row.name}</th><td>{reviewMoney(row.budget)}</td><td>{reviewMoney(row.amount)}</td><td>{reviewMoney(row.remaining)}</td></tr>)}</tbody></table></div>
      </details>}
      {selected.summary && <p className="review-caption">本期补充：{selected.summary}</p>}
      <h3>下期动作</h3><ul>{analysis.actions.map(action => <li key={action}>{action}</li>)}</ul>
      <details className="review-method"><summary>余额变化与数据口径</summary>
        <div className="table-wrap"><table className="review-table"><thead><tr><th>期末余额</th><th>本期</th><th>上期</th></tr></thead><tbody>{Object.entries(balanceLabels).map(([key,label]) => <tr key={key}><th>{label}</th><td>{reviewMoney(selected.balances[key as keyof typeof selected.balances])}</td><td>{analysis.previous ? reviewMoney(analysis.previous.balances[key as keyof typeof selected.balances]) : "无基准"}</td></tr>)}</tbody></table></div>
        <p>日均消费：本期 {reviewMoney(analysis.totals.spending / analysis.totals.days)}{analysis.prior ? `；上期 ${reviewMoney(analysis.prior.spending / analysis.prior.days)}` : ""}</p>
        <ul>{analysis.notices.map(note => <li key={note}>{note}</li>)}</ul>
      </details>
    </section>)}
  </div>;
}
