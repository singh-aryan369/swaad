# Employment Law Database — Authenticity Corrections Report

**Verification date:** 2026-05-05
**Total rules audited:** 264
**Rules requiring correction:** 60 (≈22%)
**Rules verified accurate as-is:** 204 (≈78%)

This report documents every authenticity correction identified by jurisdiction-level verification against official statute portals. Apply each correction to the corresponding rule in `employment_data.json` (matched by `rule_id`).

---

## How to use this report

For each rule listed below:
- **Issue** explains what was wrong in the original.
- **Apply** lists the field-level changes to make in `employment_data.json`.
- The structured patch is in `employment_data_corrections.json`.
- Run `apply_corrections.py` to apply automatically.

---

## 🇧🇷 BRAZIL — 6 corrections

### BR_EMP_002 — 13th salary
- **Issue:** Two-installment deadlines (Nov 30 / Dec 20) come from **Law 4.749/1965**, not Law 4.090/1962 as cited.
- **Apply:** Add Law 4.749/1965 Arts. 1-2 to `source_law` and `law_text`.

### BR_EMP_005 — FGTS deposit
- **Issue:** Deposit deadline cited as "20th"; currently still **day 7** (Law 14.438/2022 amendment to day 20 awaits FGTS Digital activation).
- **Apply:** Update `statutory_minimum.deposit_deadline` to "7th of following month (with day-20 amendment pending FGTS Digital activation)".

### BR_EMP_008 — Minimum wage 🔴 CRITICAL
- **Issue:** R$1,412 was 2024; **R$1,518 effective 1 January 2025** (Decree 12.342/2024 / Law 15.077/2024).
- **Apply:** Update `statutory_minimum.national_minimum_wage` to R$1,518.00, `last_updated` to 2025-01-01.

### BR_EMP_010 — Non-compete
- **Issue:** Presented as if statutory; actually entirely jurisprudential.
- **Apply:** Reframe `law_text` to clearly identify as doctrinal/jurisprudential standards, not statutory rules.

### BR_EMP_014 — Harassment prevention
- **Issue:** "Anonymous reporting" is technically **confidential reporting** under Law 14.457/2022.
- **Apply:** Update `statutory_minimum.reporting_channel` to "Confidential (sigiloso) — identity protection, not strictly anonymous".

### BR_EMP_020 — Right to disconnect
- **Issue:** Conflates **sobreaviso** (statutory standby pay) with **right-to-disconnect** (no statutory basis in Brazil).
- **Apply:** Update `law_text` and `notes` to distinguish the two concepts; clarify Brazil has no statutory right to disconnect.

---

## 🇩🇪 GERMANY — 6 corrections

### DE_EMP_002 — Dismissal protection
- **Issue:** KSchG §23 has dual regime (5 vs 10 employees by hire date pre/post 2003).
- **Apply:** Add `minimum_company_size_pre_2004` ("More than 5") and `minimum_company_size_post_2003` ("More than 10") with grandfathering note.

### DE_EMP_008 — Sick pay
- **Issue:** Krankenkasse 70% sick pay derives from **SGB V §47**, not EntgFG.
- **Apply:** Add SGB V §47 to `source_law` and `law_text`.

### DE_EMP_009 — Maternity protection
- **Issue:** Two-week notification window is in MuSchG §17, not §18.
- **Apply:** Reorder cited articles in `source_law`.

### DE_EMP_011 — Parental leave 🔴 IMPORTANT
- **Issue:** Dismissal protection is **8 weeks pre-leave for under-3, 14 weeks for ages 3-8**. Rule omits the 14-week rule.
- **Apply:** Add `dismissal_protection_pre_leave_age_3_to_8` field with 14-week value.

### DE_EMP_017 — Social security 🔴 CRITICAL
- **Issue:** **Long-term care insurance is 3.6% in 2025, NOT 3.4%** (raised mid-2023 per PUEG).
- **Apply:** Update `long_term_care_total_percent` to 3.6 with childless surcharge note (+0.6%).

### DE_EMP_019 — Reference letter
- **Issue:** BGB §630 generally inapplicable to standard employees post-2003 reform; **GewO §109 is operative**.
- **Apply:** Reorder `source_law` to lead with GewO §109.

---

## 🇫🇷 FRANCE — 8 corrections

### FR_EMP_001 — Non-compete
- **Issue:** "1/3 monthly salary minimum" is from CBAs, not Cassation; "Barbier trilogy" has 3 docket numbers (99-43.334, 00-45.135, 00-45.387), not 1.
- **Apply:** Update `law_text` and `statutory_minimum.compensation_minimum` to clarify CBA source and list all three docket numbers.

### FR_EMP_004 — SMIC 🟠 HIGH
- **Issue:** **SMIC €11.88/hour took effect 1 November 2024** (Décret 2024-951), not 1 January 2025.
- **Apply:** Update `effective_from` to "2024-11-01" and `last_updated` to 2024-11-01.

### FR_EMP_011 — Maternity/paternity
- **Issue:** Paternity leave is **25 days + 4 mandatory** at start (not 3); 26-week 3rd-child maternity is in L1225-19 (not L1225-17).
- **Apply:** Update `paternity_mandatory_days_at_start` to 4; add separate `birth_leave_days_separate` (3 days under L3142-1); add L1225-19 to `source_law`.

### FR_EMP_019 — Transport allowance
- **Issue:** Forfait mobilités durables ceiling is **€700/year**, not €800. €800 only when combined with public transport reimbursement.
- **Apply:** Update `voluntary_sustainable_mobility_allowance` to €700/year standalone, add `combined_with_public_transport_ceiling_eur_year: 800`.

### FR_EMP_021 — Sunday work
- **Issue:** "100% premium minimum" is **not a universal legal floor** — depends on dérogation type.
- **Apply:** Update `sunday_premium` to "Set by applicable derogation regime / collective agreement (NOT a universal 100% floor)".

### FR_EMP_022 — Night work
- **Issue:** Article numbering off — night-worker thresholds at L3122-5; L3122-8/9 cover other matters.
- **Apply:** Reorder `source_law` to lead with L3122-1, L3122-2, L3122-5.

### FR_EMP_028 — Garden leave 🟠 HIGH
- **Issue:** **Wrong article — L1237-19 is for rupture conventionnelle collective**; correct cite is L1234-4 / L1234-5.
- **Apply:** Replace L1237-19 with L1234-4 and L1234-5 in `source_law` and `law_text`.

### FR_EMP_039 — Non-compete compensation
- **Issue:** "Barbier trilogy" of 10 July 2002 has three docket numbers; only one cited.
- **Apply:** Update citations to include all three: n°99-43.334, n°00-45.135, n°00-45.387.

---

## 🇮🇳 INDIA — 8 corrections + 1 cross-cutting flag

### 🚨 CROSS-CUTTING FLAG (affects 16 rules)
**All four Labour Codes** (Wages 2019, IR 2020, OSH 2020, SS 2020) were notified for enforcement only on **21 November 2025**. For the 2024-2025 verification window, the predecessor statutes (IDA 1947, Factories Act 1948, ID(SO) Act 1946, TU Act 1926, PoW Act 1936, MW Act 1948, ISMW Act 1979, ER Act 1976, MB Act 1961) were the operative law. **Recommended:** add `codes_in_force_date` field to each affected rule.

### IN_EMP_005 — Working hours
- **Issue:** OT double-rate is OSH Code **§29**, not §34 (which is welfare facilities).
- **Apply:** Replace §34 with §29 in `source_law`.

### IN_EMP_007 — Maternity
- **Issue:** Crèche obligation is MB Act **§11A**, not §12.
- **Apply:** Replace §12 with §11A for crèche provision.

### IN_EMP_009 — Fixed-term employment
- **Issue:** Definition is in IR Code **§2(o)**, not §2(r) (which defines "industry").
- **Apply:** Replace §2(r) with §2(o) in `source_law`.

### IN_EMP_019 — Layoff
- **Issue:** 50-worker threshold sits in IR Code **§67**, not §65 (which is the formula).
- **Apply:** Update `source_law` to "Sections 65 (formula) read with 67 (threshold)".

### IN_EMP_021 — Contract labour equal pay
- **Issue:** Equal-pay anchor is **CLRA Central Rules Rule 25(2)(v)(a)**, not §10 (which is the abolition power).
- **Apply:** Add CLRA Central Rules 1971 Rule 25(2)(v)(a) to `source_law`.

### IN_EMP_025 — Document retention 🔴 SERIOUS
- **Issue:** Constitution Art. 23 + Passports Act §12 do **not** address general HR document retention.
- **Apply:** Reframe rule as "passport_and_certificate_confiscation_prohibition" — the cited statutes correctly cover that, not document retention generally.

### IN_EMP_042 — Patent assignment 🔴 SERIOUS
- **Issue:** **Patents Act §17 is "date of patent"** — the Act is silent on employee inventions. India lacks a statutory employee-invention regime.
- **Apply:** Update `requirement` and `source_law` to reflect that allocation is purely contractual (ICA §23, §27) plus Copyright Act §17(c) for copyright works only.

### IN_EMP_046 — Domestic inquiry
- **Issue:** **IR Code §86 is "penalties" chapter**, not domestic inquiry. Procedural anchor is Standing Orders Schedule + IDA §33 + jurisprudence.
- **Apply:** Replace §86 with Model SO Cl.14 + IDA §33 + key jurisprudence.

### IN_EMP_047 — Overtime
- **Issue:** OT trigger differs: **9 hr under Factories Act §59 (operative 2024-25), 8 hr under OSH Code §25** (operative from Nov 2025).
- **Apply:** Add both triggers with clear transition date.

---

## 🇵🇭 PHILIPPINES — 1 correction

### PH_EMP_002 — Statutory contributions 🟠 HIGH
- **Issue:** **PhilHealth is 5% in 2024+** (not 4%), split 2.5%/2.5%; **Pag-IBIG is 2% on PHP 10,000 ceiling** from Feb 2024 (not the 1-2% historical band).
- **Apply:** Update `statutory_minimum.PhilHealth` to "5% of monthly basic salary (split 2.5%/2.5%); ceiling PHP 100,000" and `statutory_minimum.PagIBIG` to "2% on Monthly Fund Salary up to PHP 10,000 ceiling (PHP 200 max each side)".

---

## 🇹🇭 THAILAND — 5 corrections

### TH_EMP_003 — Working hours
- **Issue:** Section misallocation — §28 covers weekly holiday, not break rule.
- **Apply:** Replace §28 with §27 for break rule; keep §28 for weekly holiday separately if listed.

### TH_EMP_004 — Overtime
- **Issue:** 36hr/week OT cap is in **§26**, not §24 (which deals with consent for OT).
- **Apply:** Replace §24 with §26 for the OT cap.

### TH_EMP_005 — Minimum wage 🔴 CRITICAL
- **Issue:** Range outdated — actual current 2025 rates are **฿337-฿400/day** (Bangkok ฿400; floor ฿337), not ฿330-370.
- **Apply:** Update `statutory_minimum.approximate_daily_rate_thb` to "฿337-฿400 depending on province (effective 2025)".

### TH_EMP_007 — Sick leave
- **Issue:** Sick leave is **§32 + §57**, not §32 + §33 (which deals with sterilization leave).
- **Apply:** Replace §33 with §57 for paid sick leave entitlement.

### TH_EMP_010 — Wrongful termination
- **Issue:** "180 days max compensation" is **not statutory** — Labour Court has wide discretion under Establishment of Labour Courts Act §49.
- **Apply:** Remove the 180-day cap and replace with "court discretion to determine reinstatement or compensation considering all circumstances".

### TH_EMP_011 — Work permits
- **Issue:** Reserved-occupations count outdated — post-Feb 2022 reform reduced list to **~27**, not 39.
- **Apply:** Update `reserved_occupations_for_thais` to "Approximately 27 occupations under 3 February 2022 Reserved-Occupations Regulation".

---

## 🇬🇧 UNITED KINGDOM — 4 corrections

### GB_EMP_003 — National Minimum Wage 🔴 CRITICAL
- **Issue:** **NLW £11.44 was Apr 2024-Mar 2025; from 1 April 2025 NLW is £12.21** (18-20 rate £10.00).
- **Apply:** Update `statutory_minimum` with both 2024/25 and 2025/26 rates.

### GB_EMP_005 — Unfair dismissal 🔴 CRITICAL
- **Issue:** **2024/25 ET caps wrong**: max compensatory **£115,115** (not £105,707); weekly pay cap **£700** (not £643); basic award max **£21,000** (not £19,290).
- **Apply:** Update all three caps for 2024/25 per SI 2024/213.

### GB_EMP_009 — Family leave 🔴 IMPORTANT
- **Issue:** **SMP rate outdated**: £172.48 was 2023/24; from 7 April 2024 it is **£184.03/week** (£187.18 from April 2025).
- **Apply:** Update `statutory_maternity_pay` to current rate.

### GB_EMP_014 — Redundancy
- **Issue:** Weekly pay cap £643 outdated (now **£700**).
- **Apply:** Update `weekly_pay_cap` to £700 and `max_statutory_redundancy_payment` to £21,000.

---

## 🇺🇸 UNITED STATES — 9 corrections

### US_EMP_006 — Anti-discrimination
- **Issue:** "9 federal protected classes" is informal.
- **Apply:** Replace count with enumerated list.

### US_EMP_007 — Worker classification 🔴 IMPORTANT
- **Issue:** **AB5 is now Cal Lab Code §2775**, not §2750.3 (relocated by AB 2257 effective 4 Sept 2020).
- **Apply:** Update all references from §2750.3 to §2775.

### US_EMP_019 — WA non-compete 🔴 CRITICAL
- **Issue:** **WA 2024 threshold is $120,559.99**, not $116,593.18 (which was the 2023 figure).
- **Apply:** Update `minimum_employee_income_usd_2024` to 120559.99.

### US_EMP_025 — Arbitration signing
- **Issue:** **Cal Lab Code §432.6 was permanently enjoined** following Chamber v. Bonta (9th Cir. 15 Feb 2023).
- **Apply:** Update `california_ab51` field to flag enjoinment.

### US_EMP_027 — Benefits disclosure
- **Issue:** SPD timing nuance — **90 days for new participants, 120 days for new plans**.
- **Apply:** Add both timing requirements.

### US_EMP_028 — Drug testing 🔴 IMPORTANT
- **Issue:** **AB 2188 is at Gov Code §12954** (FEHA), NOT Labor Code §1700.
- **Apply:** Replace Labor Code §1700 with Gov Code §12954 throughout.

### US_EMP_032 — COBRA
- **Issue:** "14-day notice" is plan administrator deadline AFTER employer notifies; **employer has 30 days to notify administrator**.
- **Apply:** Add `employer_notice_to_plan_administrator_days: 30` and clarify 14-day plan-admin deadline.

### US_EMP_041 — Child labor
- **Issue:** Claim correct but omits 8-hour non-school day cap for 14-15-year-olds.
- **Apply:** Add `age_14_15_max_nonschool_day_hours: 8`.

### US_EMP_045 — California PAGA
- **Issue:** Needs **Adolph v. Uber (Cal. 2023)** and **PAGA reform AB 2288/SB 92 (June 2024)** updates.
- **Apply:** Add both to `statutory_minimum` and `notes`.

---

## 🇻🇳 VIETNAM — 9 corrections

### VN_EMP_006 — Minimum wage
- **Issue:** 7% trained-worker premium **no longer mandated** under Decree 74/2024.
- **Apply:** Update `trained_worker_premium_percent` to clarify it's not freshly mandated.

### VN_EMP_009 — Social insurance 🔴 IMPORTANT
- **Issue:** **SHUI breakdown double-counts** the 0.5% accident-insurance (it's part of the 17.5% SI total). **Social Insurance Law 2024 (Law 41/2024/QH15) supersedes 2014 law from 1 July 2025.**
- **Apply:** Remove separate `accident_fund_employer_percent: 0.5` line; correct total employer burden from 22% to **21.5%**; flag the 2024 law transition.

### VN_EMP_018 — Foreign workers
- **Issue:** Decree 152/2020/ND-CP **superseded by Decree 219/2025/ND-CP**.
- **Apply:** Update `source_law` to cite Decree 219/2025.

### VN_EMP_020 — Dispute resolution 🔴 IMPORTANT
- **Issue:** **Court limitation is 1 year, NOT 3 years** as stated.
- **Apply:** Update `limitations_period_years_wages` to 1 (and rename — limitation is for all individual disputes, not just wages).

### VN_EMP_022 — Governing law 🔴 SERIOUS
- **Issue:** **Article 169 of Labour Code governs RETIREMENT AGE, not governing law**.
- **Apply:** Replace LC Art. 169 with LC Art. 121 in `source_law`; keep Civil Code Art. 683.

### VN_EMP_023 — Prohibited terms 🔴 IMPORTANT
- **Issue:** **Fine is VND 20-25M per worker** (not 20-40M).
- **Apply:** Update `fine_per_worker_vnd` to "20,000,000 – 25,000,000 (cap 75M for multiple workers)".

### VN_EMP_032 — Unemployment insurance
- **Issue:** Benefit rate (60%) is in **Art. 50**, not Art. 57 (which covers vocational training support).
- **Apply:** Update `source_law` — Article 50 sets benefit; Article 58 sets contribution rates; Article 57 is vocational training (different topic).

### VN_EMP_034 — Rest break entitlements 🔴 IMPORTANT
- **Issue:** **Inter-shift rest is Article 110, not Article 108** (which covers public holidays).
- **Apply:** Replace Art. 108 with Art. 110.

### VN_EMP_015 (note) — PDP
- **Issue:** Should flag upcoming **Personal Data Protection Law 91/2025/QH15** effective 1 January 2026.
- **Apply:** Add forward-looking note about transition from Decree 13/2023.

---

## Cross-cutting recommendations

1. **Add `verification_status` field** to every rule with values `verified`, `outdated`, `wrong_citation`, `needs_review`, `superseded`.
2. **Rate-tracking subsystem** — minimum wages, social-insurance rates, ET caps, SMP/SSP rates, SMIC, regional VN minimums, IL/CO/WA non-compete thresholds change annually. These should be in a separate cadence-tracked table.
3. **India urgent**: add `codes_in_force_date` toggle. The 21 Nov 2025 Code enforcement materially changes which statute is the operative authority for each rule.
4. **Add `superseded_by` field** to surface decree replacements (VN Decree 152/2020 → 219/2025; VN SI Law 2014 → 2024).
5. **Section-number QA pass** — particularly Thailand LPA, Vietnam Labour Code, Indian IR Code, French Code du travail. ~15% of audited rules cite the right statute but the wrong section.

---

## Files in this delivery

| File | Purpose |
|---|---|
| `EMPLOYMENT_LAW_CORRECTIONS_REPORT.md` | This human-readable report |
| `employment_data_corrections.json` | Structured patches keyed by rule_id |
| `apply_corrections.py` | Python script to merge corrections into your JSON |

To apply: place all three files alongside your `employment_data.json` and run `python apply_corrections.py`.
