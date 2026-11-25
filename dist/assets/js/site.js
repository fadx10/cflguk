/* Confidère Legal — shared site behaviour
   Header state · mega-menu · mobile drawer · reveal · cookie consent · tabs
   No dependencies. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header scrolled state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mega-menu ---------- */
  var megaTriggers = document.querySelectorAll("[data-mega-trigger]");
  megaTriggers.forEach(function (trigger) {
    var panel = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!panel) return;
    var item = trigger.closest("li");
    var closeTimer;
    function open() {
      clearTimeout(closeTimer);
      trigger.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      if (header) header.classList.add("mega-open");
    }
    function close() {
      trigger.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      if (header) header.classList.remove("mega-open");
    }
    trigger.addEventListener("click", function () {
      trigger.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    // Hover intent for fine pointers only
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      [item, panel].forEach(function (el) {
        el.addEventListener("mouseenter", open);
        el.addEventListener("mouseleave", function () { closeTimer = setTimeout(close, 180); });
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") { close(); trigger.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target) && !panel.contains(e.target)) close();
    });
    panel.addEventListener("focusout", function (e) {
      if (!panel.contains(e.relatedTarget) && e.relatedTarget !== trigger) close();
    });
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = document.getElementById("drawer");
  var toggles = document.querySelectorAll("[data-drawer-open]");
  var lastFocus;
  function focusables(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }
  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add("is-open"); });
    document.body.classList.add("no-scroll");
    toggles.forEach(function (t) { t.setAttribute("aria-expanded", "true"); });
    setTimeout(function () { var f = focusables(drawer)[0]; if (f) f.focus(); }, 50);
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    toggles.forEach(function (t) { t.setAttribute("aria-expanded", "false"); });
    setTimeout(function () { drawer.hidden = true; }, reduceMotion ? 0 : 400);
    if (lastFocus) lastFocus.focus();
  }
  if (drawer) {
    toggles.forEach(function (t) { t.addEventListener("click", openDrawer); });
    drawer.querySelectorAll("[data-drawer-close]").forEach(function (el) { el.addEventListener("click", closeDrawer); });
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
      if (e.key !== "Tab") return;
      var f = focusables(drawer), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    drawer.querySelectorAll(".drawer__acc").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sub = document.getElementById(btn.getAttribute("aria-controls"));
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        sub.hidden = open;
      });
    });
    window.matchMedia("(min-width: 1100px)").addEventListener("change", function (m) {
      if (m.matches && drawer.classList.contains("is-open")) closeDrawer();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Tabs (ARIA tab pattern) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        else if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
        else if (dir) { e.preventDefault(); select(tabs[(i + dir + tabs.length) % tabs.length], true); }
      });
    });
  });

  /* ---------- Carousel (scroll-snap track with prev/next buttons) ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (c) {
    var track = c.querySelector("[data-carousel-track]");
    var prev = c.querySelector("[data-carousel-prev]"), next = c.querySelector("[data-carousel-next]");
    if (!track) return;
    function step(dir) {
      var card = track.firstElementChild;
      var w = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * w, behavior: reduceMotion ? "auto" : "smooth" });
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("keydown", function (e) {
      if (e.target !== track) return;
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
    window.addEventListener("resize", update);
    update();
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ==========================================================================
     Cookie consent
     Non-essential scripts must be added as:
       <script type="text/plain" data-consent="analytics" data-src="..."></script>
     They are only activated after the visitor opts in to that category.
     ========================================================================== */
  var KEY = "cl_consent_v1";
  var CATEGORIES = ["analytics", "media", "marketing"];
  function readConsent() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function writeConsent(c) {
    c.updated = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* storage unavailable: choice applies to this page view only */ }
    return c;
  }
  function activate(consent) {
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(function (s) {
      if (!consent || !consent[s.getAttribute("data-consent")] || s.dataset.activated) return;
      var n = document.createElement("script");
      if (s.dataset.src) n.src = s.dataset.src; else n.text = s.text;
      s.dataset.activated = "1";
      s.parentNode.insertBefore(n, s.nextSibling);
    });
  }
  var banner = document.getElementById("cookie-banner");
  var dialog = document.getElementById("cookie-dialog");
  function showBanner(show) {
    if (!banner) return;
    banner.hidden = !show;
    document.body.classList.toggle("has-cookie-banner", show);
  }
  function save(choice) {
    var c = writeConsent(choice);
    showBanner(false);
    activate(c);
    ytInit();
  }
  function all(val) { var c = { necessary: true }; CATEGORIES.forEach(function (k) { c[k] = val; }); return c; }

  /* ---------- YouTube background video ----------
     <div class="yt-bg" data-yt-bg="VIDEO_ID" data-yt-start="0"></div> inside an element with [data-yt-hero].
     Loads only with "media" consent, from youtube-nocookie.com, muted and looping, behind the poster image.
     Reduced-motion visitors are never autoplayed: they get a "Play video" button instead.
     A pause button is always provided (WCAG 2.2.2). */
  function ytSend(frame, func) {
    try { frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: [] }), "https://www.youtube-nocookie.com"); } catch (e) {}
  }
  function ytLoad(box) {
    if (box.dataset.loaded) return;
    box.dataset.loaded = "1";
    var id = box.getAttribute("data-yt-bg"), start = box.getAttribute("data-yt-start") || "0";
    var hero = box.closest("[data-yt-hero]");
    var params = "autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1&start=" + start + "&origin=" + encodeURIComponent(location.origin);
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id + "?" + params;
    f.title = box.getAttribute("data-yt-title") || "Background video";
    f.setAttribute("tabindex", "-1");
    f.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    f.addEventListener("load", function () { setTimeout(function () { box.classList.add("is-playing"); }, 1200); });
    box.appendChild(f);
    var prompt = hero.querySelector("[data-yt-consent]"); if (prompt) prompt.hidden = true;
    var tog = hero.querySelector("[data-yt-toggle]");
    if (tog) {
      tog.hidden = false;
      tog.onclick = function () {
        var paused = tog.getAttribute("aria-pressed") === "true";
        ytSend(f, paused ? "playVideo" : "pauseVideo");
        tog.setAttribute("aria-pressed", String(!paused));
        tog.querySelector("[data-yt-label]").textContent = paused ? "Pause background video" : "Play background video";
        box.classList.toggle("is-paused", !paused);
      };
    }
  }
  function ytInit() {
    var c = readConsent();
    document.querySelectorAll("[data-yt-bg]").forEach(function (box) {
      if (box.dataset.loaded) return;
      var hero = box.closest("[data-yt-hero]");
      var prompt = hero && hero.querySelector("[data-yt-consent]");
      if (c && c.media && !reduceMotion) { ytLoad(box); return; }
      if (prompt) prompt.hidden = false;
    });
  }
  document.addEventListener("click", function (e) {
    var allow = e.target.closest("[data-yt-allow]");
    if (!allow) return;
    var c = readConsent() || all(false);
    c.media = true; writeConsent(c); showBanner(false); activate(c);
    var box = allow.closest("[data-yt-hero]").querySelector("[data-yt-bg]");
    ytLoad(box);
  });

  var existing = readConsent();
  if (existing) activate(existing); else showBanner(true);
  ytInit();

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-consent-action]");
    if (!t) return;
    var action = t.getAttribute("data-consent-action");
    if (action === "accept") save(all(true));
    else if (action === "reject") save(all(false));
    else if (action === "manage" && dialog) {
      var cur = readConsent() || all(false);
      CATEGORIES.forEach(function (k) { var box = dialog.querySelector('[name="' + k + '"]'); if (box) box.checked = !!cur[k]; });
      if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    } else if (action === "save" && dialog) {
      var c = { necessary: true };
      CATEGORIES.forEach(function (k) { var box = dialog.querySelector('[name="' + k + '"]'); c[k] = !!(box && box.checked); });
      save(c);
      dialog.close ? dialog.close() : dialog.removeAttribute("open");
    } else if (action === "close" && dialog) {
      dialog.close ? dialog.close() : dialog.removeAttribute("open");
    }
  });
})();
