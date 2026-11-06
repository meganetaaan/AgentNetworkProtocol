"""Extract original PDF/PPTX text and page evidence without changing binaries."""

import hashlib
import json
from pathlib import Path
import re
import sys
import zipfile

import pymupdf as fitz
from lxml import etree
from pptx import Presentation


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "japanese/assets/documents"
PREVIEWS = ROOT.parent / "document-previews"
SOURCES = [
    "blogs/ANP-Presentation-at-W3C-WebAgents-cg.pdf",
    "standard/IETF124/AI Agents Communication Use Cases and Requirements(v3)-chinatelecom.pdf",
    "standard/IETF124/Framwork for AI Agent Network-ANP.pdf",
    "standard/IETF124/Multi-Access+Collaboration+Requirements+for+AI+Agent+Protocol-chinaunicom.pdf",
    "standard/IETF124/1-Agenda.pptx",
    "standard/IETF124/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile.pptx",
]


def pdf_pages(source):
    document = fitz.open(ROOT / source)
    pages = []
    preview_dir = PREVIEWS / Path(source).stem
    preview_dir.mkdir(parents=True, exist_ok=True)
    for index, page in enumerate(document):
        text = page.get_text("text", sort=True).strip()
        image_blocks = [block for block in page.get_text("dict")["blocks"] if block["type"] == 1]
        preview = preview_dir / f"page-{index + 1:03}.png"
        page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False).save(preview)
        source_image_assets = []
        if source.startswith("blogs/") and index + 1 in (9, 10, 17):
            for image_index, block in enumerate(image_blocks):
                if block["width"] < 200:
                    continue
                image_target = OUTPUT / "source-code-images" / f"w3c-page-{index + 1:03}-image-{image_index + 1:02}.{block['ext']}"
                image_target.parent.mkdir(parents=True, exist_ok=True)
                image_target.write_bytes(block["image"])
                source_image_assets.append({"path": image_target.relative_to(ROOT).as_posix(), "sha256": hashlib.sha256(block["image"]).hexdigest(), "disposition": "original-code-and-diagram-pixels-retained-untranslated"})
        pages.append({
            "unit": index + 1,
            "kind": "page",
            "text": text,
            "text_characters": len(text),
            "embedded_images": len(image_blocks),
            "image_regions": [{"bbox": list(block["bbox"]), "width": block["width"], "height": block["height"]} for block in image_blocks],
            "hyperlinks": [link["uri"] for link in page.get_links() if link.get("uri")],
            "preview_local_reference": f"{Path(source).stem}/page-{index + 1:03}.png",
            "source_image_assets": source_image_assets,
            "ocr_candidate_sparse_text": len(text) < 30,
            "extraction_status": "text-layer-extracted" if text else "no-text-layer",
        })
    return pages


def pptx_slides(source):
    presentation = Presentation(ROOT / source)
    slides = []
    with zipfile.ZipFile(ROOT / source) as archive:
        extras = [name for name in archive.namelist() if name.startswith("ppt/diagrams/") and name.endswith(".xml")]
    for index, slide in enumerate(presentation.slides):
        paragraphs = ["".join(paragraph.xpath(".//a:t/text()")) for paragraph in slide.element.xpath(".//a:p")]
        text = "\n".join(line for line in paragraphs if line.strip())
        notes = slide.notes_slide.notes_text_frame.text.strip() if slide.has_notes_slide and slide.notes_slide.notes_text_frame else ""
        diagrams = []
        for relationship in slide.part.rels.values():
            if relationship.reltype.endswith("/diagramData"):
                xml = etree.fromstring(relationship.target_part.blob)
                diagrams.extend(xml.xpath(".//a:t/text()", namespaces={"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}))
        slides.append({
            "unit": index + 1,
            "kind": "slide",
            "text": text,
            "notes": notes,
            "diagram_text": diagrams,
            "text_characters": len(text),
            "embedded_images": sum(1 for _ in slide.element.xpath(".//p:pic")),
            "ocr_candidate_sparse_text": not bool(text),
            "extraction_status": "slide-xml-text-and-notes-extracted",
            "hyperlinks": [relationship.target_ref for relationship in slide.part.rels.values() if relationship.is_external and relationship.reltype.endswith("/hyperlink")],
        })
    return slides


def main():
    if "--check" in sys.argv:
        check_sidecars()
        return
    OUTPUT.mkdir(parents=True, exist_ok=True)
    documents = []
    for source in SOURCES:
        units = pdf_pages(source) if source.endswith(".pdf") else pptx_slides(source)
        record = {
            "source": source,
            "source_sha256": hashlib.sha256((ROOT / source).read_bytes()).hexdigest(),
            "source_base_commit": "0837cfdfaf4ddcf834f0890ddaf34fc4c824e066",
            "format": Path(source).suffix[1:],
            "units": units,
            "unit_count": len(units),
            "original_binary_unchanged": True,
            "historical_document": True,
        }
        target = OUTPUT / (source + ".extracted.json")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        documents.append(record)
        print(json.dumps({"source": source, "units": len(units), "text_characters": sum(unit["text_characters"] for unit in units), "ocr_candidates_sparse_text": [unit["unit"] for unit in units if unit["ocr_candidate_sparse_text"]]}, ensure_ascii=False))
    (OUTPUT / "extraction-index.json").write_text(json.dumps(documents, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def check_sidecars():
    """Check coverage and original preservation, without claiming visual completion."""
    checked_units = 0
    checked_notes = 0
    checked_source_images = 0
    for source in SOURCES:
        extracted = json.loads((OUTPUT / (source + ".extracted.json")).read_text(encoding="utf-8"))
        translated = json.loads((OUTPUT / (source + ".ja.json")).read_text(encoding="utf-8"))
        markdown = (OUTPUT / (source + ".ja.md")).read_text(encoding="utf-8")
        current_hash = hashlib.sha256((ROOT / source).read_bytes()).hexdigest()
        assert current_hash == extracted["source_sha256"] == translated["source_sha256"], source
        assert len(extracted["units"]) == len(translated["units"]) == extracted["unit_count"], source
        for original_unit, unit in zip(extracted["units"], translated["units"]):
            assert original_unit["unit"] == unit["unit"] and original_unit["kind"] == unit["kind"], source
            assert original_unit["text"] == unit["original_text"], source
            assert original_unit["text"] in markdown, source
            assert unit["translation"].strip() and re.search(r"[\u3040-\u30ff\u3400-\u9fff]", unit["translation"]), source
            assert set(original_unit.get("hyperlinks", [])) == set(unit["hyperlinks"]), source
            if original_unit.get("notes"):
                assert original_unit["notes"] == unit["original_notes"] and unit["notes_translation"], source
                checked_notes += 1
            for asset in unit["source_code_assets"]:
                assert hashlib.sha256((ROOT / asset["path"]).read_bytes()).hexdigest() == asset["sha256"], source
                checked_source_images += 1
            checked_units += 1
    report = {
        "documents_checked": len(SOURCES),
        "page_or_slide_units_checked": checked_units,
        "notes_checked": checked_notes,
        "source_image_assets_checked": checked_source_images,
        "original_binary_hashes_match": True,
        "complete_extracted_text_preserved": True,
        "page_or_slide_translation_coverage": "all-extracted-text-units",
        "full_visual_translation_verification": "not-claimed-see-documents-inventory",
        "verification_scope": "coverage-source-hashes-source-text-links-notes-image-hashes-not-independent-semantic-review",
    }
    (OUTPUT / "verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
