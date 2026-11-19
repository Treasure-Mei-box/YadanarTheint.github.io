#!/usr/bin/env python3
"""Generate assets/Yadanar_Theint_CV.pdf — a clean, printable curriculum vitae
for Yadanar Theint, a Data Science student at INTI International College Subang
(Malaysia).

Zero-dependency generator: writes a single-page PDF using the built-in
Helvetica Type1 fonts (no font embedding needed) and a hand-rolled PDF writer,
plus a clickable mailto link on the email address.

Run:  python3 tools/generate_cv.py
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "Yadanar_Theint_CV.pdf"


def pdf_escape(text: str) -> str:
    """Escape text for use inside a PDF literal string used with Tj."""
    return text.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


class Page:
    """A blank PDF page holding positioned text lines and link annotations."""

    def __init__(self, width: int = 595, height: int = 842):
        self.width = width
        self.height = height
        self.lines = []   # (x, y, size, bold, text)
        self.annots = []  # (x, y, x2, y2, uri)

    def text(self, x, y, size, text, bold=False):
        self.lines.append((x, y, size, bold, text))

    def link(self, x, y, x2, y2, uri):
        self.annots.append((x, y, x2, y2, uri))


def build_content(page: Page) -> bytes:
    parts = []
    for (x, y, size, bold, text) in page.lines:
        font = "/F2" if bold else "/F1"
        parts.append(f"BT {font} {size} Tf {x} {y} Td ({pdf_escape(text)}) Tj ET")
    return "\n".join(parts).encode("ascii")


def build_page_dict(content_obj: int, page: Page) -> bytes:
    annots = [
        f"<< /Type /Annot /Subtype /Link /Rect [{x} {y} {x2} {y2}] "
        f"/Border [0 0 0] /A << /S /URI /URI ({pdf_escape(uri)}) >> >>"
        for (x, y, x2, y2, uri) in page.annots
    ]
    annots_str = f"/Annots [{' '.join(annots)}] " if annots else ""
    return (
        f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {page.width} {page.height}] "
        f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> {annots_str}"
        f"/Contents {content_obj} 0 R >>"
    ).encode("ascii")


def build_pdf(pages) -> bytes:
    objs = {}
    objs[1] = b"<< /Type /Catalog /Pages 2 0 R >>"
    objs[3] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    objs[4] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"

    next_num = 5
    page_nums = []
    for page in pages:
        page_num = next_num
        next_num += 1
        content_num = next_num
        next_num += 1
        content = build_content(page)
        objs[content_num] = (
            f"<< /Length {len(content)} >>\nstream\n".encode("ascii")
            + content
            + b"\nendstream"
        )
        objs[page_num] = build_page_dict(content_num, page)
        page_nums.append(page_num)

    objs[2] = (
        "<< /Type /Pages /Kids ["
        + " ".join(f"{n} 0 R" for n in page_nums)
        + f"] /Count {len(page_nums)} >>"
    ).encode("ascii")

    size = next_num
    header = b"%PDF-1.4\n"
    body = b""
    offsets = {}
    for num in sorted(objs):
        offsets[num] = len(header) + len(body)
        body += f"{num} 0 obj\n".encode("ascii") + objs[num] + b"\nendobj\n"
    xref_pos = len(header) + len(body)
    xref = f"xref\n0 {size}\n0000000000 65535 f \n"
    for num in range(1, size):
        xref += f"{offsets[num]:010d} 00000 n \n"
    trailer = (
        f"trailer\n<< /Size {size} /Root 1 0 R >>\n"
        f"startxref\n{xref_pos}\n%%EOF\n"
    )
    return header + body + xref.encode("ascii") + trailer.encode("ascii")


def generate_cv() -> bytes:
    page = Page()
    L = page.text

    L(60, 800, 22, "YADANAR THEINT", bold=True)
    L(60, 778, 12, "Student - Data & AI")
    L(60, 768, 10, "B.CompSc (Data Science) - INTI International College Subang")
    L(60, 758, 10, "(collaboration with Swinburne University of Technology), Malaysia")
    page.link(60, 748, 60 + 200, 748, "mailto:yadanartheint2412@gmail.com")
    L(60, 748, 10, "Email: yadanartheint2412@gmail.com")
    L(60, 738, 10, "LinkedIn: linkedin.in/yadanar-theint")
    L(60, 728, 10, "GitHub: github.com/Treasure-Mei-box")

    L(60, 716, 13, "PERSONAL DETAILS", bold=True)
    L(60, 696, 10, "Name: Yadanar Theint")
    L(60, 686, 10, "Student: B.CompSc (Data Science) - INTI International College Subang, Malaysia")
    L(60, 676, 10, "Career goal: Graduate / internship roles in data and AI")
    L(60, 660, 10, "Interests: data analysis & analytics, data visualization, data engineering,")
    L(60, 650, 10, "  mathematics & statistics, machine learning, education & global collaboration")
    L(60, 634, 10, "Background: Founder of IntrospectMyanmar - Global Educational Services,")
    L(60, 624, 10, "  education consultancy helping students pursue global opportunities")

    L(60, 606, 13, "EDUCATION", bold=True)
    L(60, 586, 10, "B.CompSc (Data Science) - INTI International College Subang (Malaysia), Class of 2027")
    L(60, 576, 10, "  Collaboration with Swinburne University of Technology (Australia)")
    L(60, 562, 10, "  Coursework: statistics, SQL, data analysis & visualization, mathematics and")
    L(60, 548, 10, "  software engineering; lab courses (COS30045 Data Visualization, COS30049")
    L(60, 534, 10, "  Data & AI projects, COS20007 OOP, COS30015 coursework, COS30019 AI)")

    L(60, 516, 13, "SKILLS", bold=True)
    L(60, 496, 10, "Languages: Python, JavaScript, C#, SQL")
    L(60, 480, 10, "Data & AI: data analysis, data visualization (D3.js), statistics,")
    L(60, 466, 10, "  machine learning concepts")
    L(60, 450, 10, "Web: HTML5, CSS3, JavaScript")
    L(60, 434, 10, "Tools: Git, GitHub, GitHub Actions, VS Code")
    L(60, 418, 10, "DevOps: CI/CD pipelines (GitHub Actions), automated deployment with GitHub")
    L(60, 404, 10, "  Pages, Azure App Service deployment experience")
    L(60, 388, 10, "Technologies: pandas, matplotlib, Jupyter, Random Forest, DBSCAN, XGBoost")

    L(60, 370, 13, "PROJECTS", bold=True)
    L(60, 350, 10, "ASEAN Health Statistics Visualization (COS30045, Swinburne UTS)")
    L(60, 334, 9, "  Interactive data visualization of ASEAN health statistics: life expectancy,")
    L(60, 320, 9, "  birth rates and population demographics. Data sources: OECD Health Statistics,")
    L(60, 306, 9, "  Statista, Macrotrends, World Bank, ASEAN Data. D3.js, with Shin Thant Thi Ri.")
    L(60, 286, 10, "Air Quality Analytics (COS30049)")
    L(60, 272, 9, "  Reproducible data pipeline for cross-country air quality analytics across Malaysia,")
    L(60, 258, 9, "  Singapore and Thailand (2014-2024). Random Forest regression/classification,")
    L(60, 244, 9, "  DBSCAN clustering. pandas.")
    L(60, 228, 10, "Online Convenience Store System (SWE40006)")
    L(60, 214, 9, "  Python web app for an online convenience store. Full CI/CD pipeline to Azure")
    L(60, 200, 9, "  App Service: GitHub Actions, Docker, GHCR, smoke tests, automatic rollback.")
    L(60, 184, 10, "Object Oriented Programming (COS20007)")
    L(60, 170, 9, "  Object-oriented programming projects and exercises in C#.")
    L(60, 154, 10, "COS30015 - Object Oriented Programming (coursework)")
    L(60, 140, 9, "  Assignment and practical project submissions with supporting materials.")

    L(60, 124, 13, "CONTACT", bold=True)
    L(60, 104, 10, "Email: yadanartheint2412@gmail.com")
    L(60, 88, 10, "LinkedIn: linkedin.in/yadanar-theint")
    L(60, 72, 10, "GitHub: github.com/Treasure-Mei-box")

    return build_pdf([page])


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    data = generate_cv()
    OUT.write_bytes(data)
    print(f"Wrote {OUT} ({len(data)} bytes)")


if __name__ == "__main__":
    main()
