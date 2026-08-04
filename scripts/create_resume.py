from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'Shaikh-Zeeshan-Resume.pdf'
output.parent.mkdir(parents=True, exist_ok=True)

navy = colors.HexColor('#050816')
ink = colors.HexColor('#111827')
muted = colors.HexColor('#64748B')
violet = colors.HexColor('#635BDB')
line = colors.HexColor('#D9E0EC')

doc = SimpleDocTemplate(
    str(output), pagesize=A4, rightMargin=19 * mm, leftMargin=19 * mm,
    topMargin=17 * mm, bottomMargin=15 * mm,
)
styles = getSampleStyleSheet()
name = ParagraphStyle('name', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=25, leading=29, textColor=navy, spaceAfter=3)
role = ParagraphStyle('role', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=15, textColor=violet, spaceAfter=8)
body = ParagraphStyle('body', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14.5, textColor=ink, spaceAfter=8)
meta = ParagraphStyle('meta', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=muted)
section = ParagraphStyle('section', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=navy, spaceBefore=11, spaceAfter=6)
small = ParagraphStyle('small', parent=body, fontSize=8.9, leading=13, spaceAfter=4)

story = [
    Paragraph('SHAIKH ZEESHAN', name),
    Paragraph('FULL STACK MERN DEVELOPER', role),
    Paragraph('Mumbai, India &nbsp;&nbsp;|&nbsp;&nbsp; github.com/zeeshanshaikh95 &nbsp;&nbsp;|&nbsp;&nbsp; shaikhzeeshan9511@gmail.com', meta),
    Spacer(1, 8),
    Paragraph('PROFILE', section),
    Paragraph('MERN-focused developer building scalable, responsive web applications. Interested in clean user interfaces, dependable backend APIs, and the small implementation decisions that make software feel polished. Actively seeking full-time software engineering, frontend, MERN developer, and internship opportunities.', body),
    Paragraph('CORE SKILLS', section),
]

skills = [
    [Paragraph('<b>Frontend</b>', small), Paragraph('React, JavaScript, HTML5, CSS3, Tailwind CSS, responsive UI', small)],
    [Paragraph('<b>Backend</b>', small), Paragraph('Node.js, Express.js, MongoDB, REST APIs, authentication, JWT', small)],
    [Paragraph('<b>Tools</b>', small), Paragraph('Git, GitHub, Postman, VS Code, Vercel, Render, Railway', small)],
    [Paragraph('<b>Learning</b>', small), Paragraph('TypeScript, data structures and algorithms, system design', small)],
]
table = Table(skills, colWidths=[33 * mm, 130 * mm])
table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LINEBELOW', (0, 0), (-1, -1), 0.45, line),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
]))
story += [table, Paragraph('CURRENT FOCUS', section)]
story += [
    Paragraph('<b>Building MERN applications</b><br/>Shipping end-to-end personal projects to strengthen practical product and engineering skills.', small),
    Paragraph('<b>Deepening React and Node.js</b><br/>Exploring cleaner frontend architecture and scalable backend foundations.', small),
    Paragraph('<b>Strengthening problem solving</b><br/>Practicing data structures and algorithms through consistent, deliberate work.', small),
    Paragraph('WORKING STYLE', section),
    Paragraph('Curious, reliable, and detail-oriented. I enjoy breaking down real problems, collaborating thoughtfully, and turning ideas into clear, maintainable software.', body),
]

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(line)
    canvas.line(19 * mm, 11 * mm, A4[0] - 19 * mm, 11 * mm)
    canvas.setFillColor(muted)
    canvas.setFont('Helvetica', 7.5)
    canvas.drawString(19 * mm, 7 * mm, 'Shaikh Zeeshan - Full Stack MERN Developer')
    canvas.drawRightString(A4[0] - 19 * mm, 7 * mm, 'Portfolio resume')
    canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
