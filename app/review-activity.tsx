import {useState} from "react";
import {reviewMoney, type FinanceReview} from "./finance-review-model";
import {reviewActivityItems, reviewActivityPeriods} from "./review-activity-model";
import type {ReviewUpdate} from "./review-dashboard-sync";

export default function ReviewActivity({records, updates}: {records: FinanceReview[]; updates: ReviewUpdate[]}) {
  const [selected, setSelected] = useState("");
  const periods = reviewActivityPeriods(records, updates);
  const period = periods.find(row => row.start === selected) ?? periods[0];
  return <section className="review-activity" aria-label="周复盘项目记录">
    <div className="section-title compact"><h3>周复盘项目记录</h3>
      {period && <label>所属周 <select aria-label="项目记录所属周" value={period.start} onChange={event => setSelected(event.target.value)}>
        {periods.map(row => <option value={row.start} key={row.start}>{row.start} 至 {row.end}</option>)}
      </select></label>}
    </div>
    {!period ? <p>尚无已保存的周项目记录</p> : <>
      <p>{period.source} · 保存于 {new Intl.DateTimeFormat("zh-CN", {timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(period.savedAt))}</p>
      <div className="review-week-table"><table><thead><tr><th>项目</th><th>本期金额</th><th>发生时间</th><th>事项 / 备注</th></tr></thead>
        <tbody>{reviewActivityItems(period).map(row => <tr key={row.id}>
          <th scope="row">{row.name}<small>{row.flow === "transfer" ? "本期净划拨，非消费" : "本期净消费"}</small></th>
          <td><strong>{row.amount === null ? "待补录" : reviewMoney(row.amount)}</strong>{row.amount === 0 && <small>本期录入为 0</small>}</td>
          <td>{row.entries.length > 0 && <details><summary>{row.dates[0]}{row.dates.length > 1 ? ` 至 ${row.dates.at(-1)}` : ""} · {row.entries.length} 笔</summary>{row.entries.map(entry => <small key={entry.id}>
            <time dateTime={entry.date}>{entry.date}</time> · {reviewMoney(entry.amount)}{entry.note ? ` · ${entry.note}` : ""}
          </small>)}</details>}
            {row.undated !== null && row.undated !== 0 && <><span>{period.start} 至 {period.end}</span><small>{row.entries.length ? `${reviewMoney(row.undated)} 未标具体日期` : "仅确认所属周，未标具体日期"}</small></>}
            {!row.entries.length && (row.amount === 0 || row.amount === null) && <span>—</span>}
          </td>
          <td>{row.note || "—"}</td>
        </tr>)}</tbody></table></div>
    </>}
  </section>;
}
