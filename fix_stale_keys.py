"""
fix_stale_keys.py
=================
Second pass that overwrites stale numeric values that the additive deep-merge
left behind. Each entry replaces a specific value at a specific path.
"""

import json
from pathlib import Path

PATH = Path("employment_data.json")

# (rule_id, key_path_in_rule, new_value)
PATCHES = [
    # DE long-term care raised mid-2023; current 2025 rate is 3.6
    ("DE_EMP_017", ["statutory_minimum", "long_term_care_total_percent"], 3.6),

    # TH minimum wage range updated to 2025 ฿337-฿400
    ("TH_EMP_005", ["statutory_minimum", "approximate_daily_rate_thb"],
     "337-400 depending on province (effective 2025 - verify current rate)"),

    # VN total employer burden corrected from 22% (double-counted) to 21.5%
    ("VN_EMP_009", ["statutory_minimum", "total_employer_burden_percent"], 21.5),

    # GB NLW main figure - keep but mark as historical, primary now is 2025/26
    ("GB_EMP_003", ["statutory_minimum", "nlw_21_and_over_2024"],
     "£11.44/hour (1 Apr 2024 – 31 Mar 2025)"),

    # GB SMP main rate to 2024/25 figure
    ("GB_EMP_009", ["statutory_minimum", "statutory_maternity_pay"],
     "6 weeks at 90% of average earnings then up to 33 weeks at £184.03/week (2024/25; £187.18 from April 2025)"),

    # GB ET caps - update primary 2024 fields
    ("GB_EMP_005", ["statutory_minimum", "basic_award_max"], "£21,000 (2024/25; was £19,290 in 2023/24)"),
    ("GB_EMP_005", ["statutory_minimum", "compensatory_award_max"],
     "£115,115 or 52 weeks pay (2024/25; was £105,707 in 2023/24)"),

    # US WA non-compete threshold - update primary
    ("US_EMP_019", ["statutory_minimum", "minimum_employee_income_usd_2024"], 120559.99),

    # US AB5 reference in remediation_template / law_text-related fields
    # already overlaid by corrections - main fix is law_text and source_law which were replaced

    # PH PhilHealth/PagIBIG primary fields
    ("PH_EMP_002", ["statutory_minimum", "PhilHealth"],
     "5% of monthly basic salary (split 2.5%/2.5% employee/employer); ceiling PHP 100,000 monthly salary (2024+)"),
    ("PH_EMP_002", ["statutory_minimum", "PagIBIG"],
     "2% on Monthly Fund Salary up to PHP 10,000 ceiling (PHP 200 max each side, from Feb 2024)"),

    # FR SMIC primary date
    ("FR_EMP_004", ["statutory_minimum", "effective_from"], "2024-11-01"),

    # FR FMD ceiling primary
    ("FR_EMP_019", ["statutory_minimum", "voluntary_sustainable_mobility_allowance"],
     "Up to €700/year tax-exempt standalone (€800/year ceiling when combined with public transport reimbursement)"),

    # BR FGTS deposit deadline primary field
    ("BR_EMP_005", ["statutory_minimum", "deposit_deadline"],
     "7th of following month (Law 14.438/2022 amendment to day 20 takes effect upon FGTS Digital activation)"),

    # BR min wage primary
    ("BR_EMP_008", ["statutory_minimum", "national_minimum_wage_2024"],
     "R$1,412.00/month (historical 2024 rate)"),

    # GB redundancy weekly cap
    ("GB_EMP_014", ["statutory_minimum", "statutory_redundancy_pay"],
     "0.5 weeks pay per year (under 22), 1 week (22-40), 1.5 weeks (41+), max 20 years; weekly pay cap £700 (2024/25)"),

    # VN_EMP_034 article-number fix in source_law field
    ("VN_EMP_034", ["source_law"],
     "Labour Code 2019, Articles 109 (mid-shift breaks), 110 (12-hour inter-shift rest), 111 (24-hour weekly rest)"),

    # VN_EMP_022 article fix in source_law field (was 169, should be 121)
    ("VN_EMP_022", ["source_law"],
     "Labour Code 2019, Article 121 (foreign employees rights); Civil Code 2015, Article 683 (governing law for foreign-element contracts)"),

    # VN_EMP_032 source_law fix
    ("VN_EMP_032", ["source_law"],
     "Employment Law 2013 (Law 38/2013/QH13), Articles 43 (eligibility), 50 (60% benefit rate and 3-12 month duration), 58 (contribution rates 1%/1%/up to 1% state)"),

    # VN_EMP_023 fine range in statutory_minimum
    ("VN_EMP_023", ["statutory_minimum", "fine_per_worker_vnd"],
     "20,000,000 - 25,000,000 (cap of 75,000,000 for multiple workers)"),

    # VN_EMP_020 limitations
    ("VN_EMP_020", ["statutory_minimum", "limitations_period_months_termination"], 6),
    ("VN_EMP_020", ["statutory_minimum", "limitations_period_years_wages"], 1),

    # IN_EMP_005 source_law primary fix
    ("IN_EMP_005", ["source_law"],
     "Occupational Safety, Health and Working Conditions Code 2020, Sections 25, 26, 29 (post 21-Nov-2025); Factories Act 1948 Sections 51, 54, 59 (operative 2024-25, 9-hour daily OT trigger)"),

    # IN_EMP_007 source_law - crèche is §11A
    ("IN_EMP_007", ["source_law"],
     "Maternity Benefit (Amendment) Act 2017 - Section 5 (26-week leave), Section 11A (crèche for 50+ employees), Section 12 (dismissal protection)"),

    # IN_EMP_009 source_law - FTE is §2(o)
    ("IN_EMP_009", ["source_law"],
     "Industrial Relations Code 2020, Section 2(o) (fixed-term employment definition)"),

    # IN_EMP_046 source_law fix
    ("IN_EMP_046", ["source_law"],
     "Industrial Disputes Act 1947, Section 33; Industrial Employment (Standing Orders) Central Rules 1946, Schedule I-B Model Standing Orders Clause 14; jurisprudence including Workmen of M/s Firestone Tyre v. Mgmt. (1973) 1 SCC 813"),

    # US_EMP_028 source_law - AB 2188 is at Gov Code §12954
    ("US_EMP_028", ["source_law"],
     "California Government Code §12954 (AB 2188, effective 1 January 2024); NYC Admin Code §8-107(31); Drug-Free Workplace Act 41 USC §8101"),

    # FR_EMP_022 night work source_law
    ("FR_EMP_022", ["source_law"],
     "Code du travail L3122-1, L3122-2 (night-work definition 21:00-06:00), L3122-5 (night-worker threshold), L3122-7, L3122-8, L3122-15"),

    # FR_EMP_028 garden leave - source_law and source_url
    ("FR_EMP_028", ["source_law"],
     "Code du travail L1234-4 (notice period continuation); L1234-5 (compensatory indemnity for unworked notice period); Cass. soc. 27 octobre 2004"),
    ("FR_EMP_028", ["source_url"],
     "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901206"),

    # IN_EMP_021 source_law
    ("IN_EMP_021", ["source_law"],
     "Constitution Art. 14, 39(d); Contract Labour (Regulation and Abolition) Act 1970 Section 10 (abolition power); CLRA Central Rules 1971 Rule 25(2)(v)(a) (equal wages for similar work); OSH Code 2020 Section 57; SAIL v. National Union Waterfront Workers (2001) 7 SCC 1"),

    # IN_EMP_019 source_law
    ("IN_EMP_019", ["source_law"],
     "Industrial Relations Code 2020, Sections 65 (layoff compensation formula), 67 (50-worker applicability threshold); Industrial Disputes Act 1947 Section 25C-25M (operative pre-21-Nov-2025)"),

    # DE_EMP_002 source_law for KSchG
    ("DE_EMP_002", ["source_law"],
     "KSchG §1, §23 (dual regime: more than 5 employees pre-2004 hires; more than 10 for post-2003 hires)"),
]


def set_path(d, path, value):
    cur = d
    for k in path[:-1]:
        if k not in cur or not isinstance(cur[k], dict):
            cur[k] = {}
        cur = cur[k]
    cur[path[-1]] = value


def main():
    rules = json.loads(PATH.read_text(encoding="utf-8"))
    by_id = {r.get("rule_id"): r for r in rules}

    applied = 0
    skipped = []
    for rule_id, path, value in PATCHES:
        if rule_id not in by_id:
            skipped.append(rule_id)
            continue
        set_path(by_id[rule_id], path, value)
        applied += 1

    PATH.write_text(json.dumps(rules, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Applied {applied} stale-key fixes")
    if skipped:
        print(f"Skipped (rule_id not found): {skipped}")


if __name__ == "__main__":
    main()
