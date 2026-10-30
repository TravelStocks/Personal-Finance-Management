import {analyzeFinanceReview, dailyFlexibleCashChange, latestWeeklyReview, overviewWeeklyTrend, reviewMoney, type DailyCashAccount, type FinanceReview} from "./finance-review-model";

export default function ReviewOverview({records, accounts, onOpen}: {records: FinanceReview[]; accounts?:DailyCashAccount[]; onOpen: () => void}) {
  const latest = latestWeeklyReview(records);
  const analysis = latest ? analyzeFinanceReview(latest, records) : null;
  const trend = overviewWeeklyTrend(records);
  const cash = dailyFlexibleCashChange(accounts ?? latest?.accounts ?? [],analysis?.previous?.accounts);
  const delta = (value: number | null) => value === null ? "首次基准" : `较上期 ${value > 0 ? "+" : ""}${reviewMoney(value)}`;
  const cards = analysis && latest ? [
    {title:"本周收入", value:analysis.totals.income, detail:delta(analysis.prior ? analysis.totals.income-analysis.prior.income : null), tone:"blue"},
    {title:"本周实际消费", value:analysis.totals.spending, detail:delta(analysis.prior ? analysis.totals.spending-analysis.prior.spending : null), tone:"green"},
    {title:"本周收支结余", value:analysis.totals.surplus, detail:"收入减消费；投资、应急划拨不计消费", tone:analysis.totals.surplus < 0 ? "red" : "green"},
    {title:"日常灵活资金", value:cash.total, detail:cash.total===null ? "请在账户用途中标记日常使用或小额支付" : `当前账户余额 · ${cash.rows.map(row=>`${row.name} ${reviewMoney(row.balance)}`).join(" + ")}；${cash.delta===null ? "暂无同口径上期基准" : delta(cash.delta)}`, tone:"violet"},
  ] : [];
  return <section aria-label="最近周复盘" className="review-overview">
    <div className="section-title compact"><div><h3>最近周复盘</h3>
      <p>{latest ? `${latest.start} 至 ${latest.end} · ${analysis!.totals.days} 天 · 已保存快照` : "尚未保存周复盘"}</p>
      {analysis?.prior && <p>上期：{analysis.previous!.start} 至 {analysis.previous!.end} · {analysis.prior.days} 天{analysis.prior.days !== analysis.totals.days ? " · 天数不同，金额不直接代表增减趋势" : ""}</p>}
    </div><button type="button" onClick={onOpen}>查看周复盘</button></div>
    {trend.month && <div className="review-month-income" aria-label="本月收入"><div><span>本月收入 · 已记录</span><strong>{reviewMoney(trend.month.income)}</strong></div><div><span>{trend.month.start} 至 {trend.month.limit} · 截至 {trend.month.end}</span><small>10号账期 · 已保存周复盘汇总 · 已覆盖 {trend.month.coveredDays}/{trend.month.days} 天</small>{trend.month.coveredDays<trend.month.days&&<small>尚有未覆盖日期，当前金额不是完整月收入。</small>}{trend.month.boundaryMissing&&<small>跨账期周缺少收入日期，该周收入暂未计入本月。</small>}</div></div>}
    <div className="overview-grid">{cards.map(card => <article key={card.title} className={`overview-card ${card.tone}`}><span>{card.title}</span><strong>{card.value===null ? "待关联账户" : reviewMoney(card.value)}</strong><small>{card.detail}</small></article>)}</div>
    {trend.rows.length>0&&<section aria-label="每周收支变化" className="review-week-trend"><h3>每周收支变化</h3><div className="review-week-table"><table><thead><tr><th>复盘日期</th><th>每周收入</th><th>每周实际消费</th><th>每周收支结余</th><th>比较口径</th></tr></thead><tbody>{[...trend.rows].reverse().map(row=><tr key={row.record.id}><th scope="row">{row.record.start} 至 {row.record.end}<small>{row.days} 天</small></th>{(["income","spending","surplus"] as const).map(key=><td key={key}><strong>{reviewMoney(row[key])}</strong><small>{row.changes ? delta(row.changes[key]).replace("较上期","较上周") : "—"}</small></td>)}<td>{row.comparison}</td></tr>)}</tbody></table></div><p>仅统计已保存周复盘；同周修订替换旧值，不重复累计。消费不含投资和应急划拨。</p></section>}
  </section>;
}
