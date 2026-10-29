"use client";

import {useEffect, useRef, useState} from "react";
import type {AnnualBudgetPlan, BudgetMonthMode} from "./annual-budget-model";
import ReviewFocusChecklist from "./finance-review-focus";
import {newReviewFocus, syncReviewFocus, reviewFocusMatchesSource, type ReviewFocusSource} from "./finance-review-model";
import {useFinanceToday} from "./use-finance-today";
import {datedReviewSource, linkDatedReview, type DatedEntry, type LedgerMonth} from "./dated-ledger-model";
import {aggregateFinanceReviews, analyzeFinanceReview, balanceLabels, financeReviewReport, newReviewDraft, parseFinanceReview, parseFinanceReviews, reviewAccountCash, reviewCategories, reviewMoney, reviewToday, reviewTypeNames, upsertFinanceReview, withReviewAccounts, type FinanceReview, type ReviewAccount, type ReviewAccountDraft, type ReviewDraft, type ReviewType} from "./finance-review-model";
import "./finance-review-panel.css";
import "./dated-ledger.css";

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

type AccountSource = Pick<ReviewAccount, "id" | "name" | "type" | "purpose" | "balance">;
export default function FinanceReviewPanel({records, plan, accounts, focusSource, ledgerMonths, datedEntries, onOpenModule, onChange}: {records: FinanceReview[]; plan: AnnualBudgetPlan; accounts: AccountSource[]; focusSource: ReviewFocusSource; ledgerMonths:LedgerMonth[]; datedEntries:DatedEntry[]; onOpenModule:(module:"fundBuckets" | "reminders" | "balance" | "income" | "spending")=>void; onChange: (records: FinanceReview[], accounts?: ReviewAccount[]) => void}) {
  const today = useFinanceToday();
  function makeDraft(type?: ReviewType, end = reviewToday()) {
    const previous = records.filter(record => record.accounts && record.end <= end).sort((a,b) => b.end.localeCompare(a.end))[0];
    const blank = {...newReviewDraft(type, end), focus:newReviewFocus(focusSource)};
    return accounts.length ? withReviewAccounts(blank, accounts, previous?.accounts) : blank;
  }
  const [draft, setDraft] = useState<ReviewDraft>(() => makeDraft());
  const [liveFocus, setLiveFocus] = useState(true);
  const [ledgerLinked,setLedgerLinked] = useState(false);
  const [ledgerConfirmed,setLedgerConfirmed] = useState(false);
  const [ledgerSeen,setLedgerSeen] = useState("");
  const [accountsConfirmed, setAccountsConfirmed] = useState(false);
  const [syncAccounts, setSyncAccounts] = useState(true);
  const [view, setView] = useState<"entry" | "report">(records.length ? "report" : "entry");
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? "");
  const [status, setStatus] = useState("");
  const [budgetMode, setBudgetMode] = useState<BudgetMonthMode>(plan.mode);
  const fileInput = useRef<HTMLInputElement>(null);
  const confirmDialog = useRef<HTMLDialogElement>(null);
  const [confirmation, setConfirmation] = useState<{message: string; action: () => void} | null>(null);
  const selected = records.find(record => record.id === selectedId) ?? records[0];
  const analysis = selected ? analyzeFinanceReview(selected, records) : null;
  const canSyncAccounts = draft.end === today;
  const followsSource = liveFocus && canSyncAccounts;
  const ledgerSource = datedReviewSource(ledgerMonths,datedEntries,draft.start,draft.end);
  const ledgerSignature = JSON.stringify(ledgerSource);
  const boundLedger = Boolean(draft.ledger) || ledgerLinked;
  if (ledgerLinked && ledgerSignature!==ledgerSeen) {
    setLedgerSeen(ledgerSignature);
    setLedgerConfirmed(false);
    if (!ledgerSource.unassigned.length) setDraft(current=>linkDatedReview(current,ledgerSource.rows));
  }
  // Only an unsaved current-date intake follows live modules; saved revisions and rollups stay snapshots.
  if (followsSource && (!draft.focus || !reviewFocusMatchesSource(draft.focus, focusSource))) {
    setDraft(current=>({...current, focus: syncReviewFocus(current.focus, focusSource)}));
  }
  const hasDraft = draft.income !== null || Object.values(draft.amounts).some(value => value !== null) || Object.values(draft.balances).some(value => value !== null) || Boolean(draft.summary) || Object.values(draft.notes).some(Boolean) || Object.values(draft.focus?.checks ?? {}).some(Boolean) || Object.values(draft.focus?.notes ?? {}).some(Boolean);

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
      setDraft(makeDraft(type, end));
      setLedgerLinked(false);
      setLedgerConfirmed(false);
      setLiveFocus(end === today);
      setAccountsConfirmed(false);
      setView("entry");
      setStatus("");
    });
  }
  function save() {
    try {
      if (ledgerLinked && (ledgerSource.unassigned.length || !ledgerConfirmed)) throw new Error("请先确认日期收支分类完整，并核对本期全部收支。");
      if (draft.accounts && !accountsConfirmed) throw new Error("请先核对本期期末账户余额并勾选确认。");
      const budget = draft.type === "month" ? draft.budget ?? {mode: budgetMode, amounts: Object.fromEntries(plan.rows.map(row => [row.id, row[budgetMode]]))} : undefined;
      const record = parseFinanceReview({...draft, budget, savedAt: new Date().toISOString()});
      confirmOrRun(records.some(item => item.id === record.id), "该周期已有记录，是否用本次数据更新？", () => {
        onChange(upsertFinanceReview(records, record), canSyncAccounts && syncAccounts ? record.accounts : undefined);
        setSelectedId(record.id);
        setView("report");
        setDraft(makeDraft(draft.type, draft.end));
        setLedgerLinked(false);
        setLedgerConfirmed(false);
        setLiveFocus(draft.end === today);
        setAccountsConfirmed(false);
        setStatus(`复盘已记录${canSyncAccounts && syncAccounts && record.accounts ? "，余额已同步到账户管理" : "，当前账户余额未改动"}；跨电脑使用前请保存完整版本到云端。`);
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
        setLedgerLinked(false);
        setLedgerConfirmed(false);
        setLiveFocus(false);
        setAccountsConfirmed(false);
        setStatus("已汇总连续覆盖的记录，请核对后保存。");
      });
    } catch (error) {setStatus(error instanceof Error ? error.message : "汇总失败");}
  }
  function updateReviewAccount(id: string, patch: Partial<ReviewAccountDraft>) {
    const next = (draft.accounts ?? []).map(row => row.id === id ? {...row, ...patch} : row);
    setDraft({...draft, accounts: next, balances: {...draft.balances, cash: reviewAccountCash(next)}});
    setAccountsConfirmed(false);
  }
  function loadAccounts() {
    confirmOrRun(Boolean(draft.accounts), "重新带入会替换复盘中的账户余额与说明，是否继续？", () => {
      setDraft(withReviewAccounts(draft, accounts, draft.accounts ?? makeDraft(draft.type, draft.end).accounts));
      setAccountsConfirmed(false);
    });
  }
  function downloadTemplate() {
    const template = makeDraft(draft.type, draft.end);
    template.accounts = template.accounts?.map(row => ({...row, balance: null}));
    template.balances.cash = null;
    download("finance-review-template.json", JSON.stringify(template, null, 2), "application/json");
  }
  function refreshFocus() {
    confirmOrRun(!followsSource || Object.values(draft.focus?.checks ?? {}).some(Boolean), "刷新会带入当前模块数据并重新核对，变化说明保留。历史复盘请确认这些数据属于该截至日。", () => {
      const focus = newReviewFocus(focusSource);
      focus.notes = {...draft.focus?.notes};
      setDraft({...draft,focus});
    });
  }
  function useFocusBalances() {
    if (!draft.focus) return;
    const focus = draft.focus;
    confirmOrRun(draft.balances.otherAssets !== null || draft.balances.debt !== null, "将以快照中的补录资产、负债合计替换这两项本期余额，现金和证券账户总资产不变。", () => {
      const total = (rows:Array<{amount:number}>) => rows.reduce((sum,row)=>sum+Math.round(row.amount*100),0)/100;
      setDraft({...draft,balances:{...draft.balances,otherAssets:total(focus.assets),debt:total(focus.debts)}});
    });
  }

  function bindLedger() {
    confirmOrRun(draft.income!==null || reviewCategories.some(row=>row.flow==="expense"&&draft.amounts[row.id]!==null), "将替换本期收入和消费金额，投资与应急划拨、事项说明保持不变。是否继续？", ()=>{
      setDraft(linkDatedReview(draft,ledgerSource.rows));
      setLedgerLinked(true);
      setLedgerSeen(ledgerSignature);
      setLedgerConfirmed(false);
      setStatus("已按日期带入收支，请核对本期完整性后保存。");
    });
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
        <button className="secondary-button" type="button" onClick={downloadTemplate}>下载模板</button>
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
        <label className="field"><span>本期外部收入</span><input aria-label="本期外部收入" type="number" step="0.01" required readOnly={boundLedger} value={draft.income ?? ""} onChange={event => setDraft({...draft, income:numeric(event.target.value)})}/></label>
      </div>
      <p className="review-caption">{draft.start} 至 {draft.end} · 人民币 · 填该日期范围内的发生额，不填跨期累计数。没有发生填 0，空白保留为待补。</p>
      <section className="review-ledger" aria-label="本期日期收支">
        <div className="review-toolbar"><h3>本期日期收支</h3><div className="data-actions"><button type="button" className="secondary-button" onClick={()=>onOpenModule("income")}>前往收入</button><button type="button" className="secondary-button" onClick={()=>onOpenModule("spending")}>前往支出</button></div></div>
        <p>账本已标日期 {ledgerSource.rows.length} 笔 · 收入 {reviewMoney(ledgerSource.income)} · 净支出 {reviewMoney(ledgerSource.spending)}</p>
        {ledgerSource.unassigned.length>0&&<p role="alert" className="review-status">{ledgerSource.unassigned.length} 笔支出分类归属待确认，暂不能带入。</p>}
        {ledgerSource.undated.length>0&&<details><summary>相关月份还有 {ledgerSource.undated.length} 项未标日期金额（不计入本期）</summary><ul>{ledgerSource.undated.map((row,index)=><li key={index}>{row.month} · {row.name}：{reviewMoney(row.amount)}</li>)}</ul><p className="review-caption">负数表示已标日期净额高于月度净额，需核对退款或月度金额；未确认到账的工资规划也不计入本期。</p></details>}
        <LedgerRows rows={ledgerSource.rows}/>
        <div className="review-toolbar"><span className="review-caption">{ledgerLinked ? "已联动当前账本" : draft.ledger ? `已保存快照 · ${draft.ledger.length} 笔，尚未替换为当前账本` : "本期金额尚未与日期明细联动"}</span><div className="data-actions"><button type="button" className="secondary-button" disabled={ledgerLinked||ledgerSource.unassigned.length>0} onClick={bindLedger}>带入并联动本期收支</button>{boundLedger&&<button type="button" className="secondary-button" onClick={()=>{setLedgerLinked(false);setLedgerConfirmed(false);setDraft({...draft,ledger:undefined});}}>改为手填</button>}</div></div>
        {ledgerLinked&&<label className="review-ledger-confirm"><input type="checkbox" required checked={ledgerConfirmed} onChange={event=>setLedgerConfirmed(event.target.checked)}/>已核对本期全部收支，含未发生的分类；剩余未标日期金额不属于本期</label>}
      </section>
      {draft.type === "month" && <label className="field"><span>月预算口径</span><select value={draft.budget?.mode ?? budgetMode} onChange={event => {setBudgetMode(event.target.value as BudgetMonthMode);setDraft({...draft,budget:undefined});}}><option value="normal">普通月</option><option value="trip">出差月</option></select></label>}
      <div className="table-wrap"><table className="review-table">
        <thead><tr><th>项目</th><th>本期金额</th><th>发生事项／变化原因（可选）</th></tr></thead>
        <tbody>{reviewCategories.map(row => <tr key={row.id}><th scope="row">{row.name}<small>{row.id === "investment" ? "净划入，取回填负数" : row.id === "emergency" ? "净转入，取用填负数" : "实际净支出，扣除退款"}</small></th>
          <td><input type="number" step="0.01" required readOnly={boundLedger&&row.flow==="expense"} aria-label={`${row.name}本期金额`} value={draft.amounts[row.id] ?? ""} onChange={event => setDraft({...draft, amounts:{...draft.amounts,[row.id]:numeric(event.target.value)}})}/></td>
          <td><input type="text" aria-label={`${row.name}本期事项`} placeholder={row.id === "learning" ? "课程、书籍、工具名称及用途" : undefined} value={draft.notes[row.id] ?? ""} onChange={event => setDraft({...draft, notes:{...draft.notes,[row.id]:event.target.value}})}/></td></tr>)}</tbody>
      </table></div>
      <p className="review-caption">应急&学习金在预算中合并，在复盘中分开：应急填净转入，学习填实际支出与用途。微信充值、自有账户互转、基金预留不记消费；实际付款只记一次。</p>
      <ReviewFocusChecklist focus={draft.focus} live={followsSource} onChange={focus=>setDraft({...draft,focus})} onRefresh={refreshFocus} onOpen={onOpenModule} onUseBalances={useFocusBalances}/>
      <section aria-labelledby="review-accounts-title" className="review-accounts">
        <div className="review-toolbar"><h3 id="review-accounts-title">本期账户余额</h3><button className="secondary-button" type="button" disabled={!accounts.length} onClick={loadAccounts}>带入账户管理余额</button></div>
        {draft.accounts ? <>
          <p className="review-caption">截至 {draft.end} · 带入值仅供核对，并非本期已确认余额。证券账户、他人资金或已另计的余额请取消计入现金。</p>
          <div className="table-wrap"><table className="review-table review-account-table"><thead><tr><th>账户 / 用途</th><th>本期期末余额</th><th>计入个人现金</th><th>本期变动说明</th></tr></thead>
            <tbody>{draft.accounts.map(row => <tr key={row.id}><th scope="row">{row.name}<small>{row.type} · {row.purpose}</small></th>
              <td><input type="number" min="0" step="0.01" required aria-label={`${row.name}复盘期末余额`} value={row.balance ?? ""} onChange={event => updateReviewAccount(row.id, {balance:numeric(event.target.value)})}/></td>
              <td><input type="checkbox" aria-label={`${row.name}计入个人现金`} checked={row.included} onChange={event => updateReviewAccount(row.id,{included:event.target.checked})}/></td>
              <td><input type="text" aria-label={`${row.name}本期变动说明`} value={row.note} onChange={event => updateReviewAccount(row.id,{note:event.target.value})}/></td></tr>)}</tbody>
            <tfoot><tr><th>个人现金合计</th><td colSpan={3}>{draft.balances.cash === null ? "待补余额" : reviewMoney(draft.balances.cash)}</td></tr></tfoot>
          </table></div>
          <div className="review-account-options">
            <label><input type="checkbox" required checked={accountsConfirmed} onChange={event => setAccountsConfirmed(event.target.checked)}/>已核对本期期末账户余额</label>
            <label><input type="checkbox" checked={canSyncAccounts && syncAccounts} disabled={!canSyncAccounts} onChange={event => setSyncAccounts(event.target.checked)}/>保存时同步余额到账户管理（仅当天）</label>
          </div>
          {!canSyncAccounts && <p className="review-caption">历史日期仅保存复盘快照，不覆盖当前账户管理余额。</p>}
        </> : <p className="review-caption">本期尚无账户明细，可带入核对；不带入时保留手填现金合计。</p>}
      </section>
      <h3>期末个人资产与负债</h3>
      <div className="review-fields balances">{Object.entries(balanceLabels).map(([key,label]) => <label className="field" key={key}><span>{label}{key === "cash" && draft.accounts ? " · 账户合计" : ""}</span><input type="number" min="0" step="0.01" required readOnly={key === "cash" && Boolean(draft.accounts)} aria-label={label} value={draft.balances[key as keyof typeof draft.balances] ?? ""} onChange={event => setDraft({...draft,balances:{...draft.balances,[key]:numeric(event.target.value)}})}/></label>)}</div>
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
        <div className="data-actions"><button className="secondary-button" type="button" onClick={() => confirmOrRun(hasDraft, "修订会替换当前未保存的输入，是否继续？", () => {setDraft({...selected});setLiveFocus(false);setLedgerLinked(false);setLedgerConfirmed(false);setAccountsConfirmed(false);setView("entry");setStatus("");})}>修订本期</button>
          <button className="secondary-button" type="button" onClick={() => download(`finance-${selected.type}-${selected.start}.md`,financeReviewReport(selected,records),"text/markdown;charset=utf-8")}>下载报告</button></div>
      </div>
      <p className="review-caption">{analysis.previous ? `对比上期：${analysis.previous.start} 至 ${analysis.previous.end}` : "首次基准，暂无上期对比"}</p>
      {selected.ledger&&<><p className="review-caption">收支来源：保存时的日期明细快照 · {selected.ledger.length} 笔</p><LedgerRows rows={selected.ledger}/></>}
      <div className="review-metrics">
        <div><span>本期收入</span><strong>{reviewMoney(analysis.totals.income)}</strong></div>
        <div><span>本期实际消费</span><strong>{reviewMoney(analysis.totals.spending)}</strong></div>
        <div><span>本期收支结余</span><strong>{reviewMoney(analysis.totals.surplus)}</strong></div>
        <div><span>期末净资产</span><strong>{reviewMoney(analysis.totals.netWorth)}</strong><small>较上期余额 {change(analysis.netWorthDelta)}</small></div>
      </div>
      <section className="review-highlights" aria-label="本期关键变化"><h3>本期关键变化</h3>
        {analysis.highlights.map(row=><details key={row.id} className="review-highlight"><summary><span className="review-highlight-title">{row.title}<small>{row.state}</small></span><span>{row.summary}</span></summary>
          {row.details.length ? <ul>{row.details.map((detail,index)=><li key={index}>{detail}</li>)}</ul> : <p className="review-caption">暂无额外明细。</p>}
        </details>)}
      </section>
      <h3>下期动作</h3><ul>{analysis.actions.map(action => <li key={action}>{action}</li>)}</ul>
      <details className="review-method"><summary>收支分类明细</summary>
      <div className="table-wrap"><table className="review-table"><thead><tr><th>项目</th><th>本期</th><th>上期</th><th>变化</th><th>本期事项</th></tr></thead>
        <tbody>{analysis.rows.map(row => <tr key={row.id}><th scope="row">{row.name}{row.flow === "transfer" && <small>划拨，不计消费</small>}</th><td>{reviewMoney(row.amount)}</td><td>{row.previous === null ? "无基准" : reviewMoney(row.previous)}</td><td>{change(row.delta)}</td><td>{row.note || "未填写"}</td></tr>)}</tbody>
      </table></div></details>
      {analysis.accountRows.length > 0 && <details className="review-method" aria-label="账户余额对比"><summary>账户余额对比</summary>
        <div className="table-wrap"><table className="review-table"><thead><tr><th>账户</th><th>本期期末</th><th>上期期末</th><th>变化</th><th>计入现金</th><th>本期说明</th></tr></thead>
          <tbody>{analysis.accountRows.map(row => <tr key={row.id}><th scope="row">{row.name}<small>{row.purpose}</small></th><td>{row.current === null ? "未记录" : reviewMoney(row.current)}</td><td>{row.previous === null ? "无基准" : reviewMoney(row.previous)}</td><td>{change(row.delta)}</td><td>{row.included === null ? "未记录" : row.included ? "是" : "否"}</td><td>{row.note || "未填写"}<small>{row.status}</small></td></tr>)}</tbody>
        </table></div></details>}
      {selected.budget && <details className="review-method" open><summary>月预算核对 · {selected.budget.mode === "normal" ? "普通月" : "出差月"}</summary>
        <div className="table-wrap"><table className="review-table"><thead><tr><th>项目</th><th>整月预算</th><th>本期金额</th><th>预算减本期</th></tr></thead><tbody>{analysis.budgetRows.map(row => <tr key={row.id}><th>{row.name}</th><td>{reviewMoney(row.budget)}</td><td>{reviewMoney(row.amount)}</td><td>{reviewMoney(row.remaining)}</td></tr>)}</tbody></table></div>
      </details>}
      {selected.summary && <p className="review-caption">本期补充：{selected.summary}</p>}
      <details className="review-method"><summary>余额变化与数据口径</summary>
        <div className="table-wrap"><table className="review-table"><thead><tr><th>期末余额</th><th>本期</th><th>上期</th></tr></thead><tbody>{Object.entries(balanceLabels).map(([key,label]) => <tr key={key}><th>{label}</th><td>{reviewMoney(selected.balances[key as keyof typeof selected.balances])}</td><td>{analysis.previous ? reviewMoney(analysis.previous.balances[key as keyof typeof selected.balances]) : "无基准"}</td></tr>)}</tbody></table></div>
        <p>日均消费：本期 {reviewMoney(analysis.totals.spending / analysis.totals.days)}{analysis.prior ? `；上期 ${reviewMoney(analysis.prior.spending / analysis.prior.days)}` : ""}</p>
        <ul>{analysis.notices.map(note => <li key={note}>{note}</li>)}</ul>
      </details>
    </section>)}
  </div>;
}

function LedgerRows({rows}:{rows:NonNullable<FinanceReview["ledger"]>}) {
  return <details className="review-method"><summary>日期收支明细 · {rows.length} 笔</summary><div className="table-wrap"><table className="review-table"><thead><tr><th>日期</th><th>收支 / 分类</th><th>金额</th><th>事项 / 用途</th></tr></thead><tbody>{rows.map(row=><tr key={row.id}><td>{row.date}</td><td>{row.flow==="income" ? "收入" : "支出"} · {row.name}</td><td>{reviewMoney(row.amount)}</td><td>{row.note||"未填写"}</td></tr>)}</tbody></table></div></details>;
}
