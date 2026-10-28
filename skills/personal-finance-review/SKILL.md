---
name: personal-finance-review
description: Update the user's personal-finance weekly, monthly or quarterly review from a concise nine-category template, compare verified periods and balances, generate a report and prepare private website-import records. Use for 个人财务复盘, 每周财务更新, 月度财务复盘, 季度财务复盘 or requests to fill the finance review template. Not for individual-stock trading reviews.
---

# Personal Finance Review

Maintain the user's personal finance review for `TravelStocks/Personal-Finance-Management`: eight coarse budget groups, detailed actual spending and separate emergency/learning accounting. Keep reports evidence-based. This skill is manually invoked; it does not schedule background work.

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

The budget displays 房租、家用、投资基金、应急&学习金、旅游基金、伴侣基金、小额支付、日常使用. The combined group is 1,500 per month: emergency 500 plus learning 1,000. Review inputs retain nine fields because emergency net transfers and learning actual consumption must remain separate. Keep the JSON keys `emergency` and `learning` for compatibility.

- Income means external income for the stated period, not transfers between personal accounts or withdrawals from a brokerage. Do not count unrealized or already-included investment gains as cash income.
- Investment and emergency amounts are net transfers; withdrawals are negative. They are not consumption. The other seven categories are actual payments net of refunds, not budget reservations or wallet top-ups.
- 小额支付 includes breakfast, subway and small snacks. The confirmed budget is normal month 1,000, trip month 0. A dedicated wallet can be reconciled from opening balance + net top-ups - closing balance, excluding other transfers and purchases already counted elsewhere. Ask about mixed use before using this shortcut.
- 日常使用 includes lunch/dinner and all remaining living expenses. Normal-month cap remains 1,000; trip-month cap remains 1,700. This is a tight target, not proof of actual spending.
- Learning actuals require a purpose breakdown: course or training, books or materials, learning tools or subscriptions. Ask what each payment bought when the report lacks this information; do not classify all subscriptions as learning. The website's 支出 module stores `group: "learning"` and `note` on each detailed row and shows monthly learning usage in 应急&学习金.
- Family money already given away is no longer a personal asset. Own learning/travel/partner cash reserves remain assets until actually paid; avoid counting both reservations and spending.
- Ending cash includes personal deposits, payment wallets and earmarked cash. Securities total includes brokerage cash and holdings, counted once. Use consistent cutoff-date CNY exchange rates for non-CNY assets.
- Loan principal repayments reduce cash and debt, not consumption; interest and fees are expenses. Never infer that a liability is repaid without evidence.

Use the current confirmed annual plan, not outdated chat numbers. The shipped plan is normal 13,000, trip 12,700, annual 155,100 under nine normal/three trip months. With salary 13,000, the ordinary month balances; annual reference surplus is 31,050 under the existing travel assumptions. Emergency and investment total 39,000 per year; learning consumption is not emergency saving. The confirmed emergency necessity base is 4,750 per month, giving a six-month target of 28,500. The 500 is a monthly contribution, not an existing balance. If the webpage plan has been customized, use its verified values for the monthly `budget` snapshot rather than the CLI template's repository defaults.

Current cash forecasts use the annual allocation plus separately identified budget-external cash flows, never old ledger budgets or legacy market plans. Unconfirmed travel subsidies are not available cash. Spendable cash is liquid account balances minus dedicated account reservations and additional locked projects. A project's optional `fundingAccountId` links it to an account so dedicated balances are not deducted twice; unlinked prepared projects are conservatively deducted separately and require reconciliation. Do not invent links from matching amounts. Non-liquid accounts are outside the cash pool; project targets or gaps are not existing reservations. Actual emergency balances come from identified emergency accounts, including confirmed zero; manual references without an account are not cash in the liquid pool.

## Kapi Reports And Detailed Spending

The user records individual payments **over CNY 10 from the daily-use account** in 咔皮记账 and will supply its reports. This is not authorization to access Kapi or to assume an export schema before seeing a real report.

1. Inspect the supplied file or screenshot with the appropriate document/spreadsheet tools. Confirm its date range, accounts, included transaction types and whether it contains only >10 payments. Preserve the original privately.
2. Reconcile reported totals with the extracted detail. Keep date, original category, merchant/item, net amount, payment account and source reference when available. Do not infer a purchase purpose from an account balance.
3. Separate income, own-account transfers, card repayments and refunds. Purchases already counted must not be counted again as repayments. For cross-period refunds, retain the refund date and explain the effect.
4. Map each confirmed expense to a coarse parent and a fine category. Typical daily details: lunch/dinner, social meals/takeout, goods/clothes, non-learning subscriptions/phone, sports/entertainment, health/personal care and gifts/other. Learning details: courses/training, books/materials and learning tools/subscriptions. Ambiguous old categories stay unassigned until clarified.
5. The >10 report is not necessarily complete consumption. Payments of exactly 10 or less from the daily account may be missing and are not automatically covered by the small-payments wallet. Ask for a confirmed supplementary total or disclose the gap; do not manufacture a zero.
6. Combine verified daily details with the separately reconciled small-payments total, excluding overlap. Keep transaction-level evidence privately, summarize amounts into the existing review JSON fields, and put the learning item/amount/purpose breakdown in `notes.learning`.

Return a concise fine-category table and learning-purpose list with the periodic report. An expense report does not supply external income or ending balances automatically; request those separately. Updating period-review JSON does not update the detailed monthly ledger. When the user asks to populate the website's 支出 module, use verified rows in an authorized session or a supported backup workflow, preserve other records and report exactly which store changed.

## Save And Analyze

Include a concise four-part key-changes summary: income/spending, large projects, bills/subscriptions, and assets/liabilities. The optional `focus` snapshot contains `projects` (id, name, target, current, dueDate), `bills` (id, name, amount, date, kind), `assets` and `debts` (id, name, amount), plus `holdings` as reference CNY market value. `checks` has booleans for projects/bills/balance; `notes` holds each group's explanation. Only mark a group checked after the user verifies its cutoff-date data. Carry-forward templates reset checks and notes. No supplied snapshot means unknown, not an empty verified list.

Compare verified same-type snapshots by stable IDs. Highlight project funding gaps and deadlines within 30 days of the review cutoff, and reminders within 7 days of that cutoff, not the computer's current date. Old dates require status clarification; a removed reminder is not proof of payment or cancellation. Subscription coverage is limited to the supplied reminder list. Project reservations and reminder amounts do not become actual consumption or extra assets. Keep brokerage totals separate from reference holding values, and flag disagreement between detailed debt and the stated debt total. Keep the main report to four summaries and at most three actions; place detailed changes below. The website's source-module updates require refreshing and rechecking the draft; saved historical snapshots stay unchanged. Aggregates take only the final context, never sum these balances.

When individual account balances are supplied, retain an optional `accounts` snapshot with stable `id`, `name`, `type`, `purpose`, `balance`, `included` and `note` fields. The included balances must equal `balances.cash`; exclude brokerage totals counted in investments and money belonging to others. A carried-forward balance is a reference requiring confirmation, not a new actual. Compare accounts by ID; absent prior details mean no baseline, not zero. Monthly/quarterly rollups retain the final snapshot only. Balance changes alone do not establish spending or its cause.

Convert the user's verified input into the generated JSON contract without inventing values. Preserve the original input privately. Run:

```powershell
node scripts/finance-review.cjs save --input .private-finance/intake.json
```

The CLI validates the entire payload first, uses the shared website engine, maintains `history.json`, produces `report-TYPE-START.md` and `website-import.json`, and backs up prior history. If the same period exists, explain the corrections and use `--replace` only for the user's intentional revision. Never silently duplicate a week or overwrite later data with an older export.

Read the generated report and check arithmetic. The concise response should contain:

1. Period and baseline, or “首次基准”.
2. Income, actual consumption, surplus, ending net worth and its change.
3. Key changes in income/spending, projects, bills/subscriptions and asset/debt balances, followed by optional nine-category and account detail. Explain only causes supported by the user's notes. A balance difference alone does not reveal what was purchased.
4. Up to three prioritized next actions, distinguishing timing effects, confirmed overspending and unresolved data.

Do not label unexplained net-worth movement as investment returns. The reconciliation residual may include market/FX changes, omitted accounts and recording errors. Missing intervals or unequal durations must be disclosed; compare daily spending where useful. Monthly budget figures are saved snapshots of whole-month allowances, not prorated actuals. Do not infer quarterly budget modes without the trip-month schedule.

## Month And Quarter Rollups

```powershell
node scripts/finance-review.cjs aggregate --type month --end YYYY-MM-DD --mode normal
node scripts/finance-review.cjs aggregate --type quarter --end YYYY-MM-DD
```

Aggregation creates a draft, not a saved report. Check it with the user before `save`. It requires exact continuous coverage, uses either months or weeks (never both), sums flows and takes the final ending balance. Cross-month weeks cannot be split without dated actuals. If rejected, request the actual period subtotal or source transactions; never prorate actual spending to fill gaps.

## Website Handoff

The website has a “周期复盘” sidebar destination. Its form brings in account balances for verification and can save a snapshot plus update existing account balances only when the cutoff is today and the sync checkbox is selected. Historical edits do not change current accounts. Importing `website-import.json` updates period reviews and their snapshots, not detailed transactions or current account balances. Full backups and encrypted cloud sync include reviews. For cross-computer use, save the complete version to the user's configured cloud and verify the success status. Use an authorized browser session only; never extract credentials or claim cloud synchronization without confirmation.

When browser access is unavailable, deliver clickable local report and import-file links and say the website has not yet been updated. On another computer, export the latest reviews from the website and reconcile that history before analyzing the next period. Do not publish private review data to the public repository as a synchronization workaround.
