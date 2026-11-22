#!/usr/bin/env python3
"""Generate the fluoro PDF directly from the live Background Subtraction Report.

Keeping one narrative source means the portfolio article and downloadable
report stay synchronized whenever the experiment explanation is edited.
"""
from build_scientific_reports import build

if __name__ == "__main__":
    path = build(1, "fluoroscopy-case-study.pdf")
    print(f"Generated {path} ({path.stat().st_size} bytes)")
