"""Inventory prose inside preserved Markdown examples; never execute an example."""
from pathlib import Path
import hashlib
import json
import re
import runpy

ROOT = Path(__file__).resolve().parents[1]
helpers = runpy.run_path(str(ROOT / "scripts/inventory-prose-assets.py"), run_name="extraction_helpers")
structured = helpers["collect_structured"]
python = helpers["collect_python"]
generic = helpers["collect_code_heuristic"]
prose = helpers["prose"]
yaml = helpers["yaml"]


def mermaid(text):
    units = []
    for number, line in enumerate(text.splitlines(), 1):
        candidates = []
        for pattern in (r'\bparticipant\s+\S+\s+as\s+(.+)', r'\b(?:Note|note)\s+(?:over|left of|right of)\s+[^:]+:\s*(.+)', r'^\s*(?:alt|else|opt|loop|par|and|rect)\s+(.+)', r'\bsubgraph\s+"([^"]+)"', r'\bsubgraph\s+[^\[]*\[([^\]]+)\]', r'\["?([^\[\]]+?)"?\]', r'\|([^|]+)\|'):
            candidates.extend(match[1].strip('"') for match in re.finditer(pattern, line))
        arrow = re.match(r'^\s*\w+\s*(?:-->>|->>|-->|->|--x|--\))\s*[+-]?\w+\s*:\s*(.+)', line)
        if arrow:
            candidates.append(arrow[1])
        for value in dict.fromkeys(candidates):
            if prose(value):
                units.append({"locator": "line:" + str(number), "kind": "diagram-label", "original": value})
    return units


def main():
    docs = json.loads((ROOT / "japanese/translation-inventory.json").read_text(encoding="utf-8"))["documents"]
    code = json.loads((ROOT / "japanese/assets/code-translations.json").read_text(encoding="utf-8"))
    reuse = {}
    for item in code["units"]:
        reuse.setdefault(item["original"], []).append(item)
    glossary_path = ROOT / "japanese/assets/images/svg-ja-glossary.tsv"
    if glossary_path.exists():
        for index, line in enumerate(glossary_path.read_text(encoding="utf-8").splitlines(), 1):
            if "\t" in line:
                original, translation = line.split("\t", 1)
                reuse.setdefault(original, []).append({"id": "svg-glossary-line:" + str(index), "translation": translation})
    blocks, units = [], []
    for doc in docs:
        source = doc["source"]
        lines = (ROOT / source).read_text(encoding="utf-8").splitlines()
        current = None
        for number, line in enumerate(lines, 1):
            fence = re.match(r'^(\s*(?:>\s*)*)\s*(`{3,}|~{3,})\s*(\S*)', line)
            if current is None and fence:
                current = {"start": number, "delimiter": fence[2][0], "length": len(fence[2]), "quote_depth": fence[1].count(">"), "language": fence[3], "lines": []}
            elif current is not None and fence and fence[2][0] == current["delimiter"] and len(fence[2]) >= current["length"] and not fence[3]:
                text = "\n".join(current["lines"])
                lang = current["language"].lower()
                found, method = [], "no extractor for language"
                try:
                    if lang in {"json", "jsonc"}:
                        found = structured(json.loads(text)); method = "JSON human fields"
                    elif lang in {"yaml", "yml"}:
                        found = structured(yaml.safe_load(text)); method = "safe YAML human fields"
                    elif lang in {"python", "py"}:
                        found = python(text); method = "Python AST/comments"
                    elif lang == "mermaid":
                        found = mermaid(text); method = "Mermaid label inventory"
                    else:
                        found = generic(text, lang); method = "heuristic strings/comments"
                except Exception as error:
                    found = generic(text, lang); method = "heuristic fallback; " + type(error).__name__
                block = {"source": source, "source_start": current["start"], "source_end": number, "language": current["language"], "rendered_code_sha256": hashlib.sha256(text.encode()).hexdigest(), "extraction": method, "candidate_units": len(found), "completeness_review": "pending"}
                blocks.append(block)
                seen = set()
                for item in found:
                    identity = item["locator"] + "\0" + item["original"]
                    if identity in seen:
                        continue
                    seen.add(identity)
                    item["locator"] = f"fence:{current['start']}-{number}/" + item["locator"]
                    item["source"] = source
                    item["language"] = current["language"]
                    item["id"] = hashlib.sha256((source + "\0" + item["locator"] + "\0" + item["original"]).encode()).hexdigest()[:20]
                    matches = reuse.get(item["original"], [])
                    translations = {entry["translation"] for entry in matches}
                    if len(translations) == 1:
                        item["translation"] = matches[0]["translation"]
                        item["status"] = "exact-text-translation-reused-needs-context-review"
                        item["reuse_from_ids"] = [entry["id"] for entry in matches]
                    else:
                        item["translation"] = None
                        item["status"] = "pending-human-translation"
                    units.append(item)
                current = None
            elif current is not None:
                content = line
                for unused in range(current["quote_depth"]):
                    content = re.sub(r'^\s*> ?', '', content, count=1)
                current["lines"].append(content)
        if current is not None:
            blocks.append({"source": source, "source_start": current["start"], "source_end": len(lines), "language": current["language"], "extraction": "unclosed-source-fence", "completeness_review": "source-markup-defect-needs-manual-inspection"})
    target = ROOT / "japanese/assets/fenced-prose-inventory.json"
    target.write_text(json.dumps({"source_commit": "0837cfdfaf4ddcf834f0890ddaf34fc4c824e066", "policy": "Original fenced examples remain unchanged; prose translations are non-executable sidecars. Extraction and exact-text reuse are not semantic completion.", "blocks": blocks, "units": units}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"fenced_blocks": len(blocks), "prose_candidates": len(units), "exact_text_reused": sum(item["translation"] is not None for item in units), "unique_texts": len({item["original"] for item in units})}))


if __name__ == "__main__":
    main()
