#!/usr/bin/env python3
"""Generate a one-page ATS-readable Harvard-style CV from cv-data.json.

The website preview and the downloadable PDF use the same JSON source.
PDF text uses real, selectable text (not a screenshot or browser printing).
"""
from __future__ import annotations

import json
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'cv-data.json').read_text(encoding='utf-8'))
OUT = ROOT / 'build' / DATA['pdf_filename']
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
LEFT, RIGHT, TOP, BOTTOM = 43, 43, 39, 38
WIDTH = PAGE_W - LEFT - RIGHT
INK = colors.HexColor('#12243b')
TEXT = colors.HexColor('#2d3b4e')
SUBTLE = colors.HexColor('#516276')
RULE = colors.HexColor('#aebac8')
ACCENT = colors.HexColor('#173c65')

PDF = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
PDF.setTitle('Denos Kume | Harvard-style Curriculum Vitae')
PDF.setAuthor(DATA['name'])
PDF.setSubject('One-page CV | Data Science, Computer Vision, Image Processing')

NORMAL = ParagraphStyle('normal', fontName='Helvetica', fontSize=8.75, leading=13.0,
                        textColor=TEXT, alignment=TA_LEFT, spaceAfter=0,
                        allowWidows=0, allowOrphans=0)
BULLET = ParagraphStyle('bullet', parent=NORMAL, fontSize=8.65, leading=12.6)
SMALL = ParagraphStyle('small', parent=NORMAL, fontSize=8.55, leading=12.2)


def paragraph_text(text: str, style: ParagraphStyle, x: float, y_top: float,
                   avail_width: float, after: float = 0) -> float:
    """Draw a selectable PDF text paragraph and return the next top baseline."""
    p = Paragraph(escape(text), style)
    _, height = p.wrap(avail_width, PAGE_H)
    p.drawOn(PDF, x, y_top - height)
    return y_top - height - after


def fit_text(text: str, max_width: float, font: str = 'Helvetica', size: float = 8.2) -> str:
    if stringWidth(text, font, size) <= max_width:
        return text
    while text and stringWidth(text + '…', font, size) > max_width:
        text = text[:-1]
    return text + '…'


def section(title: str, y: float) -> float:
    y -= 11
    PDF.setFont('Helvetica-Bold', 9.25)
    PDF.setFillColor(ACCENT)
    PDF.drawString(LEFT, y, title.upper())
    PDF.setStrokeColor(RULE)
    PDF.setLineWidth(0.6)
    PDF.line(LEFT, y - 4.5, PAGE_W - RIGHT, y - 4.5)
    return y - 14.5


def item(row: dict, y: float, pad: float = 5) -> float:
    date = row['dates']
    date_width = stringWidth(date, 'Helvetica', 8)
    title = fit_text(row['title'], WIDTH - date_width - 16, 'Helvetica-Bold', 9)
    PDF.setFillColor(INK)
    PDF.setFont('Helvetica-Bold', 9)
    PDF.drawString(LEFT, y - 8.9, title)
    PDF.setFont('Helvetica', 8)
    PDF.setFillColor(SUBTLE)
    PDF.drawRightString(PAGE_W - RIGHT, y - 8.9, date)
    y -= 12.5
    y = paragraph_text(row['organization'], SMALL, LEFT, y, WIDTH, after=3)
    for bullet in row.get('bullets', []):
        PDF.setFillColor(ACCENT)
        PDF.circle(LEFT + 4, y - 5.5, 1.45, fill=1, stroke=0)
        y = paragraph_text(bullet, BULLET, LEFT + 14, y, WIDTH - 14, after=2.5)
    return y - pad


# Modern academic Harvard style: one column, no images, icons, or ATS-unreadable tables.
y = PAGE_H - TOP
PDF.setFillColor(INK)
PDF.setFont('Helvetica-Bold', 19.5)
PDF.drawCentredString(PAGE_W / 2, y - 17, DATA['name'].upper())
y -= 26
PDF.setFont('Helvetica', 9.1)
PDF.setFillColor(SUBTLE)
PDF.drawCentredString(PAGE_W / 2, y - 10, DATA['headline'])
y -= 18

contacts = DATA['contact']
for links in (contacts[:2], contacts[2:]):
    full = '  |  '.join(x['label'] for x in links)
    font_size = 8.0
    PDF.setFont('Helvetica', font_size)
    PDF.setFillColor(ACCENT)
    x = (PAGE_W - stringWidth(full, 'Helvetica', font_size)) / 2
    for idx, link in enumerate(links):
        label = link['label']
        width = stringWidth(label, 'Helvetica', font_size)
        PDF.drawString(x, y - 7.5, label)
        if link['url']:
            PDF.linkURL(link['url'], (x, y - 9, x + width, y + 1.5),
                        relative=0, thickness=0)
        x += width
        if idx < len(links) - 1:
            divider = '  |  '
            PDF.setFillColor(SUBTLE)
            PDF.drawString(x, y - 7.5, divider)
            x += stringWidth(divider, 'Helvetica', font_size)
            PDF.setFillColor(ACCENT)
    y -= 12.4

y -= 7
PDF.setStrokeColor(ACCENT)
PDF.setLineWidth(0.9)
PDF.line(LEFT, y, PAGE_W - RIGHT, y)

y = section('Profile', y)
y = paragraph_text(DATA['profile'], NORMAL, LEFT, y, WIDTH, after=1)

y = section('Education', y)
for row in DATA['education']:
    y = item(row, y, pad=3.0 if not row['bullets'] else 5)

y = section('Professional experience', y)
for row in DATA['experience']:
    y = item(row, y, pad=4)

y = section('Technical skills', y)
for row in DATA['technical_skills']:
    p = Paragraph(f"<b>{escape(row['category'])}:</b> {escape(row['items'])}", SMALL)
    _, height = p.wrap(WIDTH, PAGE_H)
    p.drawOn(PDF, LEFT, y - height)
    y -= height + 2.2

y = section('Selected projects', y)
for row in DATA['projects']:
    PDF.setFont('Helvetica-Bold', 8.55)
    PDF.setFillColor(INK)
    PDF.drawString(LEFT, y - 8, row['title'])
    y -= 11.8
    y = paragraph_text(row['details'], SMALL, LEFT, y, WIDTH, after=5)

y = section('Languages', y)
y = paragraph_text(DATA['languages'].replace(' | ', '  |  '), SMALL, LEFT, y, WIDTH)

if y < BOTTOM:
    raise RuntimeError(f"Harvard CV overflow: content ended at {y:.1f} pt, bottom margin {BOTTOM} pt")
PDF.save()
print(f'Generated {OUT} | one A4 page | content bottom {y:.1f} pt | {OUT.stat().st_size} bytes')
