#!/usr/bin/env python3
"""Build a one-page, selectable-text A4 CV matching the user's supplied reference."""
from pathlib import Path
from html import escape
import json
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'cv-data.json').read_text(encoding='utf-8'))
OUT=ROOT/'build'/DATA['pdf_filename']
OUT.parent.mkdir(parents=True,exist_ok=True)
W,H=A4
LEFT,RIGHT=43,43
FULL=W-LEFT-RIGHT
NAVY=colors.HexColor('#264b70')
BLACK=colors.HexColor('#151c24')
GREY=colors.HexColor('#44515d')
RULE=colors.HexColor('#8ea9bf')
C=canvas.Canvas(str(OUT),pagesize=A4,pageCompression=1)
C.setAuthor(DATA['name'])
C.setTitle(DATA['name']+' - Curriculum Vitae')
C.setSubject('Data Science | Computer Vision & Image Processing | Data Analysis')

BODY=ParagraphStyle('body',fontName='Helvetica',fontSize=8.85,leading=11.8,textColor=BLACK,spaceAfter=0)
SHORT=ParagraphStyle('short',parent=BODY,fontSize=8.65,leading=11.4)
BUL=ParagraphStyle('bullet',parent=BODY,fontSize=8.8,leading=11.5)

def txt(text,x,y,width=FULL,style=BODY,after=0,raw=False):
    p=Paragraph(text if raw else escape(text),style)
    _,ht=p.wrap(width,H)
    p.drawOn(C,x,y-ht)
    return y-ht-after

def center(text,y,size=9,font='Helvetica',color=BLACK):
    assert stringWidth(text,font,size)<FULL+2,(text,stringWidth(text,font,size))
    C.setFont(font,size)
    C.setFillColor(color)
    C.drawCentredString(W/2,y,text)

def heading(name,y):
    y-=10.0
    C.setFont('Helvetica-Bold',9.75)
    C.setFillColor(NAVY)
    C.drawString(LEFT,y,name.upper())
    C.setStrokeColor(RULE)
    C.setLineWidth(0.55)
    C.line(LEFT,y-4.4,W-RIGHT,y-4.4)
    return y-7.8

def heading_row(text,dates,y):
    y-=10.0
    sz=9.05
    if stringWidth(text,'Helvetica-Bold',sz)>FULL-stringWidth(dates,'Helvetica',8.4)-13:
        raise RuntimeError('Entry headline too long: '+text)
    C.setFont('Helvetica-Bold',sz)
    C.setFillColor(BLACK)
    C.drawString(LEFT,y,text)
    C.setFont('Helvetica',8.3)
    C.drawRightString(W-RIGHT,y,dates)
    return y-3.0

def line_with_bold(label,value,y):
    return txt(f'<b>{escape(label)}</b>: {escape(value)}',LEFT,y,raw=True,style=SHORT,after=0.65)

def bullet(sentence,y):
    C.setFillColor(BLACK)
    C.circle(LEFT+2.2,y-5.6,1.15,stroke=0,fill=1)
    if ':' in sentence[:25]:
        key, rest = sentence.split(':', 1)
        return txt(f'<b>{escape(key)}:</b>{escape(rest)}',LEFT+12,y,FULL-12,style=BUL,after=0.8,raw=True)
    return txt(sentence,LEFT+12,y,FULL-12,style=BUL,after=0.8)

def links_on_line(items,y,size=8.55):
    sep='  |  '
    full=sep.join(t['label'] for t in items)
    x=(W-stringWidth(full,'Helvetica',size))/2
    for i,t in enumerate(items):
        label=t['label']
        width=stringWidth(label,'Helvetica',size)
        C.setFont('Helvetica',size)
        C.setFillColor(BLACK)
        C.drawString(x,y,label)
        if t['url']:
            C.linkURL(t['url'],(x,y-1,x+width,y+size+2),relative=0,thickness=0)
        x+=width
        if i<len(items)-1:
            C.drawString(x,y,sep)
            x+=stringWidth(sep,'Helvetica',size)

y=H-30
center(DATA['name'],y,19.0,'Helvetica-Bold',NAVY)
y-=19.5
center(DATA['academic_headline'],y,9.4,'Helvetica',NAVY)
y-=12.0
center(DATA['career_headline'],y,10.2,'Helvetica-Bold',NAVY)
y-=13.0
links_on_line(DATA['contact'],y,8.65)
y-=12.5
links_on_line(DATA['social'],y,8.6)
y-=13.5

y=heading('Profile',y)
profile_html=escape(DATA['profile']).replace('six-month internship from February 2027','<b>six-month internship from February 2027</b>')
y=txt(profile_html,LEFT,y,after=1.0,raw=True)
y=heading('Education',y)
for e in DATA['education']:
    y=heading_row(e['school'],e['dates'],y)
    track = f"{e['track_label']}: {e['track']}"
    location = e['location']
    location_width = stringWidth(location,'Helvetica',8.55)
    assert stringWidth(track,'Helvetica',8.55)+location_width+15 < FULL, 'Education track overlaps location'
    C.setFillColor(BLACK)
    C.setFont('Helvetica',8.55)
    C.drawString(LEFT,y-9.4,track)
    C.drawRightString(W-RIGHT,y-9.4,location)
    y-=12.0
    y=txt(e['description'],LEFT,y,style=SHORT,after=0.75)
    y=txt('<b>Relevant coursework:</b> '+escape(e['courses']).replace(' | ', ' &#8226; '),LEFT,y,style=SHORT,raw=True,after=3.2)

y=heading('Experience',y)
for e in DATA['experience']:
    y=heading_row(e['title'],e['dates'],y)
    y=txt(e['summary'],LEFT,y,style=SHORT,after=1.1)
    for b in e['bullets']:
        y=bullet(b,y)
    y-=2.6

y=heading('Selected projects',y)
for e in DATA['projects']:
    y=heading_row(e['title'],e['dates'],y)
    y=txt(e['summary'],LEFT,y,style=SHORT,after=1.0)
    for b in e['bullets']:
        y=bullet(b,y)
    y-=2.8

y=heading('Technical skills',y)
for e in DATA['skills']:
    y=line_with_bold(e['label'],e['value'],y)
y=heading('Languages & interests',y)
y=line_with_bold('Languages',DATA['languages'],y)
y=line_with_bold('Interests',DATA['interests'],y)
if y<36:
    raise RuntimeError(f'CV contents overflow bottom margin: {y:.2f} pt')
C.save()
print(f'{OUT} A4 | one page | final y={y:.1f}pt | bytes={OUT.stat().st_size}')
