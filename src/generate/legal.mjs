// Legal and regulatory pages. The firm will supply approved wording (client document, item 8).
// Pages contain the structure each document needs, factual statements about how this website works,
// and clearly marked placeholders. Nothing here is legal wording approved by the firm.
const PAGES = [
  ["/legal/privacy-notice/", "Privacy notice", "How Confidère Legal collects, uses and protects personal information.", "privacy"],
  ["/legal/cookie-policy/", "Cookie policy", "The cookies and similar technologies this website uses, and how to control them.", "cookies"],
  ["/legal/terms-of-use/", "Website terms of use", "The terms that apply to using this website.", "terms"],
  ["/legal/terms-of-business/", "Terms of business", "The standard terms on which we provide legal services.", "business"],
  ["/legal/complaints/", "Complaints procedure", "How to raise a concern about our service, and what happens next.", "complaints"],
  ["/legal/fees-transparency/", "Fees and service transparency", "Price and service information published in line with the transparency rules for regulated law firms.", "transparency"],
  ["/legal/accessibility/", "Accessibility statement", "How we make this website accessible, and how to tell us about a problem.", "accessibility"],
];

const pending = (what = "Approved wording") => `<div class="placeholder-block"><strong>${what} to be supplied by Confidère Legal</strong>This section will be completed with wording prepared and approved by the firm before launch.</div>`;
const skeleton = (headings) => headings.map((h) => `<h2>${h}</h2>${pending()}`).join("\n");

export function pages(ctx) {
  const { tbc, tokens } = ctx;
  const nav = (current) => `<nav class="legal-nav" aria-label="Legal and regulatory pages"><p>Legal and regulatory</p><ul>
      <li><a href="/legal/"${current === "/legal/" ? ' aria-current="page"' : ""}>Overview</a></li>
      ${PAGES.map(([p, t]) => `<li><a href="${p}"${current === p ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}
    </ul></nav>`;
  const shell = (path, title, intro, content) => `
<main id="main">
  <section class="page-hero page-hero--plain" aria-labelledby="page-title">
    <div class="container container--wide page-hero__inner">
      <!--breadcrumbs-->
      <span class="eyebrow eyebrow--rule">Legal and regulatory</span>
      <h1 class="h1 page-hero__title" id="page-title">${title}</h1>
      <p class="lead page-hero__lead">${intro}</p>
    </div>
  </section>
  <section class="section" style="padding-top:var(--s-7)">
    <div class="container container--wide legal-layout">
      ${nav(path)}
      <div class="prose">${content}</div>
    </div>
  </section>
</main>`;

  const content = {
    privacy: `
      ${pending("Privacy notice")}
      <h2>What this notice will cover</h2>
      <ul><li>Who we are and how to contact us about your personal information</li><li>The information we collect, including through enquiry, booking and estimate forms on this website</li><li>Why we use it and our lawful bases</li><li>Who we share it with, including service providers</li><li>How long we keep it</li><li>International transfers</li><li>Your rights, and how to complain to the Information Commissioner’s Office</li></ul>
      <h2>Our ICO registration</h2><p>ICO registration number: ${tbc()}.</p>`,
    cookies: `
      <p>This page explains the cookies and similar technologies used on this website. Non-essential cookies are switched off unless you agree to them, and you can change your choice at any time.</p>
      <p><button class="btn btn--navy btn--sm" type="button" data-consent-action="manage">Change cookie settings</button></p>
      <h2>What we use today</h2>
      <div class="table-wrap"><table class="table table--stack">
        <thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr></thead>
        <tbody><tr><th scope="row">cl_consent_v1</th><td data-label="Type">Browser storage, strictly necessary</td><td data-label="Purpose">Remembers your cookie choices so we do not ask again on every page.</td><td data-label="Duration">Until you clear your browser storage</td></tr></tbody>
      </table></div>
      <p><strong>Embedded media.</strong> Some pages can show a background video hosted on YouTube, using YouTube’s privacy-enhanced mode. It only loads if you allow embedded media, and YouTube may then set its own cookies or similar storage, under <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy<span class="sr-only"> (opens in a new tab)</span></a>.</p>
      <p>We do not currently use analytics or marketing cookies. If we introduce them, they will be listed here and will only be set if you agree.</p>
      ${pending("Full cookie policy")}`,
    terms: skeleton(["About these terms", "Using this website", "Information on this website is not legal advice", "Links to other websites", "Our liability", "Governing law"]),
    business: skeleton(["Who we are and our regulator", "The services we provide", "Fees, VAT and third-party fees", "Billing and payment", "Your responsibilities", "Confidentiality and data protection", "Complaints", "Ending our services"]),
    complaints: `
      <p>We want to hear if you are unhappy with our service, so we can put things right.</p>
      ${pending("Complaints procedure")}
      <h2>How to complain to us</h2><p>Contact details for complaints: ${tbc()}.</p>
      <h2>The Legal Ombudsman</h2>
      <p>If you are not satisfied with our response, you may be able to complain to the Legal Ombudsman. Visit the <a href="https://www.legalombudsman.org.uk/" target="_blank" rel="noopener">Legal Ombudsman website<span class="sr-only"> (opens in a new tab)</span></a> for information about who can complain and the time limits that apply.</p>
      <h2>Concerns about professional conduct</h2>${pending()}`,
    transparency: `
      <p>We publish price and service information for our main services. Our current published prices are on the <a href="/fees/">Fees page</a>, and you can get an estimate with our <a href="/fees/cost-calculator/">cost calculator</a>.</p>
      ${skeleton(["Services and prices", "What is included and what is not", "Third-party fees", "Key stages and typical timescales", "Who will do the work and their experience", "Our regulator and complaints"])}`,
    accessibility: `
      <p>We want everyone to be able to use this website. It has been built with these aims:</p>
      <ul><li>Every page can be used with a keyboard, with a visible focus outline and a “skip to main content” link</li><li>Text and backgrounds meet colour contrast guidance</li><li>Forms have descriptive labels and clear error messages</li><li>Animations are reduced if you have asked your device to reduce motion</li><li>Pages work on phones, tablets and desktops, and when zoomed</li></ul>
      <h2>Compliance status</h2><p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. A formal accessibility audit is ${tbc("to be completed")}.</p>
      <h2>Tell us about a problem</h2><p>If you find something difficult to use, please tell us. Email: ${tokens.emailHtml}. Phone: ${tokens.phoneHtml}.</p>`,
  };

  const out = PAGES.map(([path, title, intro, key]) => ({
    meta: { path, title: `${title} | Confidère Legal`, description: intro, breadcrumbs: [["Legal and regulatory", "/legal/"], [title]] },
    body: shell(path, title, intro, content[key]),
  }));

  out.unshift({
    meta: { path: "/legal/", title: "Legal and regulatory information | Confidère Legal", description: "Regulatory information about Confidère Legal, and links to our privacy notice, cookie policy, terms, complaints procedure and accessibility statement.", breadcrumbs: [["Legal and regulatory"]] },
    body: shell("/legal/", "Legal and regulatory information", "Information about our firm, our regulator and the terms on which we work.", `
      <h2>About the firm</h2>
      <dl class="reg-grid">
        <div><dt>Trading name</dt><dd>Confidère Legal</dd></div>
        <div><dt>Legal entity</dt><dd>${tbc()}</dd></div>
        <div><dt>Company number</dt><dd>${tbc()} (registered in England and Wales)</dd></div>
        <div><dt>Registered office</dt><dd>${tbc()}</dd></div>
        <div><dt>VAT number</dt><dd>${tbc()}</dd></div>
        <div><dt>ICO registration</dt><dd>${tbc()}</dd></div>
      </dl>
      <h2>Regulation</h2>
      <dl class="reg-grid">
        <div><dt>Regulator</dt><dd>${tbc("Added once SRA authorisation is granted")}</dd></div>
        <div><dt>SRA number</dt><dd>${tbc()}</dd></div>
        <div><dt>Check a solicitor</dt><dd><a href="https://www.sra.org.uk/consumers/solicitor-check/" target="_blank" rel="noopener">SRA Solicitor Check<span class="sr-only"> (opens in a new tab)</span></a></dd></div>
        <div><dt>Law Society listing</dt><dd><a href="https://solicitors.lawsociety.org.uk/" target="_blank" rel="noopener">Find a Solicitor<span class="sr-only"> (opens in a new tab)</span></a> · ${tbc("listing link")}</dd></div>
        <div><dt>Complaints</dt><dd><a href="/legal/complaints/">Our complaints procedure</a> · <a href="https://www.legalombudsman.org.uk/" target="_blank" rel="noopener">Legal Ombudsman<span class="sr-only"> (opens in a new tab)</span></a></dd></div>
        <div><dt>Professional indemnity insurance</dt><dd>${tbc("Insurer and territorial coverage")}</dd></div>
      </dl>
      <div class="sra-badge-slot" style="margin-top:var(--s-6);color:#7A5F0E"><strong>SRA digital badge</strong><span>Embed code is issued by the SRA once authorisation is granted</span></div>
      <p>We advise on the law of England and Wales.</p>
      <h2>Policies and terms</h2>
      <div class="legal-index">${PAGES.map(([p, t, d]) => `<a href="${p}"><strong>${t}</strong><span>${d}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a>`).join("")}</div>`),
  });
  return out;
}
