/* Confidère Legal — consultation booking (5 steps)
   Without a connected scheduling system this collects a *preferred* date and time and sends a
   consultation request. It never tells the visitor an appointment is booked: the firm confirms by email.
   Without JavaScript every step is shown as one long form. */
(function () {
  "use strict";
  var form = document.querySelector("[data-booking]");
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll(".bstep"));
  var progress = Array.prototype.slice.call(document.querySelectorAll("[data-progress] li"));
  var current = 0;

  // Earliest preferred date: tomorrow
  var date = form.querySelector('input[type="date"][name="preferred_date"]');
  if (date) {
    var t = new Date(); t.setDate(t.getDate() + 1);
    date.min = t.toISOString().slice(0, 10);
    date.setAttribute("data-min-msg", "Please choose a date from tomorrow onwards.");
  }

  function show(i, focus) {
    current = i;
    steps.forEach(function (s, k) { s.hidden = k !== i; });
    progress.forEach(function (p, k) {
      p.classList.toggle("is-done", k < i);
      if (k === i) p.setAttribute("aria-current", "step"); else p.removeAttribute("aria-current");
    });
    if (i === steps.length - 1) review();
    if (focus) {
      var h = steps[i].querySelector("h2");
      h.setAttribute("tabindex", "-1");
      h.focus();
      var top = form.getBoundingClientRect().top + window.scrollY - 120;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  function label(name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.tagName === "SELECT") return el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : "";
    if (el.length && !el.tagName) {
      var out = "";
      Array.prototype.forEach.call(el, function (r) { if (r.checked) out = r.closest("label").querySelector("strong") ? r.closest("label").querySelector("strong").textContent : r.closest("label").textContent.trim(); });
      return out;
    }
    return el.value;
  }

  function review() {
    var list = form.querySelector("[data-review]");
    var when = [label("preferred_date") ? new Date(label("preferred_date") + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "", label("preferred_time")].filter(Boolean).join(", ");
    var rows = [
      ["Area of law", label("area"), 0],
      ["Consultation", label("method"), 1],
      ["Preferred time", when + " (to be confirmed by us)", 2],
      ["Name", label("full_name"), 3],
      ["Email", label("email"), 3],
      ["Phone", label("phone"), 3],
    ];
    list.innerHTML = rows.map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd></dd><button type="button" data-goto="' + r[2] + '">Change<span class="sr-only"> ' + r[0].toLowerCase() + "</span></button></div>";
    }).join("");
    list.querySelectorAll("dd").forEach(function (dd, i) { dd.textContent = rows[i][1] || "—"; });
  }

  form.addEventListener("click", function (e) {
    var next = e.target.closest("[data-next]"), back = e.target.closest("[data-back]"), go = e.target.closest("[data-goto]");
    if (next) { if (window.CLForms.validate(steps[current])) show(current + 1, true); }
    if (back) show(current - 1, true);
    if (go) show(Number(go.getAttribute("data-goto")), true);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var box = form.querySelector("[data-form-status]"); if (box) box.hidden = true;
    for (var i = 0; i < steps.length; i++) {
      if (!window.CLForms.validate(steps[i])) { show(i, false); window.CLForms.validate(steps[i]); return; }
    }
    window.CLForms.submit(form, { request_type: "consultation_request", confirmed_booking: false });
  });

  form.classList.add("is-stepped");
  show(0, false);
})();
