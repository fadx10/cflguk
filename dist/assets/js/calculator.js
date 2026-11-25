/* Confidère Legal — cost calculator
   Pricing model (client brief, Annex B):
     Our fee       = base fee + (extra people × fee per extra person) + selected add-ons
     VAT           = vatRate × our fee
     Third-party   = government / court / tribunal / council fees, shown separately, no VAT
     Total         = our fee + VAT + third-party fees
   All figures come from /assets/data/pricing.json. A null amount means "not yet confirmed": the
   calculator then says so instead of guessing. */
(function () {
  "use strict";
  var root = document.querySelector("[data-calculator]");
  if (!root) return;

  var els = {
    areas: root.querySelector("[data-calc-areas]"),
    services: root.querySelector("[data-calc-services]"),
    questions: root.querySelector("[data-calc-questions]"),
    step2: root.querySelector('[data-calc-step="2"]'),
    step3: root.querySelector('[data-calc-step="3"]'),
    result: root.querySelector("[data-calc-result]"),
    lines: root.querySelector("[data-calc-lines]"),
    title: root.querySelector("[data-calc-title]"),
    note: root.querySelector("[data-calc-note]"),
    book: root.querySelector("[data-calc-book]"),
    email: document.querySelector("[data-calc-email]"),
    live: root.querySelector("[data-calc-live]"),
  };
  var data, state = { area: null, service: null, answers: {} };
  var gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 2 });
  var TBC = '<span class="tbc">To be confirmed</span>';

  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function money(n) { return n === 0 ? "Free" : gbp.format(n); }

  /* ---------- Step 1: areas ---------- */
  function renderAreas() {
    var frag = document.createDocumentFragment();
    data.areas.concat(data.quotedAreas.map(function (a) { return Object.assign({ quoted: true }, a); })).forEach(function (a) {
      var label = h("label", { class: "choice" });
      label.innerHTML = '<input type="radio" name="calc-area" value="' + esc(a.id) + '"> ' + esc(a.name);
      frag.appendChild(label);
    });
    els.areas.innerHTML = "";
    els.areas.appendChild(frag);
    var pre = new URLSearchParams(location.search).get("area");
    if (pre) { var r = els.areas.querySelector('input[value="' + CSS.escape(pre) + '"]'); if (r) { r.checked = true; selectArea(pre); } }
  }

  function selectArea(id) {
    state.area = id; state.service = null; state.answers = {};
    var area = data.areas.filter(function (a) { return a.id === id; })[0];
    els.questions.innerHTML = "";
    els.step3.setAttribute("aria-disabled", "true");
    if (!area) {
      var q = data.quotedAreas.filter(function (a) { return a.id === id; })[0];
      els.step2.setAttribute("aria-disabled", "false");
      els.services.innerHTML = '<div class="notice notice--info"><svg aria-hidden="true"><use href="#i-doc"/></svg><div><strong>Published prices for ' + esc(q.name) + ' are being finalised</strong>Book a consultation and we will confirm your fee in writing before any work starts. <a class="link-arrow" href="' + esc(base + q.page.slice(1)) + '">About ' + esc(q.name) + '</a></div></div>';
      render();
      return;
    }
    els.step2.setAttribute("aria-disabled", "false");
    var frag = document.createDocumentFragment();
    area.services.forEach(function (s) {
      var label = h("label", { class: "choice choice--card" });
      label.innerHTML = '<input type="radio" name="calc-service" value="' + esc(s.id) + '"><strong>' + esc(s.name) + "</strong><span>" + esc(s.summary || "") + "</span>";
      frag.appendChild(label);
    });
    els.services.innerHTML = '<div class="choice-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.75rem"></div>';
    els.services.firstChild.appendChild(frag);
    if (area.services.length === 1) { var only = els.services.querySelector("input"); only.checked = true; selectService(only.value); }
    var preS = new URLSearchParams(location.search).get("service");
    if (preS) { var rs = els.services.querySelector('input[value="' + CSS.escape(preS) + '"]'); if (rs) { rs.checked = true; selectService(preS); } }
    render();
  }

  function currentArea() { return data.areas.filter(function (a) { return a.id === state.area; })[0]; }
  function currentService() { var a = currentArea(); return a && a.services.filter(function (s) { return s.id === state.service; })[0]; }

  /* ---------- Step 3: questions ---------- */
  function selectService(id) {
    state.service = id; state.answers = {};
    var s = currentService();
    els.step3.setAttribute("aria-disabled", "false");
    els.questions.innerHTML = "";
    (s.questions || []).forEach(function (q) {
      var wrap = h("div", { class: "calc__q field", "data-q": q.id });
      var qid = "q-" + s.id + "-" + q.id;
      if (q.type === "count") {
        state.answers[q.id] = q.default || q.min || 1;
        wrap.innerHTML = '<label class="label" for="' + qid + '">' + esc(q.label) + '</label><div class="stepper-num"><button type="button" data-dec aria-label="Decrease">−</button><input id="' + qid + '" type="number" inputmode="numeric" min="' + q.min + '" max="' + q.max + '" value="' + state.answers[q.id] + '"><button type="button" data-inc aria-label="Increase">+</button></div>';
        var input = wrap.querySelector("input");
        function set(v) { v = Math.max(q.min, Math.min(q.max, parseInt(v, 10) || q.min)); input.value = v; state.answers[q.id] = v; render(); }
        wrap.querySelector("[data-dec]").addEventListener("click", function () { set(state.answers[q.id] - 1); });
        wrap.querySelector("[data-inc]").addEventListener("click", function () { set(state.answers[q.id] + 1); });
        input.addEventListener("change", function () { set(input.value); });
      } else if (q.type === "select") {
        state.answers[q.id] = q.options[0].value;
        var opts = q.options.map(function (o, i) {
          return '<label class="choice"><input type="radio" name="' + qid + '" value="' + esc(o.value) + '"' + (i === 0 ? " checked" : "") + "> " + esc(o.label) + "</label>";
        }).join("");
        wrap.innerHTML = '<fieldset class="field"><legend class="label">' + esc(q.label) + '</legend><div class="choice-row" style="margin-top:.5rem">' + opts + "</div></fieldset>";
        wrap.addEventListener("change", function (e) { if (e.target.name === qid) { state.answers[q.id] = e.target.value; syncVisibility(); render(); } });
      } else if (q.type === "toggle") {
        state.answers[q.id] = false;
        wrap.innerHTML = '<label class="check"><input type="checkbox" id="' + qid + '"> <span>' + esc(q.label) + "</span></label>";
        wrap.querySelector("input").addEventListener("change", function (e) { state.answers[q.id] = e.target.checked; render(); });
      }
      if (q.showWhen) wrap.setAttribute("data-show-when-q", JSON.stringify(q.showWhen));
      els.questions.appendChild(wrap);
    });
    if (!s.questions || !s.questions.length) els.questions.innerHTML = "<p>No further questions for this service.</p>";
    syncVisibility();
    render();
  }

  function syncVisibility() {
    els.questions.querySelectorAll("[data-show-when-q]").forEach(function (w) {
      var rule = JSON.parse(w.getAttribute("data-show-when-q"));
      var ok = Object.keys(rule).every(function (k) { return state.answers[k] === rule[k]; });
      w.hidden = !ok;
      if (!ok) { var qid = w.getAttribute("data-q"); var cb = w.querySelector("input[type=checkbox]"); if (cb) { cb.checked = false; state.answers[qid] = false; } }
    });
  }

  /* ---------- Calculation ---------- */
  function estimate(s) {
    var baseFee = s.fee, extraThird = [];
    (s.questions || []).forEach(function (q) {
      if (q.type !== "select") return;
      var o = q.options.filter(function (x) { return x.value === state.answers[q.id]; })[0];
      if (!o) return;
      if (o.fee) baseFee = o.fee;
      if (o.thirdParty) extraThird = extraThird.concat(o.thirdParty);
    });
    var parts = [], lo = 0, hi = 0, known = true, isFrom = false, quote = false, isRange = false;
    function add(label, a, b) {
      parts.push({ label: label, lo: a, hi: b == null ? a : b });
      if (a == null || (b === null)) known = false; else { lo += a; hi += (b == null ? a : b); }
    }
    if (baseFee.type === "quote") quote = true;
    else if (baseFee.type === "range") { isRange = true; add("Base fee", baseFee.from, baseFee.to); }
    else { if (baseFee.type === "from") isFrom = true; add("Base fee", baseFee.amount); }

    var people = 1;
    (s.questions || []).forEach(function (q) {
      if (q.type === "count") {
        var extra = (state.answers[q.id] || q.min) - (q.included || 1);
        if (q.id === "applicants") people = state.answers[q.id];
        if (extra > 0) add(q.feeLabel + " × " + extra, q.feeEach == null ? null : q.feeEach * extra);
      }
      if (q.type === "toggle" && state.answers[q.id]) add(q.feeLabel, q.fee);
    });

    var third = (s.thirdParty || []).concat(extraThird).map(function (t) {
      var mult = t.per === "applicant" ? people : 1;
      return { label: t.label + (mult > 1 ? " × " + mult : ""), amount: t.amount == null ? null : t.amount * mult, url: t.url };
    });
    var thirdKnown = third.every(function (t) { return t.amount != null; });
    var thirdSum = third.reduce(function (a, t) { return a + (t.amount || 0); }, 0);
    return { parts: parts, known: known && !quote, quote: quote, lo: lo, hi: hi, isFrom: isFrom, isRange: isRange || lo !== hi, third: third, thirdKnown: thirdKnown, thirdSum: thirdSum };
  }

  function fmtRange(lo, hi, from, free) {
    if (free && lo === 0 && hi === 0) return "Free";
    if (from) return "From " + gbp.format(lo);
    return lo === hi ? gbp.format(lo) : gbp.format(lo) + " to " + gbp.format(hi);
  }

  function render() {
    var s = currentService();
    var params = new URLSearchParams();
    if (state.area && state.area !== "consultation") params.set("area", state.area);
    if (s) params.set("service", s.id);
    els.book.href = els.book.getAttribute("data-base-href") + (params.toString() ? "?" + params.toString() : "");

    if (!s) {
      els.title.textContent = "Your estimate";
      els.lines.innerHTML = "";
      els.note.innerHTML = '<p class="calc__placeholder">Choose a practice area and a service to see an estimate.</p>';
      if (els.email) els.email.hidden = true;
      return;
    }
    var e = estimate(s), vat = data.vatRate, per = s.period === "month" ? " a month" : "";
    els.title.textContent = s.name;
    var rows = [];
    e.parts.forEach(function (p) {
      rows.push(row(p.label, p.lo == null || p.hi == null ? TBC : fmtRange(p.lo, p.hi, e.isFrom && p.label === "Base fee", true) + per));
    });
    var ourFee = e.quote ? "On request" : e.known ? fmtRange(e.lo, e.hi, e.isFrom, true) + per : TBC;
    rows.push(row("<strong>Our fee</strong> <span class=\"sub\">excluding VAT</span>", ourFee));
    var vatTxt = e.quote ? "—" : e.known ? fmtRange(e.lo * vat, e.hi * vat, e.isFrom) + per : TBC;
    rows.push(row("VAT at " + Math.round(vat * 100) + "% <span class=\"sub\">on our fee only</span>", vatTxt));
    e.third.forEach(function (t) {
      var link = t.url ? ' <a href="' + esc(t.url) + '" target="_blank" rel="noopener">Official fees<span class="sr-only"> (opens in a new tab)</span></a>' : "";
      rows.push(row(esc(t.label) + ' <span class="sub">Set by a third party, no VAT.' + link + "</span>", t.amount == null ? '<span class="tbc">Varies</span>' : money(t.amount)));
    });
    var total;
    if (e.quote) total = "On request";
    else if (e.known && e.thirdKnown) total = fmtRange(e.lo * (1 + vat) + e.thirdSum, e.hi * (1 + vat) + e.thirdSum, e.isFrom) + per;
    else if (e.known && !e.third.length) total = fmtRange(e.lo * (1 + vat), e.hi * (1 + vat), e.isFrom) + per;
    else if (e.known) total = fmtRange(e.lo * (1 + vat), e.hi * (1 + vat), e.isFrom) + per + ' <span class="sub">plus third-party fees</span>';
    else total = TBC;
    els.lines.innerHTML = rows.join("") + '<div class="total"><dt>Estimated total</dt><dd>' + total + "</dd></div>";

    var notes = [];
    if (!s.confirmed && e.known) notes.push('<span class="tag">Proposed fee</span> These figures are proposed and awaiting the firm’s final confirmation.');
    if (!e.known && !e.quote) notes.push("Our fee for this service is being finalised. Book a consultation and we will confirm it in writing before we start.");
    els.note.innerHTML = notes.map(function (n) { return '<p class="calc__placeholder">' + n + "</p>"; }).join("");
    if (els.email) els.email.hidden = false;
    if (els.live) els.live.textContent = "Estimate updated for " + s.name + ". Estimated total: " + els.lines.querySelector(".total dd").textContent;
  }
  function row(label, value) { return "<div><dt>" + label + "</dt><dd>" + value + "</dd></div>"; }

  function summaryText() {
    var s = currentService(); if (!s) return "";
    var lines = [s.name];
    els.lines.querySelectorAll("div").forEach(function (d) { lines.push(d.querySelector("dt").textContent.trim() + ": " + d.querySelector("dd").textContent.trim()); });
    return lines.join("\n");
  }

  /* ---------- Events ---------- */
  root.addEventListener("change", function (e) {
    if (e.target.name === "calc-area") selectArea(e.target.value);
    if (e.target.name === "calc-service") selectService(e.target.value);
  });
  if (els.email) {
    els.email.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!window.CLForms) return;
      var box = els.email.querySelector("[data-form-status]"); if (box) box.hidden = true;
      if (!window.CLForms.validate(els.email)) return;
      window.CLForms.submit(els.email, { area: state.area, service: state.service, estimate: summaryText() });
    });
  }

  var base = root.getAttribute("data-base") || "";
  fetch(root.getAttribute("data-pricing"))
    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
    .then(function (json) { data = json; renderAreas(); render(); root.querySelector("[data-calc-loading]").hidden = true; })
    .catch(function () {
      root.querySelector("[data-calc-loading]").innerHTML = '<div class="form-status form-status--error"><h3>The calculator could not load its prices</h3><p>Please refresh the page, or see our published fees.</p></div>';
    });
})();
