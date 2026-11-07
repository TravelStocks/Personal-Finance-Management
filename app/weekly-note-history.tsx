import type {FinanceReview} from "./finance-review-model";
import {weeklyNoteHistory, type WeeklyNotes} from "./review-note-model";

export default function WeeklyNoteHistory({records, notes}: {records: FinanceReview[]; notes: WeeklyNotes}) {
  const weeks = weeklyNoteHistory(records, notes);
  const renderWeek = (week: typeof weeks[number]) => <li key={week.start}>
    <div><strong><time dateTime={week.start}>{week.start}</time> 至 <time dateTime={week.end}>{week.end}</time></strong>
      <small>{week.reportEnd ? `周报截至 ${week.reportEnd}` : "单独保存的说明"}</small></div>
    <p>{week.note.trim() ? week.note : "本周未填写说明"}</p>
  </li>;
  if (!weeks.length) return <p>暂无周记录。</p>;
  return <div className="weekly-note-history">
    <ol aria-label="最近两周记录">{weeks.slice(0,2).map(renderWeek)}</ol>
    {weeks.length > 2 && <details><summary>更早记录（{weeks.length - 2} 周）</summary>
      <ol aria-label="更早的周记录">{weeks.slice(2).map(renderWeek)}</ol></details>}
  </div>;
}
