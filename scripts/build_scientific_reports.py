#!/usr/bin/env python3
"""Build real, illustrated A4 PDFs from the live case-study Report HTML.

The website's case studies are the single source for prose, figures, tables,
and results. GitHub Actions runs the JS renderer in Node, then produces PDFs
using ReportLab so Save PDF always downloads a genuine file.
"""
from __future__ import annotations

import html
import io
import re
import subprocess
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup, Tag
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable, Image, KeepTogether, Paragraph, SimpleDocTemplate,
    Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "build"
DEST.mkdir(parents=True, exist_ok=True)
RAW_COL = colors.HexColor("#123b5a")
INK = colors.HexColor("#233e51")
TEXT = colors.HexColor("#30495b")
MUTED = colors.HexColor("#647b8a")
RULE = colors.HexColor("#d6e2e8")
PAPER = colors.HexColor("#f2f7fa")
PAGE_W, PAGE_H = A4
WIDTH = PAGE_W - 36 * mm
FONT = "Helvetica"
FONT_BOLD = "Helvetica-Bold"

try:
    normal = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
    bold = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
    if normal.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("DejaVu", str(normal)))
        pdfmetrics.registerFont(TTFont("DejaVuBold", str(bold)))
        pdfmetrics.registerFontFamily("DejaVu", normal="DejaVu", bold="DejaVuBold",
                                     italic="DejaVu", boldItalic="DejaVuBold")
        FONT = "DejaVu"
        FONT_BOLD = "DejaVuBold"
except Exception as exc:
    print(f"System font unavailable, using built-in PDF fonts: {exc}")

styles = {
    "title": ParagraphStyle("Title", fontName=FONT_BOLD, fontSize=19, leading=28,
                            textColor=RAW_COL, spaceAfter=11),
    "question": ParagraphStyle("Question", fontName=FONT, fontSize=11, leading=17,
                               textColor=MUTED, spaceAfter=8),
    "author": ParagraphStyle("Author", fontName=FONT, fontSize=8.6, leading=14,
                             textColor=MUTED, spaceAfter=16),
    "h2": ParagraphStyle("H2", fontName=FONT_BOLD, fontSize=13.2, leading=19,
                         textColor=RAW_COL, spaceBefore=15, spaceAfter=8, keepWithNext=True),
    "h3": ParagraphStyle("H3", fontName=FONT_BOLD, fontSize=10.3, leading=16,
                         textColor=RAW_COL, spaceBefore=12, spaceAfter=6, keepWithNext=True),
    "body": ParagraphStyle("Body", fontName=FONT, fontSize=9.2, leading=15.3,
                           textColor=TEXT, spaceAfter=9),
    "caption": ParagraphStyle("Caption", fontName=FONT, fontSize=8.1, leading=13.5,
                              textColor=MUTED, spaceAfter=15, spaceBefore=5),
    "small": ParagraphStyle("Small", fontName=FONT, fontSize=8.2, leading=12.6,
                            textColor=TEXT, spaceAfter=6),
    "tablehead": ParagraphStyle("TableHead", fontName=FONT_BOLD, fontSize=7.8, leading=11,
                                textColor=RAW_COL),
    "tablecell": ParagraphStyle("TableCell", fontName=FONT, fontSize=7.5, leading=11.5,
                                textColor=TEXT),
}

def text_of(node: Tag) -> str:
    return " ".join(node.get_text(" ", strip=True).split())

def paragraph(text: str, style: str = "body") -> Paragraph:
    safe = html.escape(text, quote=False)
    return Paragraph(safe, styles[style])

def table_for(rows: list[list[str]], header: bool = True) -> Table:
    if not rows:
        return Table([[""]])
    cols = len(rows[0])
    if cols == 2:
        widths = [WIDTH * .45, WIDTH * .55]
    elif cols == 3:
        widths = [WIDTH * .41, WIDTH * .295, WIDTH * .295]
    elif cols == 4:
        widths = [WIDTH * .31] + [WIDTH * .23] * 3
    else:
        widths = [WIDTH / cols] * cols
    normalized = [
        [paragraph(str(cell), "tablehead" if header and index == 0 else "tablecell")
         for cell in row]
        for index, row in enumerate(rows)
    ]
    out = Table(normalized, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, 0), .7, RULE),
        ("LINEBELOW", (0, 1), (-1, -1), .35, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]
    if header:
        cmds += [("BACKGROUND", (0, 0), (-1, 0), PAPER)]
    out.setStyle(TableStyle(cmds))
    return out

def add_figure(fig: Tag, story: list) -> None:
    img = fig.find("img")
    caption = fig.find("figcaption")
    if img and img.get("src", "").startswith("https://raw.githubusercontent.com/"):
        try:
            req = urllib.request.Request(img["src"], headers={"User-Agent": "PortfolioReportBuilder/1.0"})
            with urllib.request.urlopen(req, timeout=25) as response:
                data = response.read(4_000_000)
            if img["src"].lower().split("?")[0].endswith(".svg"):
                import cairosvg
                # Convert vector diagrams into PDF-compatible raster images
                # at high resolution while retaining their source geometry.
                data = cairosvg.svg2png(bytestring=data, output_width=1600)
            from PIL import Image as PILImage
            with PILImage.open(io.BytesIO(data)) as photo:
                w, h = photo.size
            image = Image(io.BytesIO(data))
            image.drawWidth = min(WIDTH, w * .75)
            image.drawHeight = image.drawWidth * h / w
            if image.drawHeight > 95 * mm:
                multiplier = (95 * mm) / image.drawHeight
                image.drawWidth *= multiplier
                image.drawHeight *= multiplier
            image.hAlign = "CENTER"
            story.append(image)
        except Exception as exc:
            print(f"Image could not be embedded: {img['src']} ({exc})")
            story.append(paragraph("Original figure: " + img["src"], "small"))
    if caption:
        story.append(paragraph(text_of(caption), "caption"))

def add_section(section: Tag, story: list) -> None:
    # Walk in document order; process only outermost semantic blocks.
    blocks = {"h2", "h3", "p", "ul", "ol", "figure", "table", "dl"}
    custom = {"fl-info-table", "fl-facts", "fl-keywords", "fl-method-steps"}
    for node in section.descendants:
        if not isinstance(node, Tag):
            continue
        if node.name not in blocks and not any(cls in custom for cls in node.get("class", [])):
            continue
        ancestors = list(node.parents)
        if any(isinstance(parent, Tag) and parent is not section and
               (parent.name in blocks or any(c in custom for c in parent.get("class", [])))
               for parent in ancestors):
            continue
        if node.name == "h2":
            story.append(paragraph(text_of(node), "h2"))
        elif node.name == "h3":
            story.append(paragraph(text_of(node), "h3"))
        elif node.name == "p":
            if node.find_parent("figcaption"):
                continue
            story.append(paragraph(text_of(node), "body"))
        elif node.name in {"ul", "ol"}:
            for index, li in enumerate(node.find_all("li", recursive=False), start=1):
                if node.name == "ol":
                    # Keep the bibliography numbers and live, clickable source links.
                    citation = li.find("span")
                    reference = text_of(citation) if citation else text_of(li)
                    source_link = li.find("a", href=True)
                    url = source_link.get("href", "") if source_link else ""
                    if url.startswith("https://"):
                        link_markup = (
                            ' <link href="' + html.escape(url, quote=True) +
                            '" color="#185e9c"><u>' +
                            html.escape(text_of(source_link), quote=False) +
                            '</u></link>'
                        )
                    else:
                        link_markup = ""
                    markup = (
                        "<b>[" + str(index) + "]</b> " +
                        html.escape(reference, quote=False) + link_markup
                    )
                    story.append(Paragraph(markup, styles["small"]))
                else:
                    story.append(paragraph("• " + text_of(li), "small"))
            story.append(Spacer(1, 7))
        elif node.name == "figure":
            add_figure(node, story)
        elif node.name == "table":
            rows = [[text_of(cell) for cell in tr.find_all(["th", "td"], recursive=False)]
                    for tr in node.select("tr")]
            if rows and len(set(map(len, rows))) == 1:
                story.append(table_for(rows))
                story.append(Spacer(1, 11))
        elif node.name == "dl":
            for item in node.find_all("div", recursive=False):
                dt = item.find("dt")
                dd = item.find("dd")
                if dt and dd:
                    story.append(paragraph(text_of(dt) + " — " + text_of(dd), "small"))
        elif "fl-info-table" in node.get("class", []):
            rows = []
            for item in node.select('[role="row"]'):
                rows.append([text_of(item.find(attrs={"role": "rowheader"})),
                             text_of(item.find(attrs={"role": "cell"}))])
            if rows:
                story.append(table_for(rows, header=False))
                story.append(Spacer(1, 9))
        elif "fl-keywords" in node.get("class", []):
            story.append(paragraph(" • ".join(text_of(x) for x in node.find_all("span")), "small"))
        elif "fl-facts" in node.get("class", []):
            rows = [[text_of(x) for x in item.find_all(["strong", "span"])]
                    for item in node.find_all("div", recursive=False)]
            story.append(paragraph("  |  ".join(" ".join(row) for row in rows), "small"))
        elif "fl-method-steps" in node.get("class", []):
            story.append(paragraph("  →  ".join(text_of(x) for x in node.find_all("span")), "small"))

def page_decoration(canvas, doc) -> None:
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.line(18 * mm, 16 * mm, PAGE_W - 18 * mm, 16 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 7.5)
    canvas.drawString(18 * mm, 11.3 * mm, "Denos Kume · Academic project report")
    canvas.drawRightString(PAGE_W - 18 * mm, 11.3 * mm, str(doc.page))
    canvas.restoreState()

def build(study_id: int, filename: str) -> Path:
    if study_id == 1:
        # Render the same HTML as the live Background Subtraction Report.
        js = (
            "global.window = globalThis;"
            "require('./fluoroscopy-case-study.js');"
            "process.stdout.write(window.renderFluoroCaseStudy());"
        )
    else:
        js = (
            "global.window = globalThis;"
            "require('./scientific-case-studies.js');"
            "require('./software-case-studies.js');"
            f"process.stdout.write(window.renderScientificCaseStudy({study_id}));"
        )
    result = subprocess.run(["node", "-e", js], cwd=ROOT,
                            capture_output=True, text=True, check=True)
    soup = BeautifulSoup(result.stdout, "html.parser")
    root = soup.select_one("article.scientific-study, article.fluoro-study")
    panel = root.select_one('[data-sc-panel="report"]') if root else None
    if not root or not panel:
        raise RuntimeError(f"Case study {study_id}: no report content generated")
    story = []
    story.append(paragraph(text_of(root.find("h1")), "title"))
    story.append(paragraph(text_of(root.select_one(".fl-paper-question")), "question"))
    author_line = root.select_one(".fl-paper-authors")
    if author_line:
        story.append(paragraph(text_of(author_line), "author"))
    story.append(HRFlowable(width="100%", thickness=1, color=RULE, spaceAfter=12))
    for section in panel.select("section.fl-paper-section"):
        add_section(section, story)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=.6, color=RULE, spaceAfter=8))
    story.append(paragraph("Source files, raw figures and numeric results: see the GitHub repository linked in Project information.", "small"))
    path = DEST / filename
    document = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18 * mm,
                                 rightMargin=18 * mm, topMargin=16 * mm,
                                 bottomMargin=22 * mm, title=text_of(root.find("h1")),
                                 author="Denos Kume", creator="Portfolio academic case-study report")
    document.build(story, onFirstPage=page_decoration, onLaterPages=page_decoration)
    return path

if __name__ == "__main__":
    for ident, filename in [(1, "fluoroscopy-case-study.pdf"),
                            (2, "camera-calibration-case-study.pdf"),
                            (3, "clap-zero-shot-case-study.pdf"),
                            (4, "flag-intelligence-case-study.pdf"),
                            (5, "python-cardgame-case-study.pdf"),
                            (6, "monstage-case-study.pdf"),
                            (7, "visionlab-case-study.pdf")]:
        path = build(ident, filename)
        print(f"Built {path.name}: {path.stat().st_size} bytes")
