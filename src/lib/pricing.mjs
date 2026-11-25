// Renders fee tables from assets/data/pricing.json (build time). The calculator reads the same file in the browser.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function loadPricing(root) {
  return JSON.parse(readFileSync(join(root, "assets/data/pricing.json"), "utf8"));
}

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0 });
const TBC = '<span class="tbc">To be confirmed</span>';
const money = (n) => (n === 0 ? "Free" : gbp.format(n));

export function feeText(fee, period) {
  const per = period === "month" ? " a month" : "";
  if (!fee) return TBC;
  if (fee.type === "quote") return "On request";
  if (fee.type === "range") return fee.from == null || fee.to == null ? TBC : `${money(fee.from)} to ${money(fee.to)}${per}`;
  if (fee.amount == null) return TBC;
  return (fee.type === "from" ? "From " : "") + money(fee.amount) + per;
}

// One row per priced option (e.g. adult / child), otherwise one row per service.
export function serviceRows(service) {
  const sel = (service.questions || []).find((q) => q.type === "select" && q.options.some((o) => o.fee));
  const extras = (service.questions || [])
    .filter((q) => q.type === "count" || q.type === "toggle")
    .map((q) => (q.type === "count" ? `${q.feeLabel}: ${q.feeEach == null ? "to be confirmed" : money(q.feeEach) + " each"}` : `${q.feeLabel}: ${q.fee == null ? "to be confirmed" : money(q.fee)}`));
  const third = [...(service.thirdParty || []), ...(sel ? sel.options.flatMap((o) => o.thirdParty || []) : [])];
  const thirdHtml = third.length
    ? third.map((t) => (t.url ? `<a href="${t.url}" target="_blank" rel="noopener">${t.label}<span class="sr-only"> (opens in a new tab)</span></a>` : t.label)).join("<br>")
    : "None";
  const proposed = service.confirmed === false;
  if (sel) {
    return sel.options.map((o) => ({ name: `${service.name} — ${o.label}`, fee: feeText(o.fee || service.fee, service.period), known: !!(o.fee && (o.fee.amount != null || o.fee.type === "quote")), extras, third: thirdHtml, proposed }));
  }
  return [{ name: service.name, fee: feeText(service.fee, service.period), known: service.fee.amount != null, extras, third: thirdHtml, proposed }];
}

export function feeTable(area, { caption = "" } = {}) {
  const rows = area.services.flatMap(serviceRows);
  return `<div class="table-wrap"><table class="table table--stack">
      ${caption ? `<caption>${caption}</caption>` : ""}
      <thead><tr><th scope="col">Service</th><th scope="col">Our fee (excl. VAT)</th><th scope="col">Third-party fees (no VAT)</th></tr></thead>
      <tbody>${rows
        .map((r) => `<tr><th scope="row">${r.name}${r.extras.length ? `<small>${r.extras.join(" · ")}</small>` : ""}</th><td data-label="Our fee" class="price">${r.fee}${r.known && r.proposed ? ` <span class="tag">Proposed</span>` : ""}</td><td data-label="Third-party fees">${r.third}</td></tr>`)
        .join("")}</tbody>
    </table></div>`;
}

export function dpoTable(plans) {
  return `<div class="table-wrap"><table class="table table--stack">
      <caption>Prices exclude VAT. Proposed fees, awaiting the firm’s confirmation before publication.</caption>
      <thead><tr><th scope="col">Plan</th><th scope="col">Hours a month</th><th scope="col">Includes</th><th scope="col" class="num">Price a month</th></tr></thead>
      <tbody>${plans
        .map((p) => `<tr${p.featured ? ' class="is-feature"' : ""}><th scope="row">${p.name}</th><td data-label="Hours">${p.hours}</td><td data-label="Includes">${p.includes}</td><td data-label="Price" class="num price">${p.amount === "quote" ? "On request" : p.amount == null ? TBC : money(p.amount)}${p.confirmed === false && typeof p.amount === "number" ? ' <span class="tag">Proposed</span>' : ""}</td></tr>`)
        .join("")}</tbody>
    </table></div>`;
}
