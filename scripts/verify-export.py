#!/usr/bin/env python3
"""Audit the real Next.js static export using only the Python standard library.

Run after the build:
    python3 scripts/verify-export.py
    python3 scripts/verify-export.py --origin https://repairnox.example

The default checks the explicitly authorized no-origin, no-collection preview.
--origin checks a build produced with that public origin; it does not build or
change configuration. This is a static-content check, not a browser test.
"""

from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import struct
import sys
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET
import zlib


PROJECT = Path(__file__).resolve().parents[1]
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}
NON_TEXT_TAGS = {"script", "style", "template", "svg"}
URL_META = {"og:url", "og:image", "og:image:url", "og:image:secure_url", "twitter:image", "twitter:image:src"}
REVIEW_TYPES = {"Review", "AggregateRating"}
LOOPBACK = {"localhost", "127.0.0.1", "::1", "[::1]", "0.0.0.0"}


@dataclass(frozen=True)
class Reference:
    tag: str
    attribute: str
    value: str
    line: int
    download: bool = False


class Document(HTMLParser):
    """Collect actual HTML references and server-rendered readable content."""

    def __init__(self, path: Path, route: str):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.route = route
        self.references: list[Reference] = []
        self.ids: Counter[str] = Counter()
        self.anchor_names: set[str] = set()
        self.meta: dict[str, list[str]] = {}
        self.canonicals: list[str] = []
        self.forms = 0
        self.collection_fields = 0
        self.review_markup: list[str] = []
        self.json_ld: list[str] = []
        self.title: list[str] = []
        self.h1: list[str] = []
        self.h1_count = 0
        self.main_count = 0
        self.main_text: list[str] = []
        self.article_text: list[str] = []
        self.base_href: str | None = None
        self.stack: list[tuple[str, bool]] = []
        self.current_json: list[str] | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        inherited_hidden = bool(self.stack and self.stack[-1][1])
        inline_style = re.sub(r"\s+", "", attributes.get("style") or "").lower()
        hidden = inherited_hidden or tag in NON_TEXT_TAGS or "hidden" in attributes or attributes.get("aria-hidden") == "true" or (tag == "dialog" and "open" not in attributes) or "display:none" in inline_style or "visibility:hidden" in inline_style
        if tag == "script" and (attributes.get("type") or "").lower() == "application/ld+json":
            self.current_json = []
        if tag not in VOID_TAGS:
            self.stack.append((tag, hidden))
        if attributes.get("id"):
            self.ids[attributes["id"]] += 1
        if tag == "a" and attributes.get("name"):
            self.anchor_names.add(attributes["name"])
        if tag == "base" and attributes.get("href"):
            self.base_href = attributes["href"]
        for attribute in ("href", "src", "poster", "data"):
            value = attributes.get(attribute)
            if value is not None and (attribute != "data" or tag == "object"):
                self.references.append(Reference(tag, attribute, value, self.getpos()[0], tag == "a" and "download" in attributes))
        if tag == "link" and "canonical" in (attributes.get("rel") or "").lower().split():
            self.canonicals.append(attributes.get("href") or "")
        if tag == "meta":
            key = (attributes.get("name") or attributes.get("property") or "").lower()
            self.meta.setdefault(key, []).append(attributes.get("content") or "")
        if tag == "form":
            self.forms += 1
        if tag in {"input", "textarea"} and (tag == "textarea" or (attributes.get("type") or "text").lower() not in {"hidden", "button", "submit", "reset", "checkbox", "radio"}):
            self.collection_fields += 1
        item_types = (attributes.get("itemtype") or "").split()
        if any(value.rstrip("/").rsplit("/", 1)[-1] in REVIEW_TYPES for value in item_types) or any(value.lower() in {"review", "aggregaterating"} for value in (attributes.get("itemprop") or "").split()):
            self.review_markup.append(f"<{tag}> at line {self.getpos()[0]}")
        if not hidden:
            self.h1_count += tag == "h1"
            self.main_count += tag == "main"

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self.current_json is not None:
            self.json_ld.append("".join(self.current_json))
            self.current_json = None
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data: str) -> None:
        if self.current_json is not None:
            self.current_json.append(data)
        if not self.stack or self.stack[-1][1] or not data.strip():
            return
        tags = {tag for tag, _ in self.stack}
        if "title" in tags:
            self.title.append(data)
        if "h1" in tags:
            self.h1.append(data)
        if "main" in tags:
            self.main_text.append(data)
        if "article" in tags:
            self.article_text.append(data)


def compact(parts: list[str]) -> str:
    return " ".join(" ".join(parts).split())


def route_for(relative: Path) -> str:
    if relative.name == "index.html":
        parent = relative.parent.as_posix()
        return "/" if parent == "." else f"/{parent}/"
    return "/" + relative.as_posix()


def is_public_document(relative: Path) -> bool:
    return not any(part.startswith("_") or part in {"404", "500"} for part in relative.parts) and relative.name not in {"404.html", "500.html"}


def review_json_types(value: object) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        kinds = value.get("@type", [])
        for kind in kinds if isinstance(kinds, list) else [kinds]:
            if isinstance(kind, str) and kind.rstrip("/").rsplit("/", 1)[-1] in REVIEW_TYPES:
                found.append(kind)
        for child in value.values():
            found.extend(review_json_types(child))
    elif isinstance(value, list):
        for child in value:
            found.extend(review_json_types(child))
    return found


class Audit:
    def __init__(self, directory: Path, origin: str | None):
        self.directory = directory.resolve()
        self.origin = origin
        self.base_origin = origin or "https://static-export.invalid"
        self.documents: dict[Path, Document] = {}
        self.errors: list[str] = []
        self.counts: Counter[str] = Counter()

    def fail(self, label: str, message: str) -> None:
        self.errors.append(f"{label}: {message}")

    def resolve(self, url: str) -> Path | None:
        path = (self.directory / unquote(urlsplit(url).path).lstrip("/")).resolve()
        if not path.is_relative_to(self.directory):
            return None
        if path.is_dir():
            path /= "index.html"
        return path if path.is_file() else None

    def is_internal(self, parsed) -> bool:
        return not parsed.netloc or parsed.netloc == urlsplit(self.base_origin).netloc or (parsed.hostname or "").lower() in LOOPBACK

    def references(self, doc: Document) -> None:
        base = urljoin(self.base_origin + doc.route, doc.base_href or "")
        for reference in doc.references:
            label = f"{doc.route} line {reference.line} {reference.tag}[{reference.attribute}]"
            raw = reference.value.strip()
            parsed = urlsplit(raw)
            if parsed.scheme.lower() in {"javascript", "vbscript", "file"}:
                self.fail(label, f"unsafe URL scheme: {raw}")
                continue
            if parsed.scheme and parsed.scheme.lower() not in {"http", "https"}:
                self.counts["non_http_references"] += 1
                continue
            absolute = urljoin(base, raw)
            parsed = urlsplit(absolute)
            if not self.is_internal(parsed):
                self.counts["external_references"] += 1
                continue
            self.counts["internal_references"] += 1
            if reference.tag == "a" and (not raw or raw == "#"):
                self.fail(label, "empty or bare-# navigation destination")
                continue
            target = self.resolve(absolute)
            if target is None:
                self.fail(label, f"missing exported destination {raw!r}")
                continue
            if reference.download:
                self.counts["download_links"] += 1
                if target.stat().st_size == 0:
                    self.fail(label, f"download is empty: {raw}")
            if parsed.fragment and target.suffix.lower() == ".html":
                self.counts["fragment_references"] += 1
                fragment = unquote(parsed.fragment)
                target_doc = self.documents.get(target)
                if target_doc is None or (fragment not in target_doc.ids and fragment not in target_doc.anchor_names):
                    self.fail(label, f"missing fragment #{fragment} in {target.relative_to(self.directory)}")

    def metadata(self, doc: Document, public: bool) -> None:
        robots = {token.strip().lower() for content in doc.meta.get("robots", []) for token in content.split(",")}
        if not self.origin or not public:
            if "noindex" not in robots:
                self.fail(doc.route, "preview/error HTML is missing robots noindex")
        elif not {"index", "follow"}.issubset(robots) or {"noindex", "nofollow"} & robots:
            self.fail(doc.route, "configured public HTML must explicitly index/follow")
        urls = [("canonical", value) for value in doc.canonicals]
        urls += [(key, value) for key in URL_META for value in doc.meta.get(key, [])]
        if not self.origin:
            if urls:
                self.fail(doc.route, "no-origin preview contains absolute-origin metadata: " + ", ".join(f"{key}={value}" for key, value in urls))
            return
        if public and doc.canonicals != [self.origin + doc.route]:
            self.fail(doc.route, f"canonical must equal {self.origin + doc.route!r}; got {doc.canonicals!r}")
        if public and doc.meta.get("og:url") != [self.origin + doc.route]:
            self.fail(doc.route, "og:url must match the page's canonical public URL")
        for key, value in urls:
            parsed = urlsplit(value)
            if f"{parsed.scheme}://{parsed.netloc}" != self.origin:
                self.fail(doc.route, f"{key} uses an unexpected origin: {value}")
            if key in {"og:image", "og:image:url", "og:image:secure_url", "twitter:image", "twitter:image:src"} and self.resolve(value) is None:
                self.fail(doc.route, f"{key} is missing from the export: {value}")
        if public and (not doc.meta.get("og:image") or not doc.meta.get("twitter:image")):
            self.fail(doc.route, "configured page is missing OG/Twitter image metadata")

    def content(self, doc: Document, public: bool) -> None:
        if doc.forms or doc.collection_fields:
            self.fail(doc.route, f"prelaunch no-collection contract violated ({doc.forms} forms, {doc.collection_fields} text/email/password fields)")
        if doc.review_markup:
            self.fail(doc.route, "unverified review microdata: " + ", ".join(doc.review_markup))
        for source in doc.json_ld:
            try:
                review_types = review_json_types(json.loads(source))
                if review_types:
                    self.fail(doc.route, "unverified review structured data: " + ", ".join(review_types))
            except json.JSONDecodeError as error:
                self.fail(doc.route, f"invalid JSON-LD: {error.msg}")
        for identifier, count in doc.ids.items():
            if count > 1:
                self.fail(doc.route, f"duplicate id {identifier!r} occurs {count} times")
        if not public:
            return
        if doc.main_count != 1 or doc.h1_count != 1 or not compact(doc.h1):
            self.fail(doc.route, f"expected one readable main and one nonempty H1; got {doc.main_count} main, {doc.h1_count} H1")
        if len(compact(doc.main_text)) < 200:
            self.fail(doc.route, "insufficient server-rendered main content; a blank client shell cannot pass")
        if not compact(doc.title) or len(doc.meta.get("description", [])) != 1 or not doc.meta["description"][0].strip():
            self.fail(doc.route, "missing title or unique nonempty meta description")
        if doc.route.startswith("/guides/"):
            self.counts["guides"] += 1
            if len(compact(doc.article_text)) < 700:
                self.fail(doc.route, "guide lacks substantial readable server-rendered article text")
            if not any(reference.download for reference in doc.references):
                self.fail(doc.route, "guide has no downloadable resource link")

    def robots_and_sitemap(self, public_docs: list[Document]) -> None:
        robots_path = self.directory / "robots.txt"
        if not robots_path.is_file():
            self.fail("robots.txt", "missing export")
        else:
            groups: list[tuple[list[str], list[tuple[str, str]]]] = []
            agents: list[str] = []
            rules: list[tuple[str, str]] = []
            sitemaps: list[str] = []
            for line in robots_path.read_text(encoding="utf-8").splitlines():
                line = line.split("#", 1)[0].strip()
                if ":" not in line:
                    continue
                key, value = (piece.strip() for piece in line.split(":", 1))
                key = key.lower()
                if key == "sitemap":
                    sitemaps.append(value)
                elif key == "user-agent":
                    if rules:
                        groups.append((agents, rules))
                        agents, rules = [], []
                    agents.append(value)
                elif key in {"allow", "disallow"}:
                    rules.append((key, value))
            if agents:
                groups.append((agents, rules))
            wildcard = [rule for agents, rules in groups if "*" in agents for rule in rules]
            if self.origin:
                if ("allow", "/") not in wildcard or ("disallow", "/") in wildcard:
                    self.fail("robots.txt", "configured public origin is not allowed for wildcard crawlers")
                if sitemaps != [self.origin + "/sitemap.xml"]:
                    self.fail("robots.txt", "sitemap directive does not match configured origin")
            elif ("disallow", "/") not in wildcard or sitemaps:
                self.fail("robots.txt", "no-origin preview must disallow / and omit sitemap directives")
        sitemap_path = self.directory / "sitemap.xml"
        try:
            root = ET.parse(sitemap_path).getroot()
            if root.tag.rsplit("}", 1)[-1] != "urlset":
                self.fail("sitemap.xml", "expected a URL sitemap")
            locations = [element.text.strip() if element.text else "" for element in root.iter() if element.tag.rsplit("}", 1)[-1] == "loc"]
            expected = {self.origin + doc.route for doc in public_docs} if self.origin else set()
            if set(locations) != expected or len(locations) != len(set(locations)):
                self.fail("sitemap.xml", f"URLs differ from exported public pages; missing={sorted(expected - set(locations))}, unexpected={sorted(set(locations) - expected)}")
            for location in locations:
                if urlsplit(location).query or urlsplit(location).fragment or self.resolve(location) is None:
                    self.fail("sitemap.xml", f"invalid exported page URL: {location}")
            self.counts["sitemap_urls"] = len(locations)
        except (OSError, ET.ParseError) as error:
            self.fail("sitemap.xml", str(error))

    def downloads(self) -> None:
        resources = PROJECT / "public" / "resources"
        sources = sorted(path for path in resources.rglob("*") if path.is_file()) if resources.exists() else []
        if not sources:
            self.fail("downloads", "no source resource artifacts exist")
        for source in sources:
            relative = source.relative_to(PROJECT / "public")
            target = self.directory / relative
            if not target.is_file() or target.stat().st_size == 0:
                self.fail("downloads", f"missing or empty exported resource: {relative}")
            elif target.read_bytes() != source.read_bytes():
                self.fail("downloads", f"exported resource differs from source: {relative}; rebuild may be stale")
            self.counts["resource_files"] += 1

    def social_png(self) -> None:
        path = self.directory / "social-preview.png"
        try:
            data = path.read_bytes()
            if not data.startswith(b"\x89PNG\r\n\x1a\n"):
                raise ValueError("not a PNG signature")
            offset, dimensions, chunks = 8, None, []
            while offset < len(data):
                if len(data) - offset < 12:
                    raise ValueError("truncated PNG chunk")
                length = struct.unpack_from(">I", data, offset)[0]
                end = offset + 12 + length
                if end > len(data):
                    raise ValueError("truncated PNG payload")
                kind = data[offset + 4:offset + 8]
                payload = data[offset + 8:offset + 8 + length]
                checksum = struct.unpack_from(">I", data, offset + 8 + length)[0]
                if zlib.crc32(kind + payload) & 0xFFFFFFFF != checksum:
                    raise ValueError("invalid PNG chunk checksum")
                chunks.append(kind)
                if kind == b"IHDR":
                    if length != 13:
                        raise ValueError("invalid IHDR length")
                    dimensions = struct.unpack_from(">II", payload)
                offset = end
                if kind == b"IEND":
                    break
            if not chunks or chunks[0] != b"IHDR" or b"IDAT" not in chunks or chunks[-1] != b"IEND":
                raise ValueError("missing mandatory PNG chunks")
            if dimensions != (1200, 630):
                raise ValueError(f"expected 1200×630 social image, got {dimensions}")
            self.counts["social_png_width"], self.counts["social_png_height"] = dimensions
        except (OSError, ValueError, struct.error) as error:
            self.fail("social-preview.png", str(error))

    def run(self) -> bool:
        paths = sorted(self.directory.rglob("*.html"))
        if not paths or not (self.directory / "index.html").is_file():
            self.fail("export", "missing index.html or HTML files; build before auditing")
            return False
        for path in paths:
            document = Document(path, route_for(path.relative_to(self.directory)))
            try:
                document.feed(path.read_text(encoding="utf-8"))
                document.close()
                self.documents[path.resolve()] = document
            except (OSError, UnicodeError) as error:
                self.fail(str(path.relative_to(self.directory)), str(error))
        public_docs = [doc for doc in self.documents.values() if is_public_document(doc.path.relative_to(self.directory))]
        for doc in self.documents.values():
            public = doc in public_docs
            self.references(doc)
            self.metadata(doc, public)
            self.content(doc, public)
        titles = [compact(doc.title) for doc in public_docs]
        if len(titles) != len(set(titles)):
            self.fail("metadata", "public pages repeat a title")
        descriptions = [doc.meta.get("description", [""])[0] for doc in public_docs]
        if len(descriptions) != len(set(descriptions)):
            self.fail("metadata", "public pages repeat a description")
        if self.counts["guides"] < 3:
            self.fail("guides", f"expected at least three complete guide exports, got {self.counts['guides']}")
        self.robots_and_sitemap(public_docs)
        self.downloads()
        self.social_png()
        self.counts["html_documents"] = len(self.documents)
        self.counts["public_pages"] = len(public_docs)
        return not self.errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--directory", type=Path, default=PROJECT / "out", help="static export directory (default: project out/)")
    parser.add_argument("--origin", help="exact HTTPS origin used to build a configured-origin export")
    arguments = parser.parse_args()
    origin = arguments.origin.rstrip("/") if arguments.origin else None
    if origin:
        parsed = urlsplit(origin)
        if parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password or parsed.path or parsed.query or parsed.fragment:
            parser.error("--origin must be an HTTPS origin without credentials, path, query or fragment")
    audit = Audit(arguments.directory, origin)
    passed = audit.run()
    print(f"{'PASS' if passed else 'FAIL'} — static export audit ({origin or 'no-origin prelaunch preview'})")
    print(f"HTML: {audit.counts['html_documents']} documents; {audit.counts['public_pages']} public pages; {audit.counts['guides']} guides")
    print(f"References: {audit.counts['internal_references']} internal destinations; {audit.counts['fragment_references']} fragment targets; {audit.counts['download_links']} HTML download links")
    print(f"Resources: {audit.counts['resource_files']} source/export matches; social PNG {audit.counts['social_png_width']}×{audit.counts['social_png_height']}; sitemap {audit.counts['sitemap_urls']} URLs")
    print(f"External/non-HTTP references skipped: {audit.counts['external_references']}/{audit.counts['non_http_references']}")
    for error in audit.errors:
        print(f"  ERROR {error}")
    print("Scope: generated HTML/assets only. Browser behavior, visual quality, field performance and real signup/enquiry delivery require separate verification.")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
