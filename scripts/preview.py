"""Serve the static export locally, including the branded 404 page."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

EXPORT = Path(__file__).resolve().parents[1] / 'out'

class PreviewHandler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404 and (EXPORT / '404.html').is_file():
            body = (EXPORT / '404.html').read_bytes()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

if __name__ == '__main__':
    if not (EXPORT / 'index.html').is_file():
        raise SystemExit('Build the site first with npm run build.')
    print('Repairnox preview: http://127.0.0.1:3100', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 3100), partial(PreviewHandler, directory=str(EXPORT))).serve_forever()
