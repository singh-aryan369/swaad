"""
apply_corrections.py
====================
Applies the verified authenticity corrections from
employment_data_corrections.json to employment_data.json.

Usage:
    python apply_corrections.py [--dry-run] [--input PATH] [--output PATH]

Defaults:
    --input  employment_data.json
    --output employment_data.corrected.json

The script:
  1. Loads the original rules array.
  2. Loads the corrections object (keyed by rule_id).
  3. For each correction with `updated_fields`, deep-merges those fields
     into the matching rule.
  4. Writes the corrected JSON to the output path (or prints diffs in dry-run).
  5. Prints a summary of applied/skipped/missing rules.
"""

import argparse
import json
import sys
from pathlib import Path
from copy import deepcopy


def deep_merge(base: dict, overlay: dict) -> dict:
    """Recursively merge overlay into base. Overlay values win at leaves."""
    result = deepcopy(base)
    for key, value in overlay.items():
        if (
            key in result
            and isinstance(result[key], dict)
            and isinstance(value, dict)
        ):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        "--input",
        default="employment_data.json",
        help="Path to original employment_data.json (default: %(default)s)",
    )
    parser.add_argument(
        "--corrections",
        default="employment_data_corrections.json",
        help="Path to corrections file (default: %(default)s)",
    )
    parser.add_argument(
        "--output",
        default="employment_data.corrected.json",
        help="Path for the corrected output (default: %(default)s)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would change without writing the output file",
    )
    args = parser.parse_args()

    in_path = Path(args.input)
    corr_path = Path(args.corrections)
    out_path = Path(args.output)

    if not in_path.exists():
        print(f"ERROR: input not found: {in_path}", file=sys.stderr)
        return 1
    if not corr_path.exists():
        print(f"ERROR: corrections not found: {corr_path}", file=sys.stderr)
        return 1

    rules = json.loads(in_path.read_text(encoding="utf-8"))
    corrections = json.loads(corr_path.read_text(encoding="utf-8"))

    if not isinstance(rules, list):
        print("ERROR: employment_data.json must be a JSON array of rule objects", file=sys.stderr)
        return 1

    rules_by_id = {r.get("rule_id"): i for i, r in enumerate(rules) if r.get("rule_id")}

    applied = []
    notes_only = []
    missing = []
    cross_cutting = []

    for key, payload in corrections.items():
        if key.startswith("_"):
            continue  # metadata
        if not isinstance(payload, dict):
            continue

        # Cross-cutting / commentary entries (no rule_id match expected)
        if key.endswith("_NOTE") or key.endswith("ADDITIONAL_NOTE") or key == "IN_CROSS_CUTTING_NOTE":
            cross_cutting.append((key, payload.get("issue", "")))
            target_rule_id = payload.get("applies_to_rule_id")
            updated_fields = payload.get("updated_fields", {})
            if target_rule_id and target_rule_id in rules_by_id and updated_fields:
                idx = rules_by_id[target_rule_id]
                rules[idx] = deep_merge(rules[idx], updated_fields)
                notes_only.append((target_rule_id, key))
            continue

        if key not in rules_by_id:
            missing.append(key)
            continue

        updated_fields = payload.get("updated_fields")
        if not updated_fields:
            notes_only.append((key, payload.get("issue", "")))
            continue

        idx = rules_by_id[key]
        rules[idx] = deep_merge(rules[idx], updated_fields)
        applied.append(key)

    print("=" * 60)
    print(f"Original rules:        {len(rules)}")
    print(f"Corrections applied:   {len(applied)}")
    print(f"Notes-only entries:    {len(notes_only)}")
    print(f"Cross-cutting flags:   {len(cross_cutting)}")
    print(f"Missing rule_ids:      {len(missing)}")
    print("=" * 60)

    if applied:
        print("\nApplied corrections:")
        for rid in applied:
            print(f"  [OK] {rid}")

    if missing:
        print("\nWARNING - corrections reference rule_ids not found in input:")
        for rid in missing:
            print(f"  [MISSING] {rid}")

    if cross_cutting:
        print("\nCross-cutting flags (review manually):")
        for k, issue in cross_cutting:
            print(f"  - {k}: {issue}")

    if args.dry_run:
        print("\n--dry-run: no output file written.")
        return 0

    out_path.write_text(json.dumps(rules, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nCorrected JSON written to: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
