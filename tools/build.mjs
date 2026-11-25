// Confidère Legal — static site build (no dependencies). Usage: node tools/build.mjs
//
// Sources
//   src/pages/**/*.html        hand-written pages. First line is a meta comment:
//                              <!--meta { "path": "/about/", "title": "...", "description": "...", ... } -->
//   src/generate/*.mjs         modules exporting pages(ctx) -> [{ meta, body }] (practice areas, legal pages)
//   src/partials/*.html        head, header, footer, sprite
//   src/config.mjs             contact details, endpoints, indexable flag
//
// In sources, internal links are written root-relative ("/services/"). The build rewrites them to
// paths relative to each page so the site works from any folder or host.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync, existsSync, rmSync, cpSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
// Only the 404 page uses absolute links (it is served at any depth), so it needs the site's base path.
const basePath = ("/" + (process.env.BASE_PATH || "/").replace(/^\/+|\/+$/g, "") + "/").replace(/\/+/g, "/");
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true, filter: (p) => !p.endsWith(".DS_Store") });
writeFileSync(join(dist, ".nojekyll"), "");
const cfg = (await import(pathToFileURL(join(root, "src/config.mjs")))).default;
const part = (n) => readFileSync(join(root, "src/partials", n + ".html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p) => cfg.siteUrl.replace(/\/$/, "") + p;

// ---------- helpers exposed to generators ----------
const tbc = (label = "to confirm") => `<span class="tbc">${label}</span>`;
const tokens = {
  phoneHtml: cfg.phone ? `<a href="tel:${cfg.phone.replace(/[^+\d]/g, "")}">${esc(cfg.phone)}</a>` : tbc(),
  urgentPhoneHtml: cfg.urgentPhone ? `<a href="tel:${cfg.urgentPhone.replace(/[^+\d]/g, "")}">${esc(cfg.urgentPhone)}</a>` : tbc("number to confirm"),
  emailHtml: cfg.email ? `<a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a>` : tbc(),
  addressHtml: cfg.address ? esc(cfg.address) : `East London · ${tbc("address to confirm")}`,
  formEndpoint: cfg.formEndpoint ? esc(cfg.formEndpoint) : "",
  turnstileKey: cfg.turnstileSiteKey ? esc(cfg.turnstileSiteKey) : "",
  year: String(new Date().getFullYear()),
};
const ctx = { cfg, esc, abs, tbc, tokens, root, read: (p) => readFileSync(join(root, p), "utf8") };

// ---------- collect pages ----------
const pages = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) {
      const src = readFileSync(p, "utf8");
      const m = src.match(/^<!--meta\s+([\s\S]*?)-->\s*/);
      if (!m) throw new Error(`${relative(root, p)}: missing meta comment`);
      let meta;
      try { meta = JSON.parse(m[1]); } catch (e) { throw new Error(`${relative(root, p)}: bad meta JSON — ${e.message}`); }
      pages.push({ meta, body: src.slice(m[0].length), from: relative(root, p) });
    }
  }
}
walk(join(root, "src/pages"));
const genDir = join(root, "src/generate");
if (existsSync(genDir)) {
  for (const f of readdirSync(genDir).filter((f) => f.endsWith(".mjs")).sort()) {
    const mod = await import(pathToFileURL(join(genDir, f)));
    for (const pg of mod.pages(ctx)) pages.push({ ...pg, from: "src/generate/" + f });
  }
}

// ---------- render ----------
const outFile = (path) => (path.endsWith(".html") ? path.slice(1) : path.slice(1) + "index.html");
const depthOf = (path) => outFile(path).split("/").length - 1;
function relativise(html, depth) {
  const up = depth ? "../".repeat(depth) : "";
  return html.replace(/(\s(?:href|src|action|data-src|data-pricing|data-base|data-base-href|content-url))="\/(?!\/)([^"]*)"/g, (_, a, rest) => {
    const target = up + rest;
    return `${a}="${target === "" ? "./" : target}"`;
  });
}
function absolutise(html) {
  return html.replace(/(\s(?:href|src|action|data-src|data-pricing|data-base|data-base-href))="\/(?!\/)([^"]*)"/g, (_, a, rest) => `${a}="${basePath}${rest}"`);
}
function breadcrumbs(meta) {
  if (!meta.breadcrumbs) return { html: "", schema: null };
  const trail = [["Home", "/"], ...meta.breadcrumbs];
  const html = `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${trail
    .map(([label, href], i) => (i === trail.length - 1 || !href ? `<li><span aria-current="page">${esc(label)}</span></li>` : `<li><a href="${href}">${esc(label)}</a></li>`))
    .join("")}</ol></nav>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([label, href], i) => ({ "@type": "ListItem", position: i + 1, name: label, ...(href || i === trail.length - 1 ? { item: abs(href || meta.path) } : {}) })),
  };
  return { html, schema };
}
const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : `{{${k}}}`));

const sections = ["services", "products", "fees", "about", "team", "insights", "contact"];
const seen = new Set();
const sitemap = [];
for (const { meta, body, from } of pages) {
  if (!meta.path) throw new Error(`${from}: meta.path required`);
  if (seen.has(meta.path)) throw new Error(`duplicate path ${meta.path}`);
  seen.add(meta.path);
  const crumbs = breadcrumbs(meta);
  const schema = [...(meta.schema || []), ...(crumbs.schema ? [crumbs.schema] : [])];
  const css = (meta.css || ["site"]).map((c) => `<link rel="stylesheet" href="/assets/css/${c}.css">`).join("\n  ");
  const scripts = (meta.scripts || []).map((s) => `<script src="/assets/js/${s}.js" defer></script>`).join("\n");
  const vars = {
    ...tokens,
    title: esc(meta.title),
    description: esc(meta.description || ""),
    canonical: abs(meta.path),
    robots: cfg.indexable && meta.index !== false ? "index, follow" : "noindex, nofollow",
    css,
    schema: schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n  "),
    headerClass: meta.headerClass || "",
    designSwitcher: fill(part("design-switcher"), Object.fromEntries(["Editorial", "Counsel", "Corporate", "Modern Grid", "Typographic", "Two Paths", "Spotlight"].map((name, i) => ["current_" + (i + 1), (meta.design || (meta.path === "/" ? 1 : 0)) === i + 1 ? ' aria-current="page"' : ""]))),
    bodyClass: meta.bodyClass || "",
    scripts,
    review: meta.review ? fill(part("review"), Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((i) => ["cur" + i, meta.design === i ? ' aria-current="page"' : ""]))) : "",
  };
  for (const s of sections) vars["cur_" + s] = meta.section === s ? ' aria-current="page"' : "";

  let content = body.trim().replace("<!--breadcrumbs-->", crumbs.html);
  content = fill(content, tokens);
  const html = [
    fill(part("head"), vars),
    `<body class="${vars.bodyClass}">`,
    part("sprite"),
    meta.noChrome ? "" : fill(part("header"), vars),
    content,
    vars.designSwitcher,
    meta.noChrome ? `${vars.review}\n<script src="/assets/js/site.js" defer></script>\n</body>\n</html>\n` : fill(part("footer"), vars),
  ].join("\n");

  const out = join(dist, outFile(meta.path));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, meta.absoluteLinks ? absolutise(html) : relativise(html, depthOf(meta.path)));
  if (meta.sitemap !== false && meta.index !== false && !meta.review) sitemap.push(meta);
}

// ---------- sitemap & robots ----------
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemap.filter((m) => !m.path.endsWith(".html")).map((m) => `  <url><loc>${abs(m.path)}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`);
writeFileSync(join(dist, "robots.txt"), cfg.indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`
  : `# Pre-launch review build: crawling disabled. Set indexable: true in src/config.mjs at launch.\nUser-agent: *\nDisallow: /\n`);

console.log(`built ${pages.length} pages into dist/ · sitemap ${sitemap.length} urls · base ${basePath} · indexable=${cfg.indexable}`);
