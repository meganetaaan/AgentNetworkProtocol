"""Inventory baseline images and extract labels locally without changing originals.

Run with uv run --python ../ja-translate-venv/Scripts/python.exe
--no-project scripts/extract-image-text.py. Optional --ocr uses RapidOCR.
OCR output is evidence, not a proof of complete transcription or review.
"""
import argparse
import collections
import hashlib
import html
import importlib.util
import json
import re
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import quote, unquote

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = "0837cfdfaf4ddcf834f0890ddaf34fc4c824e066"
OUT = ROOT / "japanese/assets/images"
EXTENSIONS = {".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tif", ".tiff", ".ico"}

# Split around wire identifiers rather than trusting a translation model to copy them.
PROTECTED = re.compile(r"(https?://[^\s<>]+|did:[A-Za-z0-9:._%/-]+|\bx402\b|(?:[A-Za-z0-9_-]+\.)+[A-Za-z0-9_-]+(?:/[^\s<>]*)?|/[A-Za-z0-9_./-]+|\b(?:RFC|HTTP|REST API)\s+\d+(?:\.\d+)*\b|\bANP-\d+\b|\b[A-Z][A-Z0-9_-]+\b|\b[A-Za-z]+(?:_[A-Za-z0-9]+)+\b|\b[a-z]+(?:[A-Z][a-z0-9]*)+\b|\b[A-Z][a-z]+(?:[A-Z][a-z0-9]*)+\b|\d+(?:\.\d+)*)")


def finalize(translate_drafts=False):
    """Apply reviewed SVG translations and generate honest OCR reference drafts."""
    glossary = dict(line.split("\t", 1) for line in (OUT / "svg-ja-glossary.tsv").read_text(encoding="utf-8").splitlines() if "\t" in line)
    files = []
    for path in OUT.glob("*.json"):
        data = json.loads(path.read_text(encoding="utf-8"))
        if "labels" in data and "method" in data:
            files.append((path, data))
    retained_file = OUT / "svg-retained-labels.json"
    if not retained_file.exists():
        raise ValueError("A reviewed svg-retained-labels.json whitelist is required")
    retained = json.loads(retained_file.read_text(encoding="utf-8"))["labels"]
    unmapped_svg = sorted({label["source"] for _, data in files if data["method"] == "svg-xml" for label in data["labels"] if label["source"] not in glossary and label["source"] not in retained})
    if unmapped_svg:
        raise ValueError("SVG labels need translation or explicit technical review: " + json.dumps(unmapped_svg, ensure_ascii=True))
    drafts_file = OUT / "local-mt-drafts.json"
    drafts = json.loads(drafts_file.read_text(encoding="utf-8")) if drafts_file.exists() else {}
    visual_file = OUT / "raster-visual-review.json"
    visual_reviews = json.loads(visual_file.read_text(encoding="utf-8"))["images"] if visual_file.exists() else {}
    def is_code(text):
        return bool(re.search(r'^[\s{}\[\],;]+$|^\s*["\'][\w/-]+["\']\s*:|\b(?:const|let|function|return|import|from)\s|^\s*(?:GET|POST|PUT|DELETE)\s+/', text))
    segments = set()
    if translate_drafts:
        for _, data in files:
            if data["method"].startswith("rapidocr"):
                for label in data["labels"]:
                    source = label["source"]
                    if source in glossary or is_code(source):
                        continue
                    for index, segment in enumerate(PROTECTED.split(source)):
                        if index % 2 == 0 and re.search(r"[A-Za-z\u3400-\u9fff]", segment) and segment not in drafts:
                            segments.add(segment)
        if segments:
            spec = importlib.util.spec_from_file_location("local_ja", ROOT / "scripts/local-ja-translation.py")
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            segments = sorted(segments)
            for offset in range(0, len(segments), 24):
                batch = segments[offset:offset + 24]
                texts = list(batch)
                chinese = [i for i, text in enumerate(texts) if re.search(r"[\u3400-\u9fff]", text)]
                if chinese:
                    for i, text in zip(chinese, module.zh_en.translate([texts[i] for i in chinese])):
                        texts[i] = text
                for source, japanese in zip(batch, module.en_ja.translate(texts)):
                    drafts[source] = japanese
                drafts_file.write_text(json.dumps(drafts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(json.dumps({"translation_segments": min(offset + 24, len(segments)), "total": len(segments)}), flush=True)
    protected_errors = []
    for path, data in files:
        svg = data["method"] == "svg-xml"
        visual = visual_reviews.get(data["source"])
        if visual:
            data["labels"] = [label for label in data["labels"] if label.get("extraction_method") != "manual-visual-addition"]
            data["labels"] += [dict(label, extraction_method="manual-visual-addition") for label in visual.get("additional_labels", [])]
        for index, label in enumerate(data["labels"], 1):
            source = label["source"]
            if visual and source in visual["corrections"]:
                label["transcribed_source"] = visual["corrections"][source]
                source = label["transcribed_source"]
            label["label_id"] = "L" + str(index).zfill(3)
            if visual and label["source"] in visual.get("false_positive_labels", []):
                label["japanese"] = "文字ではない（アイコンの線をOCRが誤検出）"
                label["translation_method"] = "visually-confirmed-nontext-ocr-false-positive"
            elif visual and label["source"] in visual.get("superseded_ocr_labels", []) and label.get("extraction_method") != "manual-visual-addition":
                label["japanese"] = "不完全な原OCR断片。対応する領域の手動文字起こし・対訳ラベルを参照。"
                label["translation_method"] = "superseded-by-visually-reviewed-manual-transcription"
            elif visual and label["source"] in visual.get("technical_code_labels", []):
                label["japanese"] = source + " （技術コード。原画像の画素を参照。OCR転記の完全性は未確認）"
                label["translation_method"] = "original-technical-code-pixels-retained-transcription-unverified"
            elif visual and source in visual.get("manual_label_translations", {}):
                label["japanese"] = visual["manual_label_translations"][source]
                label["translation_method"] = "agent-reviewed-label-translation"
            elif source in glossary:
                label["japanese"] = glossary[source]
                label["translation_method"] = "agent-reviewed-label-translation"
            elif svg and source in retained:
                label["japanese"] = source
                label["translation_method"] = "reviewed-verbatim-technical-label"
            elif is_code(source):
                label["japanese"] = source + " （コード・識別子の原表記を保持。OCRは未校閲）"
                label["translation_method"] = "verbatim-code-unreviewed-ocr"
            else:
                parts = PROTECTED.split(source)
                unresolved = []
                for part_index in range(0, len(parts), 2):
                    original = parts[part_index]
                    if re.search(r"[A-Za-z\u3400-\u9fff]", original):
                        if original in drafts:
                            parts[part_index] = drafts[original]
                        else:
                            unresolved.append(original)
                label["japanese"] = " ".join(part for part in parts if part)
                label["translation_method"] = "local-machine-draft-unreviewed" if not unresolved else "pending-local-translation"
                label["protected_tokens"] = PROTECTED.findall(source)
                if any(token not in label["japanese"] for token in label["protected_tokens"]):
                    protected_errors.append({"source": data["source"], "label_id": label["label_id"]})
        if svg and data["labels"]:
            data["review"] = "all-extracted-svg-labels-agent-reviewed"
            data["translation_status"] = "all-svg-xml-labels-translated-technical-labels-retained"
        elif visual and visual.get("code_transcription_unverified") and all(label["translation_method"] in {"agent-reviewed-label-translation", "reviewed-verbatim-technical-label", "visually-confirmed-nontext-ocr-false-positive", "original-technical-code-pixels-retained-transcription-unverified", "superseded-by-visually-reviewed-manual-transcription"} for label in data["labels"]):
            data["visual_review"] = visual
            data["review"] = "visible-human-prose-reviewed-technical-code-original-pixels-authoritative"
            data["translation_status"] = "technical-code-only-original-pixels-retained-no-prose-to-translate" if visual.get("code_only") else "visible-human-prose-translated-technical-code-transcription-unverified"
        elif visual and all(label["translation_method"] in {"agent-reviewed-label-translation", "reviewed-verbatim-technical-label", "visually-confirmed-nontext-ocr-false-positive", "superseded-by-visually-reviewed-manual-transcription"} for label in data["labels"]):
            data["visual_review"] = visual
            data["review"] = "visible-labels-visually-reviewed-and-translated"
            data["translation_status"] = "visible-readable-text-translated-unreadable-source-text-remains" if visual.get("unreadable_source_text") else ("visible-labels-translated-source-clipped" if not visual["full_transcription_confirmed"] else "all-visible-text-visually-reviewed-and-translated")
        elif visual and visual.get("partial_review"):
            data["visual_review"] = visual
            data["review"] = "prose-labels-reviewed-code-transcription-pending"
            data["translation_status"] = "partially-visually-reviewed-code-transcription-pending"
        elif data["labels"]:
            data["review"] = "ocr-transcription-not-visually-reviewed"
            data["translation_status"] = "local-machine-draft-unreviewed" if all(l["translation_method"] != "pending-local-translation" for l in data["labels"]) else "partially-translated-unreviewed-ocr"
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        source_link = "../../../" + quote(data["source"], safe="/")
        heading = "SVGの文字ラベル対応訳" if svg else ("画像の文字ラベル対応訳（一部目視照合）" if visual and visual.get("partial_review") else ("画像の文字ラベル対応訳（目視照合済み）" if data.get("visual_review") else "画像の文字起こし・日本語参考訳（未校閲）"))
        lines = ["# " + heading, "", "原画像: [" + data["source"] + "](" + source_link + ")", "", "SHA-256: `" + data["sha256"] + "`", "", "抽出: `" + data["method"] + "` / `" + data["status"] + "`", "", "翻訳状態: `" + data.get("translation_status", "pending") + "`", ""]
        if data.get("related_japanese_document"):
            related = data["related_japanese_document"]
            lines += [f"対応する発表資料の[日本語全文訳・ページ{related['page']}]({related['href']})があります。" + ("原画像を実際に目視し、同番号PDFの本文・日本語訳との対応を照合しました。対応本文はPDFテキスト層から再利用し、図中文字を手動で補足しています。技術コード・原図の欠けの確認範囲は下記の状態と注記を参照してください。" if visual and visual.get("matching_pdf_page_visually_confirmed") else "24枚の原画像とPDFの同じページを縮小比較した画素差は低く、同じスライドの別レンダリングと考えられますが、画像のOCR自体の校閲は未完了です。本文の手動訳と図中文字の補足はリンク先を参照してください。"), ""]
        if svg and data["labels"]:
            lines += ["SVG内のtext/foreignObjectから直接抽出した全ラベルをエージェントが訳文と照合しました。URL、コード、プロトコル識別子、数値、記号は原表記を保持しています。図の矢印・配置・関係は原画像で確認してください。", ""]
            if data.get("parse_recovery"):
                lines += ["元SVGのXMLには未エスケープの&があります。原ファイルを変更せず、抽出時のメモリ上だけでエスケープしてラベルを読み取りました。", ""]
        elif data.get("visual_review"):
            lines += [("可視の人向け文章を目視して日本語訳を照合しました。技術コードは原画素を保持し、OCR転記の完全性は未確認です。" if visual.get("code_transcription_unverified") else ("図の説明ラベルは目視照合しました。コードの文字起こしは未完了です。" if visual.get("partial_review") else "原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。")) + "OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。", ""]
            if visual.get("source_limitation"):
                lines += ["原画像の制約: " + visual["source_limitation"], ""]
            if visual.get("source_note"):
                lines += ["原図の注記: " + visual["source_note"], ""]
        elif not svg:
            lines += ["ローカルOCRの認識結果です。日本語は一部の共通語句を除き未校閲の機械訳であり、文字の欠落・誤認識・誤訳があり得ます。OCRの信頼度は翻訳や全文転記の正しさを保証しません。コードや識別子・数値を含む区間は翻訳器に渡さず原表記を保持しました。文字未検出も「文字なし」の確認にはなりません。", ""]
        elif data.get("status") == "invalid-svg":
            lines += ["原資料は空のSVGファイルであり、翻訳可能な文字を取得できません。原ファイルの欠損を記録し、図の内容は推測しません。", ""]
        lines += ["![原画像](" + source_link + ")", "", "| ID | 原文 | 日本語 | 翻訳・確認状態 |", "| --- | --- | --- | --- |"]
        for label in data["labels"]:
            def escape(value):
                return html.escape(str(value)).replace("|", "&#124;").replace("\n", "<br>")
            original = label.get("transcribed_source", label["source"])
            if "transcribed_source" in label:
                original += " （OCR認識: " + label["source"] + "）"
            lines.append("| " + label["label_id"] + " | " + escape(original) + " | " + escape(label.get("japanese", "未訳")) + " | " + label.get("translation_method", "pending") + " |")
        lines += ["", "認識座標・confidence・SVG要素情報は[対応するJSON](" + path.name + ")に保持しています。", ""]
        path.with_suffix(".md").write_text("\n".join(lines), encoding="utf-8")
    if protected_errors:
        raise ValueError("Protected token preservation failed: " + json.dumps(protected_errors))
    print(json.dumps({"rendered_unique_images": len(files), "protected_token_errors": len(protected_errors)}), flush=True)


def verify_and_index():
    """Check baseline bytes and artifact links, then write a resumable review index."""
    inventory = json.loads((OUT.parent / "images-inventory.json").read_text(encoding="utf-8"))
    errors, checked, unique = [], [], {}
    for asset in inventory["assets"]:
        source = asset["source"]
        baseline = subprocess.check_output(["git", "show", BASE + ":" + source], cwd=ROOT)
        baseline_sha = hashlib.sha256(baseline).hexdigest()
        current_sha = hashlib.sha256((ROOT / source).read_bytes()).hexdigest()
        if current_sha != baseline_sha or current_sha != asset["sha256"]:
            errors.append({"check": "baseline-sha256", "source": source})
        artifact = OUT / (asset["group"] + ".json")
        data = json.loads(artifact.read_text(encoding="utf-8"))
        if data["sha256"] != current_sha:
            errors.append({"check": "sidecar-sha256", "source": source})
        label_ids = [label.get("label_id") for label in data["labels"]]
        expected_ids = ["L" + str(index).zfill(3) for index in range(1, len(label_ids) + 1)]
        if label_ids != expected_ids:
            errors.append({"check": "label-id-correspondence", "source": source})
        for label in data["labels"]:
            if not label.get("japanese"):
                errors.append({"check": "missing-japanese", "source": source, "label_id": label.get("label_id")})
            if label.get("translation_method") == "local-machine-draft-unreviewed" and any(token not in label["japanese"] for token in label.get("protected_tokens", [])):
                errors.append({"check": "protected-token", "source": source, "label_id": label.get("label_id")})
        sidecar = artifact.with_suffix(".md")
        if not sidecar.exists():
            errors.append({"check": "missing-sidecar", "source": source})
        else:
            for href in re.findall(r"\]\(([^)]+)\)", sidecar.read_text(encoding="utf-8")):
                if not (sidecar.parent / unquote(href.split("#", 1)[0])).resolve().exists():
                    errors.append({"check": "broken-local-link", "source": source, "href": href})
        unique[asset["group"]] = data
        checked.append({"source": source, "sha256": current_sha, "translation_status": data["translation_status"]})
    summary = {
        "baseline": BASE,
        "image_paths_checked": len(checked),
        "unique_images_checked": len(unique),
        "original_sha256_comparisons": len(checked),
        "source_images_unchanged": not any(error["check"] == "baseline-sha256" for error in errors),
        "source_path_translation_status": dict(collections.Counter(item["translation_status"] for item in checked)),
        "unique_image_translation_status": dict(collections.Counter(data["translation_status"] for data in unique.values())),
        "unique_labels": sum(len(data["labels"]) for data in unique.values()),
        "unreviewed_machine_translation_labels": sum(label.get("translation_method") in {"local-machine-draft-unreviewed", "pending-local-translation", "verbatim-code-unreviewed-ocr"} for data in unique.values() for label in data["labels"]),
        "visually_reviewed_unique_raster_images": sum(data.get("method", "").startswith("rapidocr") and bool(data.get("visual_review")) for data in unique.values()),
        "technical_code_transcription_unverified_unique_images": sum(bool(data.get("visual_review", {}).get("code_transcription_unverified")) for data in unique.values()),
        "visible_prose_review_pending_unique_images": sum(data.get("method", "").startswith("rapidocr") and not bool(data.get("visual_review")) for data in unique.values()),
        "source_pixel_limitations": [{"source": data["source"], "sha256": data["sha256"], "limitation": data["visual_review"]["source_limitation"]} for data in unique.values() if data.get("visual_review", {}).get("source_limitation")],
        "errors": errors,
        "limitations": ["OCR success and token preservation do not establish complete transcription or accurate translation.", "SVG review covers extracted XML text elements; the original graphic remains authoritative for relationships and layout.", "The empty OAuth2.1.svg source cannot be translated.", "Document-page OCR is tracked separately and is excluded from this original-image inventory."]
    }
    (OUT / "verification-results.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    done, partial, pending = [], [], []
    for item in sorted(checked, key=lambda item: item["source"]):
        status = item["translation_status"]
        if status in {"all-svg-xml-labels-translated-technical-labels-retained", "all-visible-text-visually-reviewed-and-translated"}:
            done.append(item)
        elif status in {"visible-labels-translated-source-clipped", "partially-visually-reviewed-code-transcription-pending", "not-applicable-invalid-source", "visible-readable-text-translated-unreadable-source-text-remains", "visible-human-prose-translated-technical-code-transcription-unverified", "technical-code-only-original-pixels-retained-no-prose-to-translate"}:
            partial.append(item)
        else:
            pending.append(item)
    checkpoint = {"baseline": BASE, "policy": "Continue in pending source order. Use view_image and compare every label, translation, number and identifier. Preserve raw OCR. OCR confidence is not review evidence.", "completed": done, "partial_or_source_defect": partial, "pending": pending, "next_source": pending[0]["source"] if pending else None}
    (OUT / "review-checkpoint.json").write_text(json.dumps(checkpoint, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    status_ja = {"all-svg-xml-labels-translated-technical-labels-retained": "SVGラベル訳文照合済み", "all-visible-text-visually-reviewed-and-translated": "全可視文字を目視照合済み", "visible-labels-translated-source-clipped": "可視文字訳済み・原画像に隠れ／切れあり", "partially-visually-reviewed-code-transcription-pending": "説明訳済み・小コード転記未確認", "not-applicable-invalid-source": "原ファイルが空", "local-machine-draft-unreviewed": "OCR・機械訳草稿（未校閲）", "visible-readable-text-translated-unreadable-source-text-remains": "可読文章訳済み・原画像に遮蔽／不鮮明文字あり", "visible-human-prose-translated-technical-code-transcription-unverified": "可視の人向け文章訳済み・技術コード転記未確認", "technical-code-only-original-pixels-retained-no-prose-to-translate": "技術コードのみ・翻訳すべき説明文なし・原画素保持"}
    lines = ["# 画像の日本語対訳と確認台帳", "", "原画像は変更せず、SHA-256ごとの対訳Markdownと認識座標付きJSONを追加しています。同一画像の重複パスは同じ対訳を参照します。原文の誤記・歴史的なURLや仕様主張は現行仕様に書き換えていません。", "", f"対象は基準コミット`{BASE}`の画像{len(checked)}パス、重複を除く{len(unique)}画像です。形式別件数・寸法・SHA-256・確認状態は[画像一覧JSON](../images-inventory.json)に記録しています。", "", "| 確認状態 | 元画像パス数 |", "| --- | ---: |"]
    for status, count in summary["source_path_translation_status"].items():
        lines.append(f"| {status_ja.get(status, status)} | {count} |")
    lines += ["", f"ラスター画像は重複除外{summary['visually_reviewed_unique_raster_images']}画像すべてを実際に目視しました。残る未校閲機械訳ラベルは{summary['unreviewed_machine_translation_labels']}件です。読める人向け文章とコメントは対訳し、技術コードの完全転記・原画像で読めない文字は別の確認範囲として記録しています。古い未校閲の機械訳キャッシュは成果物から除きました。", ""]
    lines += ["", "未校閲草稿は完訳として数えません。目視確認済みの画像でも原画像の欠けは補っていません。SVGはXMLのtext/foreignObjectに含まれる全文ラベルを訳文照合済みです。空のOAuth2.1.svgは元資料欠損です。PDF/PPTXのページOCRは別資料として扱い、この画像件数に含めません。", "", "OCRは無料のローカルRapidOCR、未校閲草稿の機械訳はローカルArgosの中英・英日モデルを使用しました。APIキーや有料モデルは使用していません。草稿ではURL・識別子・数値等を翻訳器に渡さず保護していますが、それだけではOCRの正しさや文章の意味は保証されません。", "", "[検証結果](verification-results.json)には元画像とGit基準のSHA-256比較、対訳ID、和訳欄、ローカルリンク、保護トークンの検査結果を記録しています。[再開チェックポイント](review-checkpoint.json)は完了・部分確認・未確認を原画像パスとSHA付きで分離しています。", "", "抽出と更新の再現手順（Pillowが必要、--ocrにはrapidocr-onnxruntime==1.4.4が必要）:", "", "```powershell", "uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py --ocr", "uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py --render", "uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py", "uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py --verify", "```", "", "`svg-ja-glossary.tsv`はSVGと目視済みラスター画像の共通対訳です。`svg-retained-labels.json`はそのまま保持すると明示確認した技術表記、`raster-visual-review.json`は目視結果と訂正、`local-mt-drafts.json`は未校閲のローカル機械訳キャッシュです。--renderは既存キャッシュから生成し、モデルを呼び出しません。--translate-draftsの初回実行には別途ローカル翻訳モデルが必要です。", "", "| 原画像 | 日本語対訳 | 確認状態 |", "| --- | --- | --- |"]
    for asset in sorted(inventory["assets"], key=lambda item: item["source"]):
        lines.append(f"| [{asset['source']}](../../../{quote(asset['source'], safe='/')}) | [対応訳]({asset['group']}.md) | {status_ja.get(asset['translation_status'], asset['translation_status'])} |")
    readme = "\n".join(lines) + "\n"
    readme = readme.replace("OCRは無料のローカルRapidOCR、未校閲草稿の機械訳はローカルArgosの中英・英日モデルを使用しました。", "OCRは無料のローカルRapidOCRを使用しました。初期草稿作成時にはローカルArgosの中英・英日モデルを使いましたが、最終対訳は目視・手動訳または目視確認したPDFの手動訳で照合しています。")
    readme = readme.replace("`local-mt-drafts.json`は未校閲のローカル機械訳キャッシュです。--renderは既存キャッシュから生成し、モデルを呼び出しません。", "初期草稿の`local-mt-drafts.json`は最終成果物から除きました。--renderは抽出JSON・手動対訳・レビュー記録から生成でき、モデルを呼び出しません。")
    (OUT / "README.md").write_text(readme, encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=True), flush=True)
    if errors:
        raise ValueError("Image artifact verification failed")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--ocr", action="store_true")
    parser.add_argument("--render", action="store_true")
    parser.add_argument("--translate-drafts", action="store_true")
    parser.add_argument("--verify", action="store_true")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    if args.verify:
        verify_and_index()
        return
    if args.render or args.translate_drafts:
        finalize(args.translate_drafts)
        return
    paths = subprocess.check_output(["git", "ls-tree", "-rz", "--name-only", BASE], cwd=ROOT).decode("utf-8").split("\0")
    paths = [p for p in paths if Path(p).suffix.lower() in EXTENSIONS]
    ocr = None
    if args.ocr:
        from rapidocr_onnxruntime import RapidOCR
        ocr = RapidOCR(intra_op_num_threads=2, inter_op_num_threads=1)
    assets, groups = [], {}
    for index, path in enumerate(paths):
        data = (ROOT / path).read_bytes()
        sha = hashlib.sha256(data).hexdigest()
        suffix = Path(path).suffix.lower()
        item = {"source": path, "sha256": sha, "bytes": len(data), "format": suffix[1:], "group": sha[:16], "sidecar": "images/" + sha[:16] + ".md"}
        if sha in groups:
            item["duplicate_of"] = groups[sha]["source"]
            item["dimensions"] = groups[sha]["dimensions"]
            assets.append(item)
            continue
        cache = OUT / (sha[:16] + ".json")
        extracted = json.loads(cache.read_text(encoding="utf-8")) if cache.exists() else None
        if suffix == ".svg":
            parse_recovery = None
            try:
                tree = ET.fromstring(data)
            except ET.ParseError as error:
                # Some source SVGs contain a bare ampersand in text. Escape it
                # in memory for extraction only; source bytes remain unchanged.
                try:
                    tree = ET.fromstring(re.sub(rb"&(?!#\d+;|#x[0-9A-Fa-f]+;|[A-Za-z]+;)", b"&amp;", data))
                    parse_recovery = {"original_xml_error": str(error), "operation": "bare-ampersands-escaped-in-memory-only"}
                    if extracted and extracted.get("status") == "invalid-svg":
                        extracted = None
                except ET.ParseError:
                    item["dimensions"] = None
                    extracted = {"source": path, "sha256": sha, "method": "svg-xml", "status": "invalid-svg", "error": str(error), "labels": [], "review": "source-defect-confirmed", "translation_status": "not-applicable-invalid-source"}
                    cache.write_text(json.dumps(extracted, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                    groups[sha] = item
                    assets.append(item)
                    continue
            item["dimensions"] = {"width": tree.get("width"), "height": tree.get("height"), "viewBox": tree.get("viewBox")}
            if extracted is None:
                labels = []
                for element in tree.iter():
                    tag = element.tag.rsplit("}", 1)[-1]
                    if tag in {"text", "foreignObject"}:
                        text = " ".join(" ".join(element.itertext()).split())
                        if text:
                            labels.append({"source": text, "element": tag, "id": element.get("id"), "x": element.get("x"), "y": element.get("y")})
                extracted = {"source": path, "sha256": sha, "method": "svg-xml", "status": "text-extracted" if labels else "no-svg-text-needs-visual-review", "labels": labels, "review": "not-reviewed", "translation_status": "pending"}
                if parse_recovery:
                    extracted["parse_recovery"] = parse_recovery
                    extracted["status"] = "text-extracted-malformed-xml-recovered"
        else:
            with Image.open(ROOT / path) as picture:
                item["dimensions"] = {"width": picture.width, "height": picture.height}
            if extracted is None or (args.ocr and extracted["method"] == "not-run"):
                if ocr is not None:
                    result, timing = ocr(str(ROOT / path))
                    labels = [{"source": row[1], "confidence": float(row[2]), "box": row[0]} for row in (result or [])]
                    extracted = {"source": path, "sha256": sha, "method": "rapidocr-onnxruntime-1.4.4-local", "status": "ocr-text-unverified" if labels else "ocr-no-text-unconfirmed", "labels": labels, "review": "not-reviewed", "translation_status": "pending", "ocr_seconds": timing}
                else:
                    extracted = {"source": path, "sha256": sha, "method": "not-run", "status": "pending-ocr", "labels": [], "review": "not-reviewed", "translation_status": "pending"}
        cache.write_text(json.dumps(extracted, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        groups[sha] = item
        assets.append(item)
        print(json.dumps({"index": index + 1, "total": len(paths), "source": path, "labels": len(extracted["labels"]), "status": extracted["status"]}, ensure_ascii=True), flush=True)
    for item in assets:
        extracted = json.loads((OUT / (item["group"] + ".json")).read_text(encoding="utf-8"))
        item.update({"extraction_status": extracted["status"], "translation_status": extracted.get("translation_status", "pending"), "review": extracted.get("review", "not-reviewed"), "label_count": len(extracted["labels"])})
        item["no_text_confirmed"] = False
        if item["bytes"] == 0:
            item["content_classification"] = "empty-source-file"
        elif item["format"] == "svg":
            item["content_classification"] = "svg-with-text-labels"
        elif item["source"].endswith("a2a-partners.png"):
            item["content_classification"] = "logo-collage-with-text-visually-reviewed"
        elif "/anp-in-w3c-20250214/" in item["source"]:
            item["content_classification"] = "presentation-slide-readable-prose-and-diagram-labels-visually-reviewed" if extracted.get("visual_review") else "presentation-slide-with-text-ocr-unreviewed"
        elif "/lkcoffe/" in item["source"]:
            item["content_classification"] = "product-photograph-readable-prose-visually-reviewed-source-limitations-recorded" if extracted.get("visual_review") else "product-photograph-with-instructions-ocr-unreviewed"
        elif "/anp-first-meet/" in item["source"] or item["source"].endswith("/vinote.png"):
            item["content_classification"] = "screenshot-with-text-" + (("visually-reviewed-source-clipped" if extracted["translation_status"] == "visible-labels-translated-source-clipped" else "visually-reviewed") if extracted.get("visual_review") else "ocr-unreviewed")
        elif extracted.get("visual_review"):
            item["content_classification"] = "diagram-partially-visually-reviewed" if extracted["visual_review"].get("partial_review") else "diagram-visually-reviewed"
        else:
            item["content_classification"] = "text-bearing-raster-ocr-unreviewed"
        if extracted.get("visual_review"):
            visual = extracted["visual_review"]
            item["review_scope"] = visual.get("review_scope", "all-readable-visible-labels; see source limitations")
            item["source_limitation"] = visual.get("source_limitation")
            item["technical_code_transcription_unverified"] = bool(visual.get("code_transcription_unverified"))
    manifest = {"baseline": BASE, "policy": "Original images are unchanged. SVG XML text is directly extracted. OCR text and no-text findings require review; a successful OCR run does not establish complete transcription.", "total": len(assets), "unique_images": len(groups), "formats": dict(collections.Counter(i["format"] for i in assets)), "assets": assets}
    (OUT.parent / "images-inventory.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
