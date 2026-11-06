"""Optional localhost-only offline translation backend; models stay outside Git.

Requires ctranslate2 and sentencepiece in a dedicated uv environment. Download the
Argos en_ja 1.1 and zh_en 1.9 archives into ../ja-models beforehand. No API calls.
"""
import hashlib
import json
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from zipfile import ZipFile

import ctranslate2
import sentencepiece

ROOT = Path(__file__).resolve().parents[2] / "ja-models"
EXPECTED = {"en-ja": "16300cc4eaa85320520cabcf433b63d01be40ef6966251de72043a083408f716", "zh-en": "62e7af5a3a48b530e47b7b3e5c78c2de79073ecd815750d2bf3ab35b4a67da2d"}
for name in ("en-ja", "zh-en"):
    archive = ROOT / (name + ".argosmodel")
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    if digest != EXPECTED[name]:
        raise ValueError("Translation model archive digest mismatch: " + name)
    target = ROOT / name
    if not target.exists():
        target.mkdir()
        with ZipFile(archive) as package:
            for member in package.infolist():
                destination = (target / member.filename).resolve()
                if not destination.is_relative_to(target.resolve()):
                    raise ValueError("Unsafe archive member")
            package.extractall(target)
    print(json.dumps({"model": name, "archive_sha256": digest}), flush=True)


class Model:
    def __init__(self, name):
        directory = next((ROOT / name).glob("*/metadata.json")).parent
        self.tokenizer = sentencepiece.SentencePieceProcessor(model_file=str(directory / "sentencepiece.model"))
        self.translator = ctranslate2.Translator(str(directory / "model"), device="cpu", compute_type="int8", inter_threads=1, intra_threads=4)

    def translate(self, texts):
        encoded = [self.tokenizer.encode(text, out_type=str) for text in texts]
        results = self.translator.translate_batch(encoded, beam_size=1, max_batch_size=32, batch_type="examples", max_input_length=0, max_decoding_length=2048, repetition_penalty=1.1)
        return [self.tokenizer.decode(result.hypotheses[0]) for result in results]


en_ja, zh_en = Model("en-ja"), Model("zh-en")
marker = re.compile(r"(⟦[PLS]\d{5}⟧)")


def translate(text):
    parts = marker.split(text)
    positions, texts, chinese = [], [], []
    for index, part in enumerate(parts):
        if marker.fullmatch(part) or not re.search(r"[A-Za-z\u3400-\u9fff]", part):
            continue
        # Sentence splitting keeps long source lines below the model token window.
        sentences = re.split(r"(?<=[。！？])|(?<=[.!?])\s+|\n", part)
        for sentence in sentences:
            stripped = sentence.strip()
            if not stripped:
                continue
            positions.append(index)
            texts.append(stripped)
            chinese.append(bool(re.search(r"[\u3400-\u9fff]", stripped)))
    chinese_indices = [i for i, value in enumerate(chinese) if value]
    if chinese_indices:
        english = zh_en.translate([texts[i] for i in chinese_indices])
        for index, value in zip(chinese_indices, english):
            texts[index] = value
    japanese = en_ja.translate(texts) if texts else []
    by_part = {}
    for index, value in zip(positions, japanese):
        by_part.setdefault(index, []).append(value)
    for index, values in by_part.items():
        original = parts[index]
        parts[index] = re.match(r"^\s*", original)[0] + " ".join(values) + re.search(r"\s*$", original)[0]
    return "".join(parts)


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length < 100000:
                raise ValueError("Invalid request size")
            payload = json.loads(self.rfile.read(length))
            output = json.dumps({"translation": translate(payload["text"])}, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(output)))
            self.end_headers()
            self.wfile.write(output)
        except Exception as error:
            self.send_error(500, str(error))

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    print("Offline translation ready at http://127.0.0.1:18761", flush=True)
    class Server(ThreadingHTTPServer):
        request_queue_size = 64
        daemon_threads = True
    Server(("127.0.0.1", 18761), Handler).serve_forever()
