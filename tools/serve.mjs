// Minimal static preview server for dist/ (no dependencies). Usage: node tools/build.mjs && node tools/serve.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || process.argv[2] || 4321);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain" };

createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, p);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    try { return res.end(await readFile(join(root, "404.html"))); } catch {}
    res.end(`<!doctype html><meta charset="utf-8"><title>Page not built yet</title><body style="font:16px/1.6 system-ui;padding:4rem;max-width:40rem;color:#1F2A44"><h1 style="font-family:Georgia,serif;font-weight:400">This page is part of the next build phase</h1><p>The homepage designs are ready for review. Inner pages (${p}) will be built once a design direction is chosen.</p><p><a href="/" style="color:#1C7C5F">Back to the design options</a></p></body>`);
  }
}).listen(port, "localhost", () => console.log(`Serving on http://localhost:${port}`));
