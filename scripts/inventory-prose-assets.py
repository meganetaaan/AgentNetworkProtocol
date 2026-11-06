"""Inventory original non-Markdown prose without editing executable/wire files.

Extraction is deliberately labeled heuristic for code strings; a zero count is
not automatically a human finding that a source file contains no prose.
"""
from pathlib import Path
import ast
import hashlib
import io
import json
import re
import tokenize

import yaml

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "japanese/assets"
BASE = "0837cfdfaf4ddcf834f0890ddaf34fc4c824e066"
HUMAN_KEYS = {"name", "title", "description", "summary", "label", "placeholder", "value", "caption", "alternateName", "streetAddress", "addressLocality", "addressRegion", "text", "message", "comment", "comments", "note", "notes", "purpose", "reason", "expected", "invariant", "scenario", "about"}


def sha(value):
    return hashlib.sha256(value).hexdigest()


def prose(value):
    if not isinstance(value, str) or not value.strip():
        return False
    if re.match(r"^(?:https?|did|urn|data):", value) or re.fullmatch(r"[A-Za-z0-9_./:#@+*=-]+", value):
        return False
    return bool(re.search(r"[\u3400-\u9fff\u3040-\u30ff]", value) or re.search(r"[A-Za-z]+[ \t]+[A-Za-z]+", value))


def collect_structured(value, pointer="", key=""):
    result = []
    if isinstance(value, dict):
        for name, item in value.items():
            escaped = str(name).replace("~", "~0").replace("/", "~1")
            result.extend(collect_structured(item, pointer + "/" + escaped, str(name)))
    elif isinstance(value, list):
        for index, item in enumerate(value):
            result.extend(collect_structured(item, pointer + "/" + str(index), key))
    elif key in HUMAN_KEYS and prose(value):
        result.append({"locator": pointer, "kind": "structured-human-string", "original": value})
    return result


def collect_python(text):
    result = []
    for item in tokenize.generate_tokens(io.StringIO(text).readline):
        if item.type == tokenize.COMMENT and prose(item.string.lstrip("# ")):
            result.append({"locator": "line:" + str(item.start[0]), "kind": "comment", "original": item.string.lstrip("# ")})
    tree = ast.parse(text)
    for node in ast.walk(tree):
        if isinstance(node, ast.Constant) and isinstance(node.value, str) and prose(node.value):
            result.append({"locator": "line:" + str(getattr(node, "lineno", 1)), "kind": "python-string-candidate", "original": node.value})
        if isinstance(node, (ast.Module, ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            doc = ast.get_docstring(node, clean=False)
            if doc:
                result.append({"locator": "line:" + str(getattr(node, "lineno", 1)), "kind": "docstring", "original": doc})
        if isinstance(node, ast.Call):
            callee = ast.get_source_segment(text, node.func) or ""
            if re.search(r"(?:print|Error|Exception|warning|error|info|debug|log)$", callee):
                for arg in node.args:
                    if isinstance(arg, ast.Constant) and prose(arg.value):
                        result.append({"locator": "line:" + str(arg.lineno), "kind": "runtime-message", "original": arg.value})
                    elif isinstance(arg, ast.JoinedStr):
                        value = ast.get_source_segment(text, arg)
                        if value:
                            result.append({"locator": "line:" + str(arg.lineno), "kind": "runtime-template", "original": value})
    return result


def collect_code_heuristic(text, extension):
    result = []
    for number, line in enumerate(text.splitlines(), 1):
        stripped = line.strip()
        if stripped.startswith(("//", "#", "/*", "*")) and prose(stripped.lstrip("/*# ")):
            result.append({"locator": "line:" + str(number), "kind": "comment", "original": stripped.lstrip("/*# ").rstrip("*/ ")})
        # Runtime diagnostics, test names, and natural-language literal values.
        for match in re.finditer(r"([\"'`])((?:\\.|(?!\1).)*?)\1", line):
            value = match[2]
            if prose(value):
                result.append({"locator": "line:" + str(number) + ":column:" + str(match.start() + 1), "kind": "code-string-candidate", "original": value})
    return result


def main():
    inventory = json.loads((ROOT / "japanese/translation-inventory.json").read_text(encoding="utf-8"))
    files = [item["source"] for item in inventory["retained_non_markdown_files"]]
    records, units = [], []
    for source in files:
        raw = (ROOT / source).read_bytes()
        ext = Path(source).suffix.lower()
        record = {"source": source, "source_commit": BASE, "source_sha256": sha(raw), "bytes": len(raw), "extension": ext, "original_retained": True}
        if ext in {".png", ".jpg", ".jpeg", ".svg", ".gif", ".webp"}:
            record.update(category="image", delegated_inventory="japanese/assets/images-inventory.json")
        elif ext in {".pdf", ".pptx"}:
            record.update(category="paged-document", delegated_inventory="japanese/assets/documents-inventory.json")
        elif source == "LICENSE":
            record.update(category="license", sidecar="japanese/assets/texts/LICENSE.ja.md", status="agent-full-translation")
        elif source == ".gitignore":
            record.update(category="machine-configuration", status="not-prose", reason="Literal ignore patterns are operational data, retained verbatim.")
        elif not ext and raw.lstrip().startswith(b"#"):
            record.update(category="extensionless-prose", sidecar="japanese/assets/texts/" + source + ".ja.md", status="agent-full-translation" if (OUT / "texts" / (source + ".ja.md")).exists() else "pending")
        elif ext == ".html":
            record.update(category="saved-html-document", sidecar="japanese/assets/texts/references/did-web-method-specification.ja.md", status="agent-full-visible-document-translation", excluded="Embedded scripts/styles/browser-extension UI are not protocol prose and are not executed.")
        elif ext in {".mmd", ".txt"}:
            sidecar = "japanese/assets/diagrams/" + source.replace(".mmd", ".ja.mmd") if ext == ".mmd" else "japanese/assets/texts/" + source.replace(".txt", ".ja.md")
            record.update(category="text-diagram", sidecar=sidecar, status="agent-full-label-translation" if (ROOT / sidecar).exists() else "pending")
        else:
            text = raw.decode("utf-8")
            found = []
            try:
                if ext == ".json":
                    found = collect_structured(json.loads(text))
                    method = "JSON parse and human-facing field allowlist; wire keys and cryptographic material excluded"
                elif ext in {".yaml", ".yml"}:
                    found = collect_structured(yaml.safe_load(text))
                    method = "YAML safe parse and human-facing field allowlist; no configuration execution"
                elif ext == ".py":
                    found = collect_python(text)
                    method = "Python tokenize and AST only; no source execution"
                else:
                    found = collect_code_heuristic(text, ext)
                    method = "Heuristic comment/string extraction; requires human completeness review"
            except Exception as error:
                method = "extraction-failed: " + type(error).__name__
            seen = set()
            found = [item for item in found if not ((item["locator"], item["original"]) in seen or seen.add((item["locator"], item["original"])))]
            for item in found:
                item["source"] = source
                item["id"] = sha((source + "\0" + item["locator"] + "\0" + item["original"]).encode("utf-8"))[:20]
                item["translation"] = None
                item["status"] = "pending-human-translation"
            units.extend(found)
            record.update(category="code-or-structured-data", extraction=method, candidate_units=len(found), completeness_review="pending", translation_status="pending" if found else "no-candidates-not-yet-human-confirmed")
        records.append(record)
    OUT.mkdir(parents=True, exist_ok=True)
    payload = {"source_commit": BASE, "scope": "all 266 baseline non-Markdown files; code extraction is a candidate inventory, not a completion claim", "original_files": len(records), "files": records}
    (OUT / "non-markdown-inventory.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "code-prose-candidates.json").write_text(json.dumps({"source_commit": BASE, "units": units}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"non_markdown_files": len(records), "code_prose_candidates": len(units), "code_files": sum(r["category"] == "code-or-structured-data" for r in records)}))


if __name__ == "__main__":
    main()
