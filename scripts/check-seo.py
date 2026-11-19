"""Check the rendered site, including crawlability and trial destinations. No emails sent."""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

base = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:3100"
production = "https://repairnox.com"


def fetch(path):
    request = urllib.request.Request(base + path, headers={"User-Agent": "RepairNox-SEO-Check/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.status, response.headers, response.read()


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.links, self.canonical, self.schema = {}, [], [], []
        self.title, self.headings = "", []
        self.in_title = self.in_h1 = self.in_schema = False
        self.heading = self.script = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            self.meta[attrs.get("name", attrs.get("property", ""))] = attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href"))
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "title":
            self.in_title = True
        if tag == "h1":
            self.in_h1 = True
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_schema = True

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_h1:
            self.heading += data
        if self.in_schema:
            self.script += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "h1":
            self.headings.append(self.heading.strip())
            self.heading, self.in_h1 = "", False
        if tag == "script" and self.in_schema:
            self.schema.append(json.loads(self.script))
            self.script, self.in_schema = "", False


_, _, sitemap = fetch("/sitemap.xml")
urls = [element.text for element in ET.fromstring(sitemap).findall("{*}url/{*}loc")]
assert len(urls) == len(set(urls)), "Duplicate sitemap URLs"
assert len(urls) >= 15, "New content missing from sitemap"
paths = [urllib.parse.urlsplit(url).path or "/" for url in urls]
titles, descriptions, linked_paths = set(), set(), set()


def inspect(path):
    status, headers, body = fetch(path)
    page = Page()
    page.feed(body.decode())
    assert status == 200, (path, status)
    assert "noindex" not in headers.get("X-Robots-Tag", "").lower(), path
    assert "noindex" not in page.meta.get("robots", "").lower(), path
    assert page.title and page.meta.get("description"), (path, "Missing metadata")
    assert len(page.headings) == 1 and page.headings[0], (path, "Expected one readable H1")
    assert len(page.canonical) == 1, (path, "Expected one canonical")
    assert page.canonical[0].rstrip("/") == (production + path).rstrip("/"), (path, page.canonical)
    assert any(item.get("@type") == "Organization" for item in page.schema), (path, "Organization schema")
    if path.startswith(("/industries", "/guides")) or path == "/about":
        assert page.meta.get("og:url", "").rstrip("/") == (production + path).rstrip("/"), (path, "Open Graph URL")
        assert page.meta.get("og:image"), (path, "Share image")
        assert any(item.get("@type") == "BreadcrumbList" for item in page.schema), (path, "Breadcrumb schema")
        assert any(link.startswith("/contact?topic=trial") for link in page.links), (path, "Trial destination")
    return path, page


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for path, page in pool.map(inspect, paths):
        assert page.title not in titles, (path, "Duplicate title")
        assert page.meta["description"] not in descriptions, (path, "Duplicate description")
        titles.add(page.title)
        descriptions.add(page.meta["description"])
        for link in page.links:
            parsed = urllib.parse.urlsplit(link)
            if not parsed.netloc or parsed.netloc == "repairnox.com":
                linked_paths.add(parsed.path or "/")
        print("PASS", path)

assert set(paths) <= linked_paths, ("Unlinked sitemap pages", set(paths) - linked_paths)
_, _, robots = fetch("/robots.txt")
assert b"Sitemap: https://repairnox.com/sitemap.xml" in robots
assert b"Disallow: /\n" not in robots
for path in ["/industries/does-not-exist", "/guides/does-not-exist"]:
    try:
        fetch(path)
        raise AssertionError((path, "Expected 404"))
    except urllib.error.HTTPError as error:
        assert error.code == 404, (path, error.code)
_, headers, png = fetch("/opengraph-image")
assert "image/png" in headers.get("Content-Type", "") and png.startswith(b"\x89PNG")
print(f"PASS: {len(paths)} pages, unique metadata, canonicals, schema, internal discovery, trial links, robots, real 404s, and share image")
