"""Audit original UCI Online Retail workbook, without modifying observations.
Source: Chen (2015), DOI 10.24432/C5BW33, CC BY 4.0.
Usage: python audit_retail.py "Online Retail.xlsx"
Dependencies: pandas, openpyxl, Python 3.10+.
"""
import sys
import pandas as pd
import json
import hashlib
from pathlib import Path

p = Path(sys.argv[1])
df = pd.read_excel(p, engine="openpyxl")
required = ["InvoiceNo","StockCode","InvoiceDate","Quantity","UnitPrice","Country"]
missing_required = df[required].isna().any(axis=1)
duplicate = df.duplicated()
negative_price = df.UnitPrice.lt(0)
cancel = df.InvoiceNo.astype(str).str.upper().str.startswith("C")
flags = pd.DataFrame({"candidate_missing_core":missing_required,
                      "candidate_negative_price":negative_price,
                      "candidate_exact_repeat":duplicate})
report = {"sha256":hashlib.sha256(p.read_bytes()).hexdigest(),
          "rows":len(df),"columns":list(df.columns),
          "missing_by_column":df.isna().sum().to_dict(),
          "exact_repeated_rows":int(duplicate.sum()),
          "negative_price_rows":int(negative_price.sum()),
          "zero_price_rows":int(df.UnitPrice.eq(0).sum()),
          "negative_quantity_rows":int(df.Quantity.lt(0).sum()),
          "cancellation_rows":int(cancel.sum()),
          "candidate_rule_counts":flags.sum().to_dict(),
          "candidate_union":int(flags.any(axis=1).sum())}
print(json.dumps(report, indent=2))
Path("retail_audit.json").write_text(json.dumps(report, indent=2))
# Hypothetical replay: a proposed gate flags core omissions and negative prices.
# These are policy candidates, not verified errors; duplicates are review-only.
gate = missing_required | negative_price
df.loc[gate].to_csv("retail_review_queue.csv",index=False)
print("Gate flags:", int(gate.sum()))
print("No records corrected or deleted; no ground truth or source controls available.")
