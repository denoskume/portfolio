#!/usr/bin/env python3
"""Build a selected, one-page, text-based Harvard-style A4 CV from cv-data.json."""
from __future__ import annotations
import json
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'cv-data.json').read_text(encoding='utf-8'))
OUT = ROOT / 'build' / DATA['pdf_filename']
OUT.parent.mkdir(parents=True, exist_ok=True)
W, H = A4
LEFT, RIGHT, TOP, BOTTOM = 43, 43, 34, 37
WIDTH = W-LEFT-RIGHT
NAVY = colors.HexColor('#122c47')
BODY = colors.HexColor('#29394a')
MUTED = colors.HexColor('#536479')
ACCENT = colors.HexColor('#1d507a')
RULE = colors.HexColor('#b8c6d3')
C = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
C.setTitle('Denos Kume | Harvard-Style Curriculum Vitae')
C.setAuthor(DATA['name'])
C.setSubject('Internship CV - Data Science, Computer Vision, Image Processing and Data Analysis')
TEXT = ParagraphStyle('text', fontName='Helvetica', fontSize=9.2, leading=13.0,
                      textColor=BODY, alignment=TA_LEFT, spaceAfter=0)
SMALL = ParagraphStyle('small', parent=TEXT, fontSize=9.0, leading=12.3)
BULLET = ParagraphStyle('bullet', parent=TEXT, fontSize=9.0, leading=12.2)


def para(text, style, x, y, width, after=0):
    p = Paragraph(escape(text), style)
    _, h = p.wrap(width, H)
    p.drawOn(C, x, y-h)
    return y-h-after


def headline(text, y, size, color, font='Helvetica'):
    assert stringWidth(text, font, size) <= WIDTH, f'Centered headline exceeds printable width: {text}'
    C.setFont(font, size)
    C.setFillColor(color)
    C.drawCentredString(W/2, y, text)


def section(title, y):
    y -= 12.2
    C.setFont('Helvetica-Bold', 9.55)
    C.setFillColor(ACCENT)
    C.drawString(LEFT, y, title.upper())
    C.setStrokeColor(RULE)
    C.setLineWidth(.62)
    C.line(LEFT, y-5.2, W-RIGHT, y-5.2)
    return y-16.0


def entry(row, y, after=5.5):
    dates = row['dates']
    size = 9.25
    title = row['title']
    date_width = stringWidth(dates, 'Helvetica', 8.35)
    assert stringWidth(title, 'Helvetica-Bold', size) <= WIDTH-date_width-18, f'CV title overflows: {title}'
    C.setFont('Helvetica-Bold', size)
    C.setFillColor(NAVY)
    C.drawString(LEFT, y-9.6, title)
    C.setFillColor(MUTED)
    C.setFont('Helvetica', 8.35)
    C.drawRightString(W-RIGHT, y-9.6, dates)
    y -= 14.0
    y = para(row['organization'], SMALL, LEFT, y, WIDTH, after=3)
    for bullet in row.get('bullets', []):
        C.setFillColor(ACCENT)
        C.circle(LEFT+4.5, y-6.6, 1.3, fill=1, stroke=0)
        y = para(bullet, BULLET, LEFT+15, y, WIDTH-15, after=2.0)
    return y-after


y = H-TOP
headline(DATA['name'].upper(), y-16, 20.2, NAVY, 'Helvetica-Bold')
y -= 27
headline(DATA['headline'], y-7, 9.5, MUTED)
y -= 17
headline(DATA['direction'], y-8, 10.25, ACCENT, 'Helvetica-Bold')
y -= 20

# Two centered contact lines, each link retained as clickable PDF annotation.
for links in (DATA['contact'][:2], DATA['contact'][2:]):
    divider='  |  '
    text=divider.join(item['label'] for item in links)
    size=8.15
    full=stringWidth(text,'Helvetica',size)
    assert full < WIDTH, f'Contact line exceeds page width: {text}'
    x=(W-full)/2
    for idx, item in enumerate(links):
        label=item['label']
        w=stringWidth(label,'Helvetica',size)
        C.setFont('Helvetica',size)
        C.setFillColor(ACCENT if item['url'] else MUTED)
        C.drawString(x,y-6.8,label)
        if item['url']:
            C.linkURL(item['url'],(x,y-8,x+w,y+2),relative=0,thickness=0)
        x += w
        if idx < len(links)-1:
            C.setFillColor(MUTED)
            C.drawString(x,y-6.8,divider)
            x += stringWidth(divider,'Helvetica',size)
    y -= 13

y -= 7
C.setStrokeColor(ACCENT)
C.setLineWidth(.95)
C.line(LEFT,y,W-RIGHT,y)

y=section('Profile',y)
y=para(DATA['profile'],TEXT,LEFT,y,WIDTH,after=2)

y=section('Education',y)
for row in DATA['education']:
    y=entry(row,y,after=5)

y=section('Selected Technical Projects',y)
for proj in DATA['projects']:
    C.setFont('Helvetica-Bold',9.25)
    C.setFillColor(NAVY)
    C.drawString(LEFT,y-9.3,proj['title'])
    y -= 13
    y=para(proj['details'],SMALL,LEFT,y,WIDTH,after=8)

y=section('Professional Experience',y)
for row in DATA['experience']:
    y=entry(row,y,after=5)

y=section('Technical Skills',y)
for row in DATA['technical_skills']:
    p=Paragraph(f'<b>{escape(row["category"])}:</b> {escape(row["items"])}',SMALL)
    _,h=p.wrap(WIDTH,H)
    p.drawOn(C,LEFT,y-h)
    y -= h+3

y=section('Languages',y)
y=para(DATA['languages'].replace(' | ','  |  '),SMALL,LEFT,y,WIDTH)
if y<BOTTOM:
    raise RuntimeError(f'Content overflow: last baseline {y:.1f} pt < {BOTTOM} pt bottom margin')
C.save()
print(f'Generated {OUT} | A4 | one page | bottom {y:.1f} pt | {OUT.stat().st_size} bytes')
