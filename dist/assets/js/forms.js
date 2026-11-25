/* Confidère Legal — form handling
   - Accessible inline validation (native constraints + custom messages)
   - Conditional fields:  <div data-show-when="field=value|value2">
   - Prefill from URL:    ?area=family-law sets select[name=area]
   - Spam protection:     honeypot field + minimum completion time (+ Turnstile token when configured)
   - Submission:          POST JSON to form[data-endpoint]. With no endpoint configured the form
                          shows an honest "not yet connected" error. It never shows success unless
                          the server confirms receipt (HTTP 2xx). */
(function () {
  "use strict";

  var MIN_MS = 2500;

  function fieldWrap(el) { return el.closest(".field"); }

  function messageFor(el) {
    var v = el.validity, label = el.getAttribute("data-label") || "This field";
    if (v.valueMissing) {
      if (el.type === "checkbox") return el.getAttribute("data-required-msg") || "Please tick this box to continue.";
      if (el.type === "radio") return "Please choose an option.";
      return label + " is required.";
    }
    if (v.typeMismatch && el.type === "email") return "Enter an email address in the format name@example.com.";
    if (v.patternMismatch) return el.getAttribute("data-pattern-msg") || "Please check the format.";
    if (v.tooShort) return label + " must be at least " + el.minLength + " characters.";
    if (v.tooLong) return label + " must be " + el.maxLength + " characters or fewer.";
    if (v.rangeUnderflow) return el.getAttribute("data-min-msg") || label + " must be " + el.min + " or later.";
    return el.validationMessage;
  }

  function setError(el, msg) {
    var wrap = fieldWrap(el);
    if (!wrap) return;
    var err = wrap.querySelector(".field__error");
    if (!err) {
      err = document.createElement("p");
      err.className = "field__error";
      err.id = (el.id || el.name) + "-error";
      wrap.appendChild(err);
    }
    if (msg) {
      wrap.classList.add("has-error");
      err.textContent = msg;
      el.setAttribute("aria-invalid", "true");
      var d = el.getAttribute("aria-describedby") || "";
      if (d.indexOf(err.id) === -1) el.setAttribute("aria-describedby", (d + " " + err.id).trim());
    } else {
      wrap.classList.remove("has-error");
      err.textContent = "";
      el.removeAttribute("aria-invalid");
    }
  }

  function validate(scope) {
    var firstBad = null, seenRadio = {};
    scope.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (el.disabled || el.type === "hidden" || el.closest(".hp")) return;
      if (el.type === "radio") {
        if (seenRadio[el.name]) return;
        seenRadio[el.name] = true;
      }
      var ok = el.checkValidity();
      setError(el, ok ? "" : messageFor(el));
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function serialise(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) {
      if (k === "website" || k === "_ts") return;
      if (data[k] !== undefined) data[k] = [].concat(data[k], v); else data[k] = v;
    });
    return data;
  }

  function status(form, kind, title, body) {
    var box = form.querySelector("[data-form-status]");
    if (!box) return;
    box.hidden = false;
    box.className = "form-status form-status--" + kind;
    box.setAttribute("role", kind === "error" ? "alert" : "status");
    box.innerHTML = "<h3></h3><p></p>";
    box.querySelector("h3").textContent = title;
    box.querySelector("p").textContent = body;
    box.setAttribute("tabindex", "-1");
    box.focus({ preventScroll: false });
  }

  function busy(btn, on) {
    if (!btn) return;
    btn.setAttribute("aria-busy", on ? "true" : "false");
    btn.disabled = on;
    if (on) { btn.dataset.label = btn.textContent; btn.textContent = btn.getAttribute("data-busy-label") || "Sending"; }
    else if (btn.dataset.label) btn.textContent = btn.dataset.label;
  }

  /* Public: submit(form, extraData) -> Promise<boolean> */
  function submit(form, extra) {
    var btn = form.querySelector('[type="submit"]');
    var endpoint = form.getAttribute("data-endpoint") || "";
    var started = Number(form.getAttribute("data-started") || 0);
    var hp = form.querySelector('.hp input');

    if (hp && hp.value) { status(form, "error", "We could not send this form", "Please try again, or contact us directly."); return Promise.resolve(false); }
    if (Date.now() - started < MIN_MS) { status(form, "error", "That was quick", "Please check your details and press send again."); form.setAttribute("data-started", String(Date.now() - MIN_MS)); return Promise.resolve(false); }

    if (!endpoint) {
      status(form, "error", "Online sending is not connected yet",
        "This form has not been connected to the firm’s email service yet, so nothing has been sent. Please try again later or use the contact details on this page once they are published.");
      return Promise.resolve(false);
    }

    var payload = Object.assign({ form: form.getAttribute("data-form"), page: location.pathname, submittedAt: new Date().toISOString() }, serialise(form), extra || {});
    busy(btn, true);
    return fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (res) {
        busy(btn, false);
        if (!res.ok) throw new Error("HTTP " + res.status);
        status(form, "success", form.getAttribute("data-success-title") || "Thank you. Your enquiry has been sent.",
          form.getAttribute("data-success-body") || "We have received your message and will reply as soon as we can. A copy has been sent to your email address.");
        form.querySelectorAll("[data-hide-on-success]").forEach(function (el) { el.hidden = true; });
        return true;
      })
      .catch(function () {
        busy(btn, false);
        status(form, "error", "Your message was not sent", "Something went wrong on our side. Your details are still in the form, so please try again in a moment.");
        return false;
      });
  }

  function applyConditionals(form) {
    form.querySelectorAll("[data-show-when]").forEach(function (block) {
      var rule = block.getAttribute("data-show-when").split("=");
      var name = rule[0], values = rule[1].split("|");
      var el = form.elements[name];
      var val = "";
      if (!el) return;
      if (el.length && !el.tagName) { Array.prototype.forEach.call(el, function (r) { if (r.checked) val = r.value; }); }
      else if (el.type === "checkbox") val = el.checked ? el.value : "";
      else val = el.value;
      var show = values.indexOf(val) !== -1;
      block.hidden = !show;
      block.querySelectorAll("input, select, textarea").forEach(function (i) { i.disabled = !show; });
    });
  }

  function prefill(form) {
    var params = new URLSearchParams(location.search);
    params.forEach(function (v, k) {
      var el = form.elements[k];
      if (!el || !v) return;
      if (el.tagName === "SELECT") { if (Array.prototype.some.call(el.options, function (o) { return o.value === v; })) el.value = v; }
      else if (el.length && !el.tagName) { Array.prototype.forEach.call(el, function (r) { if (r.value === v) r.checked = true; }); }
      else if (el.type === "hidden") el.value = v;
    });
  }

  function init(form) {
    form.setAttribute("novalidate", "");
    form.setAttribute("data-started", String(Date.now()));
    prefill(form);
    applyConditionals(form);
    form.addEventListener("change", function (e) {
      applyConditionals(form);
      if (e.target.matches("input, select, textarea") && fieldWrap(e.target) && fieldWrap(e.target).classList.contains("has-error")) setError(e.target, e.target.checkValidity() ? "" : messageFor(e.target));
    });
    form.addEventListener("input", function (e) {
      var w = fieldWrap(e.target);
      if (w && w.classList.contains("has-error") && e.target.checkValidity()) setError(e.target, "");
    });
    if (form.hasAttribute("data-custom-submit")) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = form.querySelector("[data-form-status]");
      if (box) box.hidden = true;
      if (!validate(form)) return;
      submit(form);
    });
  }

  window.CLForms = { validate: validate, submit: submit, serialise: serialise, applyConditionals: applyConditionals, status: status };
  document.querySelectorAll("form[data-form]").forEach(init);
})();
