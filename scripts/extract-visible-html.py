"""Extract saved document text without executing scripts or loading resources."""
from html.parser import HTMLParser
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "references/did_web-method-specification.html"
TARGET = ROOT / "japanese/assets/texts/references/did-web-extracted.json"


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.parts = []
        self.skip = 0
        self.body = 0
        self.sections = []
        self.pre_blocks = []
        self.pre_parts = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        ident = attributes.get("id", "")
        ignored = tag in {"head", "script", "style", "noscript", "svg", "iframe", "template"} or bool(re.match(r"(?:monica|cici|tongyi|immersive-translate|chrome-extension)", ident))
        if tag == "body":
            self.body += 1
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append((tag, ignored))
            self.skip += int(ignored)
        if ident and tag == "section":
            self.sections.append(ident)
        if self.body and not self.skip:
            if tag == "pre":
                self.pre_parts = []
            if tag in {"p", "li", "dt", "dd", "div", "section", "pre", "tr"} or re.fullmatch(r"h[1-6]", tag):
                self.parts.append("\n")
            if tag == "br":
                self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag == "pre" and self.pre_parts is not None:
            self.pre_blocks.append("".join(self.pre_parts))
            self.pre_parts = None
        if self.body and not self.skip and tag in {"p", "li", "dt", "dd", "div", "section", "pre", "tr"}:
            self.parts.append("\n")
        if any(item[0] == tag for item in self.stack):
            while self.stack:
                found, ignored = self.stack.pop()
                self.skip -= int(ignored)
                if found == tag:
                    break
        if tag == "body":
            self.body = max(0, self.body - 1)

    def handle_data(self, data):
        if self.body and not self.skip:
            self.parts.append(data)
            if self.pre_parts is not None:
                self.pre_parts.append(data)


if __name__ == "__main__":
    raw = SOURCE.read_bytes()
    parser = TextExtractor()
    parser.feed(raw.decode("utf-8"))
    text = re.sub(r"\n[\t ]*\n(?:[\t ]*\n)+", "\n\n", "".join(parser.parts)).strip()
    result = {"source": SOURCE.relative_to(ROOT).as_posix(), "source_sha256": hashlib.sha256(raw).hexdigest(), "method": "static HTMLParser; scripts/styles/iframes and identified saved-browser extension UI excluded; no execution/network", "section_ids": parser.sections, "text": text, "pre_blocks": parser.pre_blocks}
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"characters": len(text), "sections": parser.sections, "target": TARGET.relative_to(ROOT).as_posix()}, ensure_ascii=False))
