from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
OUT_DIR = ROOT / "streamlit_build"
OUT_FILE = OUT_DIR / "financial_coach.html"


def data_url(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"


def replace_asset_urls(text: str) -> str:
    for asset in sorted((DIST / "assets").glob("*"), key=lambda item: len(item.name), reverse=True):
        url = data_url(asset)
        text = text.replace(f"/assets/{asset.name}", url)
        text = text.replace(f"./assets/{asset.name}", url)
        text = text.replace(f"assets/{asset.name}", url)
    return text


def main() -> None:
    index_path = DIST / "index.html"
    if not index_path.exists():
        raise SystemExit("dist/index.html not found. Run npm run build first.")

    html = index_path.read_text(encoding="utf-8")

    css_tags = re.findall(r'<link[^>]+href="([^"]+\.css)"[^>]*>', html)
    js_tags = re.findall(r'<script[^>]+src="([^"]+\.js)"[^>]*></script>', html)

    for href in css_tags:
        css_path = DIST / href.lstrip("/")
        css = replace_asset_urls(css_path.read_text(encoding="utf-8"))
        html = re.sub(
            rf'<link[^>]+href="{re.escape(href)}"[^>]*>',
            lambda _match, css=css: f"<style>\n{css}\n</style>",
            html,
        )

    for src in js_tags:
        js_path = DIST / src.lstrip("/")
        js = replace_asset_urls(js_path.read_text(encoding="utf-8"))
        html = re.sub(
            rf'<script[^>]+src="{re.escape(src)}"[^>]*></script>',
            lambda _match, js=js: f'<script type="module">\n{js}\n</script>',
            html,
        )

    html = replace_asset_urls(html)
    OUT_DIR.mkdir(exist_ok=True)
    OUT_FILE.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT_FILE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
