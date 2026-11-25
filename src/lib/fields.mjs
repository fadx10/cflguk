// Shared form fields (client brief §20 / information request item 5).
const CODES = "AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW".split(" ");
const names = new Intl.DisplayNames(["en-GB"], { type: "region" });
export const countries = CODES.map((c) => [c, names.of(c)]).sort((a, b) => a[1].localeCompare(b[1], "en-GB"));

export const areas = [
  ["family-law", "Family Law"],
  ["immigration", "Immigration"],
  ["criminal-defence", "Criminal Defence"],
  ["licensing-regulatory", "Licensing and Regulatory"],
  ["property-housing", "Property and Housing"],
  ["technology-data-ai-governance", "Technology, Data and AI Governance"],
  ["confidere-app", "Confidère app demo"],
  ["other", "Something else"],
];

export const countrySelect = (id, required = true) =>
  `<select class="select" id="${id}" name="country" ${required ? "required" : ""} data-label="Country of residence" autocomplete="country">
          <option value="">Select a country</option>
          <option value="GB">United Kingdom</option>
          <option disabled>──────────</option>
          ${countries.filter(([c]) => c !== "GB").map(([c, n]) => `<option value="${c}">${n}</option>`).join("")}
        </select>`;

export const areaSelect = (id, preset) =>
  `<select class="select" id="${id}" name="area" required data-label="Area of law">
          <option value="">Choose an area</option>
          ${areas.map(([v, l]) => `<option value="${v}"${v === preset ? " selected" : ""}>${l}</option>`).join("")}
        </select>`;

export const spam = (turnstileKey) => `
      <div class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      ${turnstileKey ? `<div class="cf-turnstile" data-sitekey="${turnstileKey}"></div>` : `<!-- Spam protection: honeypot + timing check. Add a Cloudflare Turnstile site key in src/config.mjs to enable a challenge. -->`}`;

export const privacy = (id) => `
      <div class="field">
        <label class="check"><input type="checkbox" id="${id}" name="privacy_ack" value="yes" required data-required-msg="Please confirm you have read the Privacy Notice."> <span>I have read the <a href="/legal/privacy-notice/">Privacy Notice</a>.<span class="req" aria-hidden="true">*</span></span></label>
      </div>
      <div class="field">
        <label class="check"><input type="checkbox" name="marketing_opt_in" value="yes"> <span>I would like to receive occasional news and updates. <span class="opt">(Optional)</span></span></label>
      </div>`;

export const sensitiveNote = `<p class="form-note"><strong>Please do not include sensitive details yet.</strong> A short summary is enough. We will ask for more once we have checked we can act for you.</p>`;

/* Full enquiry form. prefix keeps ids unique when more than one form is on a page. */
export function enquiryForm({ prefix = "enq", area = "", endpoint = "", turnstileKey = "", compact = false, heading = "" } = {}) {
  const id = (n) => `${prefix}-${n}`;
  const optional = `
        <div class="field">
          <label for="${id("existing")}">Are you an existing client? <span class="opt">(optional)</span></label>
          <select class="select" id="${id("existing")}" name="existing_client"><option value="">Select</option><option value="no">No</option><option value="yes">Yes</option></select>
        </div>
        <div class="field">
          <label for="${id("other")}">Name of any other party involved <span class="opt">(optional)</span></label>
          <input class="input" id="${id("other")}" name="other_party" autocomplete="off">
          <span class="hint">For our conflict check.</span>
        </div>
        <fieldset class="field span-2">
          <legend>Is there a court date, hearing or deadline? <span class="opt">(optional)</span></legend>
          <div class="choice-row">
            <label class="choice"><input type="radio" name="deadline" value="no"> No</label>
            <label class="choice"><input type="radio" name="deadline" value="yes"> Yes</label>
          </div>
        </fieldset>
        <div class="field conditional" data-show-when="deadline=yes">
          <label for="${id("deadline-date")}">Date of the hearing or deadline</label>
          <input class="input" type="date" id="${id("deadline-date")}" name="deadline_date">
        </div>
        <div class="field">
          <label for="${id("method")}">Preferred way to speak <span class="opt">(optional)</span></label>
          <select class="select" id="${id("method")}" name="preferred_method"><option value="">No preference</option><option value="phone">Phone</option><option value="video">Video call</option><option value="in-person">In person</option><option value="email">Email</option></select>
        </div>
        <div class="field">
          <label for="${id("time")}">Preferred time <span class="opt">(optional)</span></label>
          <select class="select" id="${id("time")}" name="preferred_time"><option value="">No preference</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option></select>
        </div>
        <div class="field">
          <label for="${id("heard")}">How did you hear about us? <span class="opt">(optional)</span></label>
          <select class="select" id="${id("heard")}" name="heard_about"><option value="">Select</option><option>Search engine</option><option>Recommendation</option><option>Social media</option><option>Existing or past client</option><option>Other</option></select>
        </div>`;

  return `<form class="form" data-form="enquiry" data-endpoint="${endpoint}" method="post" novalidate>
      ${heading}
      ${sensitiveNote}
      <div class="form-grid">
        <div class="field">
          <label for="${id("name")}">Full name<span class="req" aria-hidden="true">*</span></label>
          <input class="input" id="${id("name")}" name="full_name" required autocomplete="name" data-label="Full name">
        </div>
        <div class="field">
          <label for="${id("email")}">Email address<span class="req" aria-hidden="true">*</span></label>
          <input class="input" type="email" id="${id("email")}" name="email" required autocomplete="email" data-label="Email address">
        </div>
        <div class="field">
          <label for="${id("phone")}">Phone number<span class="req" aria-hidden="true">*</span></label>
          <input class="input" type="tel" id="${id("phone")}" name="phone" required autocomplete="tel" data-label="Phone number" pattern="^\\+?[0-9 \\(\\)\\-]{7,20}$" data-pattern-msg="Enter a phone number, including the country code, for example +44 7700 900000.">
          <span class="hint">Include the country code, for example +44.</span>
        </div>
        <div class="field">
          <label for="${id("country")}">Country of residence<span class="req" aria-hidden="true">*</span></label>
          ${countrySelect(id("country"))}
        </div>
        <div class="field span-2">
          <label for="${id("area")}">Area of law<span class="req" aria-hidden="true">*</span></label>
          ${areaSelect(id("area"), area)}
        </div>
        <div class="field conditional" data-show-when="area=technology-data-ai-governance|confidere-app">
          <label for="${id("company")}">Company name<span class="req" aria-hidden="true">*</span></label>
          <input class="input" id="${id("company")}" name="company" required autocomplete="organization" data-label="Company name">
        </div>
        <div class="field conditional" data-show-when="area=technology-data-ai-governance|confidere-app">
          <label for="${id("sector")}">Business sector <span class="opt">(optional)</span></label>
          <input class="input" id="${id("sector")}" name="sector">
        </div>
        <div class="field span-2">
          <label for="${id("message")}">Briefly, how can we help?<span class="req" aria-hidden="true">*</span></label>
          <textarea class="textarea" id="${id("message")}" name="message" required maxlength="2000" data-label="A brief description"></textarea>
          <span class="hint">2,000 characters maximum.</span>
        </div>
        ${compact ? `<details class="span-2 more-fields"><summary>Add more details (optional)</summary><div class="form-grid">${optional}</div></details>` : optional}
      </div>
      ${privacy(id("privacy"))}
      ${spam(turnstileKey)}
      <div class="form-actions" data-hide-on-success>
        <button class="btn" type="submit" data-busy-label="Sending">Send enquiry</button>
        <span class="small">Fields marked * are required.</span>
      </div>
      <div data-form-status hidden aria-live="polite"></div>
    </form>`;
}
