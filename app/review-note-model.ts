import {reviewPeriod, type FinanceReview} from "./finance-review-model";

export type WeeklyNotes = Record<string, string>;

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
