---
name: personal-finance-review
description: Update the user's personal-finance weekly, monthly or quarterly review from a concise nine-category template, compare verified periods and balances, generate a report and prepare private website-import records. Use for 个人财务复盘, 每周财务更新, 月度财务复盘, 季度财务复盘 or requests to fill the finance review template. Not for individual-stock trading reviews.
---

# Personal Finance Review

Maintain the user's nine-category personal finance review for `TravelStocks/Personal-Finance-Management`. Keep data entry short and reports evidence-based. This skill is manually invoked; it does not schedule background work.

## Locate The Workspace

Find the existing repository by its Git remote, starting with the current project and `C:/Users/Administrator/Documents/New project/Personal-Finance-Management`. Do not clone a second copy unless no usable checkout exists. Read repository instructions. The deterministic engine is `app/finance-review-model.ts`; its CLI is `scripts/finance-review.cjs`. Run from the repository root with Node and the repository's installed TypeScript dependency.

Store actual inputs, histories and reports in `.private-finance/`, which must be Git-ignored. Never put actual records, account details, tokens, cloud passwords or private exports in `docs/`, skill assets, commits or public GitHub Pages. The website's default demo records are not evidence of current balances.

## Start A Review

1. Confirm the period and cutoff date if unclear. Weeks begin Monday; months and quarters begin on their first calendar date. Use Asia/Shanghai dates. Partial periods are allowed and must be labelled as such.
2. Read `.private-finance/history.json` if it exists. Prefer the user's latest exported website review records if newer; reconcile same-period conflicts before replacement. The website and local history are not automatically the same store.
3. Generate a blank intake:

```powershell
node scripts/finance-review.cjs template --type week --end YYYY-MM-DD
```

For a monthly review use `--type month --mode normal` or `--mode trip`; for a quarterly review use `--type quarter`. Existing intake files are never overwritten. Return the concise human template in `assets/review-template.md`, with the calculated dates and previous verified baseline. Do not prefill last period's values as this period's actuals.
4. Ask only for missing necessary numbers or material ambiguities. Zero means confirmed none; blank means unknown. Do not finish a report by assuming unknown balances or expenses are zero.

## Nine Categories And Accounting

Use only: 房租、家用、投资基金、应急基金、学习基金、旅游基金、伴侣基金、小额支付、日常使用.

- Income means external income for the stated period, not transfers between personal accounts or withdrawals from a brokerage. Do not count unrealized or already-included investment gains as cash income.
- Investment and emergency amounts are net transfers; withdrawals are negative. They are not consumption. The other seven categories are actual payments net of refunds, not budget reservations or wallet top-ups.
- 小额支付 includes breakfast, subway and small snacks. The confirmed budget is normal month 1,000, trip month 0. A dedicated wallet can be reconciled from opening balance + net top-ups - closing balance, excluding other transfers and purchases already counted elsewhere. Ask about mixed use before using this shortcut.
- 日常使用 includes lunch/dinner and all remaining living expenses. Latest confirmed normal-month cap is 1,000, reduced from 4,250 to balance a 13,000 salary; trip-month cap remains 1,700. This is a tight target, not proof of actual spending.
- Family money already given away is no longer a personal asset. Own learning/travel/partner cash reserves remain assets until actually paid; avoid counting both reservations and spending.
- Ending cash includes personal deposits, payment wallets and earmarked cash. Securities total includes brokerage cash and holdings, counted once. Use consistent cutoff-date CNY exchange rates for non-CNY assets.
- Loan principal repayments reduce cash and debt, not consumption; interest and fees are expenses. Never infer that a liability is repaid without evidence.

Use the current confirmed annual plan, not outdated chat numbers. The shipped nine-category plan is normal 13,000, trip 12,700, annual 155,100 under nine normal/three trip months. Salary and travel assumptions are editable and not promises. If the webpage plan has been customized, use its verified values for the monthly `budget` snapshot rather than the CLI template's repository defaults.

## Save And Analyze

Convert the user's verified input into the generated JSON contract without inventing values. Preserve the original input privately. Run:

```powershell
node scripts/finance-review.cjs save --input .private-finance/intake.json
```

The CLI validates the entire payload first, uses the shared website engine, maintains `history.json`, produces `report-TYPE-START.md` and `website-import.json`, and backs up prior history. If the same period exists, explain the corrections and use `--replace` only for the user's intentional revision. Never silently duplicate a week or overwrite later data with an older export.

Read the generated report and check arithmetic. The concise response should contain:

1. Period and baseline, or “首次基准”.
2. Income, actual consumption, surplus, ending net worth and its change.
3. Nine-category changes, plus supplied event notes. Explain only causes supported by the user's notes. A balance difference alone does not reveal what was purchased.
4. Up to three prioritized next actions, distinguishing timing effects, confirmed overspending and unresolved data.

Do not label unexplained net-worth movement as investment returns. The reconciliation residual may include market/FX changes, omitted accounts and recording errors. Missing intervals or unequal durations must be disclosed; compare daily spending where useful. Monthly budget figures are saved snapshots of whole-month allowances, not prorated actuals. Do not infer quarterly budget modes without the trip-month schedule.

## Month And Quarter Rollups

```powershell
node scripts/finance-review.cjs aggregate --type month --end YYYY-MM-DD --mode normal
node scripts/finance-review.cjs aggregate --type quarter --end YYYY-MM-DD
```

Aggregation creates a draft, not a saved report. Check it with the user before `save`. It requires exact continuous coverage, uses either months or weeks (never both), sums flows and takes the final ending balance. Cross-month weeks cannot be split without dated actuals. If rejected, request the actual period subtotal or source transactions; never prorate actual spending to fill gaps.

## Website Handoff

The website has a “周期复盘” sidebar destination. Import `website-import.json` there; this updates period reviews, not detailed transactions or individual-account balances. Full backups and encrypted cloud sync include reviews. For cross-computer use, save the complete version to the user's configured cloud and verify the success status. Use an authorized browser session only; never extract credentials or claim cloud synchronization without confirmation.

When browser access is unavailable, deliver clickable local report and import-file links and say the website has not yet been updated. On another computer, export the latest reviews from the website and reconcile that history before analyzing the next period. Do not publish private review data to the public repository as a synchronization workaround.
