export const confirmedMonthlySalary = 13000;
export const salaryEffectiveMonth = "2026-10";
export const salarySettingsVersion = 1;

export function applySalaryFromMonth<T extends {id: string; salary: number}>(records: T[], salary: number, fromMonth: string): T[] {
  return records.map(record => record.id >= fromMonth ? {...record, salary} : record);
}

export function migrateSalarySettings<T extends {id: string; salary: number}>(records: T[], savedSalary: number, version?: number) {
  if (version === salarySettingsVersion) return {salary: savedSalary, records};
  return {salary: confirmedMonthlySalary, records: applySalaryFromMonth(records, confirmedMonthlySalary, salaryEffectiveMonth)};
}
