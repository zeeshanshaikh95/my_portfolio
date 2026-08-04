from pathlib import Path
import pypdfium2 as pdfium

root = Path(__file__).resolve().parents[1]
pdf = pdfium.PdfDocument(root / 'public' / 'Shaikh-Zeeshan-Resume.pdf')
page = pdf[0]
image = page.render(scale=1.6).to_pil()
target = root / 'tmp' / 'resume-preview.png'
target.parent.mkdir(parents=True, exist_ok=True)
image.save(target)
print(target)
