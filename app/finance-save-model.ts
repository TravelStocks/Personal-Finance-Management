type FinanceStorage = Pick<Storage, "getItem" | "setItem">;
type SaveMetadata = {updatedAt: string; cloudPending: boolean};
type SavedData = Record<string, unknown> & {_localSave?: SaveMetadata};
export const financeSaveConflict = "其他页面已更新数据，本页暂停保存；刷新前请先导出本页备份";

export function financeDataOnly(data: object): Record<string, unknown> {
  const result = {...data} as SavedData;
  delete result._localSave;
  return result;
}

export function hasPendingFinanceSave(data: object) {
  return (data as SavedData)._localSave?.cloudPending === true;
}

// Keep metadata in the same atomic storage write as the data it describes.
export function writeLocalFinanceData(storage: FinanceStorage, key: string, data: object, cloudClean = false, now = new Date().toISOString(), expectedData?: string) {
  const raw = storage.getItem(key);
  let previous: SavedData | null = null;
  try {previous = raw ? JSON.parse(raw) as SavedData : null;} catch { /* Explicit backup recovery may replace an unreadable record. */ }
  if (expectedData !== undefined && JSON.stringify(previous ? financeDataOnly(previous) : null) !== expectedData) {
    throw new Error(financeSaveConflict);
  }
  const clean = financeDataOnly(data);
  const changed = !previous || JSON.stringify(financeDataOnly(previous)) !== JSON.stringify(clean);
  const metadata: SaveMetadata = {
    updatedAt: changed ? now : previous?._localSave?.updatedAt ?? now,
    cloudPending: !cloudClean && (changed || Boolean(previous && hasPendingFinanceSave(previous))),
  };
  storage.setItem(key, JSON.stringify({...clean, _localSave: metadata}));
  return metadata;
}

export function markFinanceCloudSaved(storage: FinanceStorage, key: string, uploadedData: object) {
  const raw = storage.getItem(key);
  if (!raw) return false;
  const current = JSON.parse(raw) as SavedData;
  // A slow upload must not mark edits made during that request as synchronized.
  if (JSON.stringify(financeDataOnly(current)) !== JSON.stringify(financeDataOnly(uploadedData))) return false;
  writeLocalFinanceData(storage, key, current, true);
  return true;
}

export function financeBackupSignature(backup: {data: object; snapshots: unknown[]; monthlyArchives: unknown[]}) {
  return JSON.stringify({data: financeDataOnly(backup.data), snapshots: backup.snapshots, monthlyArchives: backup.monthlyArchives});
}
