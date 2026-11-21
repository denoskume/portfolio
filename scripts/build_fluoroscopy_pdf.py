#!/usr/bin/env python3
"""Build the downloadable Master 1 fluoroscopy report from documented experiment results."""
from __future__ import annotations

import csv
import io
import os
import time
import urllib.request
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable, Image, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)
from reportlab.graphics.shapes import Drawing, Circle, Line, PolyLine, String


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "build" / "fluoroscopy-case-study.pdf"
SOURCE = "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/"
PAGE_WIDTH = A4[0] - 42 * mm
BLUE = colors.HexColor("#143D5A")
INK = colors.HexColor("#17374D")
MUTED = colors.HexColor("#4F6574")
RULE = colors.HexColor("#DDE5E9")
PANEL = colors.HexColor("#F2F6F8")
GREEN = colors.HexColor("#176A4C")

def fetch_asset(path: str) -> bytes | None:
    for attempt in range(3):
        try:
            req = urllib.request.Request(SOURCE + path, headers={"User-Agent": "Centrale-Nantes-Portfolio-Report/1.0"})
            with urllib.request.urlopen(req, timeout=18) as response:
                raw = response.read()
            if raw:
                return raw
        except Exception as exc:
            print(f"Figure fetch attempt {attempt + 1} failed ({path}): {exc}")
            time.sleep(1.2 * (attempt + 1))
    return None

FONT = "Helvetica"
STYLES = {
    "title": ParagraphStyle("TitleArticle", fontName="Helvetica-Bold", fontSize=19, leading=24, textColor=INK, alignment=TA_CENTER, spaceAfter=11),
    "subtitle": ParagraphStyle("SubtitleArticle", fontName=FONT, fontSize=10.3, leading=15, textColor=MUTED, alignment=TA_CENTER, spaceAfter=11),
    "author": ParagraphStyle("AuthorArticle", fontName=FONT, fontSize=9.1, leading=12, textColor=MUTED, alignment=TA_CENTER, spaceAfter=13),
    "h1": ParagraphStyle("H1Article", fontName="Helvetica-Bold", fontSize=15.2, leading=19.5, textColor=INK, spaceBefore=17, spaceAfter=10, keepWithNext=True),
    "h2": ParagraphStyle("H2Article", fontName="Helvetica-Bold", fontSize=11.6, leading=15, textColor=BLUE, spaceBefore=12, spaceAfter=8, keepWithNext=True),
    "body": ParagraphStyle("BodyArticle", fontName=FONT, fontSize=9.9, leading=15.9, textColor=INK, spaceAfter=10),
    "caption": ParagraphStyle("CaptionArticle", fontName=FONT, fontSize=8.8, leading=13, textColor=MUTED, spaceAfter=9),
    "table": ParagraphStyle("TableArticle", fontName=FONT, fontSize=9.1, leading=13.3, textColor=INK),
    "small": ParagraphStyle("SmallArticle", fontName=FONT, fontSize=8.5, leading=12, textColor=MUTED),
}
story = []

def p(body: str):
    story.append(Paragraph(body, STYLES["body"]))

def h1(body: str):
    story.append(Paragraph(body, STYLES["h1"]))

def h2(body: str):
    story.append(Paragraph(body, STYLES["h2"]))

def figure(path: str, number: int, caption: str):
    image_bytes = fetch_asset(path)
    if image_bytes:
        from reportlab.lib.utils import ImageReader
        payload = io.BytesIO(image_bytes)
        width, height = ImageReader(payload).getSize()
        max_w, max_h = PAGE_WIDTH - 14, 85 * mm
        factor = min(max_w / width, max_h / height)
        img = Image(io.BytesIO(image_bytes), width=width * factor, height=height * factor)
        img.hAlign = "CENTER"
        story.append(KeepTogether([
            Spacer(1, 7), img, Spacer(1, 7),
            Paragraph(f"<b>Figure {number}.</b> {caption}", STYLES["caption"])
        ]))
    else:
        story.append(Paragraph(f"<b>Figure {number}.</b> {caption} (See original image in the source repository.)", STYLES["caption"]))

def table(rows, widths, header=True):
    t = Table([[Paragraph(str(value), STYLES["table"]) for value in row] for row in rows], colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LINEBELOW", (0, 0), (-1, -1), .35, RULE),
        ("BACKGROUND", (0, 0), (-1, 0), PANEL),
    ]
    if header: cmds.append(("LINEBELOW", (0, 0), (-1, 0), 1, BLUE))
    t.setStyle(TableStyle(cmds))
    story.append(t)
    story.append(Spacer(1, 10))

def load_frame_comparison():
    """Read the canonical per-frame metrics from the academic project."""
    payload = fetch_asset("frame_comparison.csv")
    if not payload:
        raise RuntimeError("Cannot build an accurate PDF without frame_comparison.csv")
    reader = csv.DictReader(io.StringIO(payload.decode("utf-8-sig")))
    required = {"frame", "baseline_dice", "new_dice", "new_fp", "new_fn"}
    if not required.issubset(reader.fieldnames or []):
        raise ValueError("Frame comparison CSV is missing required metrics")
    rows = [
        {
            "frame": int(row["frame"]),
            "baseline_dice": float(row["baseline_dice"]),
            "new_dice": float(row["new_dice"]),
            "new_fp": int(row["new_fp"]),
            "new_fn": int(row["new_fn"]),
        }
        for row in reader
    ]
    motion = [row for row in rows if row["frame"] != 201]
    if [row["frame"] for row in motion] != list(range(211, 292, 10)):
        raise ValueError("Unexpected frame sequence in source CSV")
    return motion


def frame_chart(rows):
    """Visualize the nine motion-frame results reported in the source CSV."""
    frames = [row["frame"] for row in rows]
    old = [row["baseline_dice"] for row in rows]
    new = [row["new_dice"] for row in rows]
    width, height = PAGE_WIDTH - 15, 180
    d = Drawing(width, height)
    left, bottom, plot_w, plot_h = 37, 30, width - 52, height - 50
    for v in [0, .25, .50, .75, 1]:
        y = bottom + v * plot_h
        d.add(Line(left, y, left + plot_w, y, strokeColor=RULE, strokeWidth=.6))
        d.add(String(left - 8, y - 4, f"{v:.2f}", fontSize=7, fillColor=MUTED, textAnchor="end"))
    colors_for = [colors.HexColor("#A7864A"), colors.HexColor("#18618A")]
    for values, color in zip([old, new], colors_for):
        points = []
        for i, score in enumerate(values):
            x = left + i * plot_w / (len(rows) - 1)
            y = bottom + score * plot_h
            points.extend([x, y])
            d.add(Circle(x, y, 2.7, fillColor=color, strokeColor=colors.white, strokeWidth=.6))
        d.add(PolyLine(points, strokeColor=color, strokeWidth=2, fillColor=None))
    for i, label in enumerate(frames):
        d.add(String(left + i * plot_w / (len(rows) - 1), bottom - 14, str(label), fontSize=7, fillColor=MUTED, textAnchor="middle"))
    story.append(d)
    story.append(Paragraph("Figure 4. Dice score by motion frame. Earlier prediction (brown) vs continuous trace (blue). Source: frame_comparison.csv.", STYLES["caption"]))


def footer(canvas, doc):
    canvas.saveState()
    w, _=A4
    canvas.setStrokeColor(RULE)
    canvas.line(21*mm,17*mm,w-21*mm,17*mm)
    canvas.setFont("Helvetica",8)
    canvas.setFillColor(MUTED)
    canvas.drawString(21*mm,12.4*mm,"Microcatheter segmentation in fluoroscopy | Master 1 project")
    canvas.drawRightString(w-21*mm,12.4*mm,f"Page {doc.page}")
    canvas.restoreState()

def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    frame_rows = load_frame_comparison()
    doc=SimpleDocTemplate(str(OUTPUT),pagesize=A4,rightMargin=21*mm,leftMargin=21*mm,topMargin=19*mm,bottomMargin=24*mm,title="Microcatheter segmentation in fluoroscopy | Master 1 report",author="Denos Kume and Oluwole Shokunbi",subject="Academic image-processing project at Centrale Nantes")
    story.append(Paragraph("Microcatheter segmentation in fluoroscopy",STYLES["title"]))
    story.append(Paragraph("Can we detect a thin instrument in noisy X-ray images and reconstruct its full path accurately?",STYLES["subtitle"]))
    story.append(Paragraph("Denos Kume and Oluwole Shokunbi | Master 1 project | Centrale Nantes",STYLES["author"]))
    story.append(HRFlowable(width="100%",thickness=1,color=RULE))
    h1("Abstract")
    p("This Master 1 image-processing project investigates guidewire and microcatheter segmentation in fluoroscopic X-ray images. We compared background-subtraction methods against manual references and explored continuous-path reconstruction to reduce fragmented predictions. On nine motion frames from a supplied sequence, mean Dice increased from <b>0.501 to 0.876</b>. The results demonstrate improvement on this sequence rather than robustness across independent acquisitions.")
    h2("Keywords")
    p("Computer Vision | Image Processing | Fluoroscopy | Background Subtraction | Segmentation | ExtraTrees | Dice | Path Reconstruction")
    h2("Project information")
    table([
        ["Type","Master 1 academic project"],
        ["Institution","Centrale Nantes | MSc Control & Robotics"],
        ["Authors","Denos Kume and Oluwole Shokunbi"],
        ["Dataset","10 grayscale frames, 512 x 512 pixels, 20 manual tracings"],
    ],[108,PAGE_WIDTH-108],header=False)

    h2("Nomenclature")
    p("Key terms used throughout this image-processing project.")
    terms = [
        ("Computer Vision (CV)", "Methods that enable computers to extract useful information from images and video."),
        ("Image Processing", "Operations used to enhance, filter, transform or analyse digital images."),
        ("Fluoroscopy", "X-ray imaging that produces a sequence of frames. This project analyses an existing sequence offline."),
        ("Guidewire", "A thin, flexible wire used to guide devices through a vessel; one of the instruments traced in the images."),
        ("Microcatheter", "A small, flexible catheter that can be navigated over a guidewire; another instrument of interest in the images."),
        ("Background Subtraction", "Comparing a frame with a reference background to highlight image regions that have changed."),
        ("Segmentation / Binary Mask", "Separating instrument pixels from background pixels. A binary mask records the predicted class at each pixel."),
        ("Manual Annotation (Reference Mask)", "An instrument tracing made by a person and converted into a mask for comparison with predictions."),
        ("ExtraTrees", "Extremely Randomized Trees: a supervised ensemble of decision trees used here to score candidate instrument pixels."),
        ("Dice Score", "An overlap measure between predicted and reference masks, ranging from 0 (no overlap) to 1 (perfect overlap)."),
        ("IoU (Intersection over Union)", "The area shared by the predicted and reference instrument masks divided by the area covered by either mask."),
        ("PSNR (Peak Signal-to-Noise Ratio)", "A decibel measure of pixel-level agreement derived from mean squared error; it can be misleading for sparse instruments."),
        ("Continuous-Path Reconstruction", "Connecting candidate instrument pixels into a single plausible line to reduce gaps in the predicted trace."),
    ]
    for term, definition in terms:
        story.append(KeepTogether([
            Paragraph(f"<b>{escape(term)}</b>", STYLES["body"]),
            Paragraph(escape(definition), STYLES["body"]),
            Spacer(1, 3),
        ]))

    h1("1.0 Introduction")
    p("Fluoroscopy produces sequences of X-ray images where thin instruments must be distinguished from anatomical structures. Low contrast, image noise and similar-looking edges can make straightforward segmentation unreliable. Background subtraction highlights changes, but nearly stationary shaft segments may be missed while unrelated anatomical edges are retained.")
    p("Our question was whether a conventional segmentation pipeline could identify the instrument, and whether a connected-path constraint could improve the continuity and accuracy of its reconstruction.")
    figure("assets/grayscale-comparison.png",1,"Original and contrast-enhanced fluoroscopy image, frame 291.")

    h1("2.0 Dataset and project objectives")
    h2("2.1 Dataset")
    p("The supplied sequence contains ten grayscale images of 512 x 512 pixels, with twenty manual tracings forming evaluation references. Frame 201 is the background reference. The reported method comparisons use motion frames 211-291.")
    h2("2.2 Objective")
    p("Detect instrument pixels, produce a complete connected trace, export predicted masks and measure overlap with the manual reference.")
    h2("2.3 Requirements")
    p("Enhance and preprocess frames; implement fixed-threshold, Otsu and two-component Gaussian-mixture segmentation; export instrument masks; and compare Dice, IoU, PSNR and visual errors. The later connected-path method was assessed for path continuity and improvements in overlap. No predefined minimum Dice score appears in the repository.")

    h1("3.0 Methodology")
    h2("3.1 Preprocessing and classical segmentation")
    p("We enhanced image contrast, reduced noise and compared frames with the reference image. Thresholding and Gaussian-mixture methods then generated candidate instrument masks.")
    story.append(Paragraph("<b>Table 1.</b> Classical segmentation performance on the nine motion frames, before connected-path reconstruction.",STYLES["caption"]))
    table([
        ["Method","Dice","IoU","PSNR"],
        ["Fixed threshold (0.10)","0.416","0.280","16.57 dB"],
        ["Otsu threshold","0.412","0.295","13.95 dB"],
        ["Gaussian mixture","0.385","0.249","15.30 dB"],
    ],[PAGE_WIDTH*.45,PAGE_WIDTH*.17,PAGE_WIDTH*.16,PAGE_WIDTH*.22])
    h2("3.2 Continuous-path reconstruction")
    p("The earlier predictions often contained false detections or gaps. A supervised ExtraTrees model estimated candidate pixel scores from dark-line appearance and temporal changes. A path-search step connected these candidates into one centerline, assuming lower-border instrument entry for this sequence.")
    figure("assets/mask-cleanup.png",2,"Previous mask, reconstructed continuous trace and manual reference for frame 291.")

    h1("4.0 Experimental results")
    h2("4.1 Segmentation overlap")
    p("Dice is an overlap measure from 0 (none) to 1 (perfect). Across nine motion frames, mean Dice rose from <b>0.501 to 0.876</b> for the continuous reconstruction, a gain of <b>+0.375 Dice points</b>.")
    table([["Previous prediction","Continuous trace","Dice gain"],["0.501","0.876","+0.375"]],[PAGE_WIDTH/3]*3)
    figure("assets/segmentation-comparison.png",3,"All ten reconstructed instrument traces in chronological order, with Dice scores.")
    frame_chart(frame_rows)
    h2("4.2 Frame-by-frame results")
    p("Table 2 reports all nine motion frames used in the comparison. Higher Dice means greater overlap; false-positive and missed pixels describe errors in the final continuous trace.")
    table(
        [["Frame", "Earlier Dice", "Continuous Dice", "False positives", "Missed pixels"]]
        + [
            [
                str(row["frame"]),
                f'{row["baseline_dice"]:.3f}',
                f'{row["new_dice"]:.3f}',
                str(row["new_fp"]),
                str(row["new_fn"]),
            ]
            for row in frame_rows
        ],
        [PAGE_WIDTH*.14, PAGE_WIDTH*.19, PAGE_WIDTH*.22, PAGE_WIDTH*.24, PAGE_WIDTH*.21],
    )
    h2("4.3 Error reduction")
    table([
        ["Error type","Earlier prediction","Continuous trace"],
        ["False-positive pixels","22,472","3,553"],
        ["Missed instrument pixels","5,240","2,511"],
    ],[PAGE_WIDTH*.38,PAGE_WIDTH*.31,PAGE_WIDTH*.31])
    p("The final reconstruction formed one connected component in every frame.")

    h1("5.0 Discussion and conclusion")
    h2("5.1 Did the experiment meet its objectives?")
    p("<b>Yes, within the supplied academic image sequence.</b> The project produced instrument masks, compared them against manual references and achieved stronger connected predictions, supported by Dice and error counts.")
    h2("5.2 Why the method improved")
    p("Reconstructing a connected path reduced the missing segments left by independent pixel detections and helped preserve the instrument's overall shape.")
    h2("5.3 Limitations")
    p("The results come from one acquisition; model settings were explored within that sequence and the path method assumes lower-edge instrument entry. Independent image sequences with different viewpoints and motion remain to be tested.")
    h2("Source and reproducibility")
    p('<link href="https://github.com/denoskume/Background-Subtraction-Fluoroscopy" color="#165A83">github.com/denoskume/Background-Subtraction-Fluoroscopy</link>')
    p("The repository includes the executed notebook, experimental figures, frame-level CSV scores and output masks. No public license file is included in the repository.")

    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    print(f"Generated {OUTPUT} ({OUTPUT.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
