import {reviewPeriod, type FinanceReview} from "./finance-review-model";

export type WeeklyNotes = Record<string, string>;

export function weeklyNoteHistory(records: FinanceReview[], pending: WeeklyNotes) {
  const weeks = new Map<string, {start:string; note:string; reportEnd?:string}>();
  for (const [start, note] of Object.entries(pending)) {
    if (note.trim()) weeks.set(start, {start, note});
  }
  // A full report supersedes a standalone note, even if the text was subsequently cleared.
  for (const record of records) {
    if (record.type === "week") weeks.set(record.start, {start:record.start, note:record.overallChange ?? "", reportEnd:record.end});
  }
  return [...weeks.values()].sort((a,b)=>b.start.localeCompare(a.start)).map(row=>({...row, end:reviewPeriod("week",row.start).limit}));
}

export function parseWeeklyNotes(value: unknown): WeeklyNotes {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("周说明格式无效");
  const notes: WeeklyNotes = {};
  for (const [week, text] of Object.entries(value)) {
    if (reviewPeriod("week", week).start !== week || typeof text !== "string") throw new Error("周说明日期或内容无效");
    notes[week] = text;
  }
  return notes;
}

export function saveWeeklyNote(records: FinanceReview[], pending: WeeklyNotes, start: string, text: string) {
  if (reviewPeriod("week", start).start !== start) throw new Error("请选择有效的复盘周");
  const id = `week:${start}`;
  const weeklyNotes = {...pending};
  const existing = records.some(row => row.id === id);
  if (existing || !text.trim()) delete weeklyNotes[start];
  else weeklyNotes[start] = text;
  const financeReviews = existing ? records.map(row => row.id === id ? {...row, overallChange:text.trim() ? text : undefined} : row) : records;
  return {weeklyNotes, financeReviews};
}
