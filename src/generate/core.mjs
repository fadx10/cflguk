// Core pages: services overview, about, team, product, fees, calculator, booking, contact, insights, 404.
import { enquiryForm, countrySelect, areaSelect, privacy, spam, sensitiveNote } from "../lib/fields.mjs";
import { loadPricing, feeTable, dpoTable } from "../lib/pricing.mjs";
import { AREAS } from "./practice.mjs";

const arrow = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
const btnArrow = '<svg class="arrow" aria-hidden="true"><use href="#i-arrow"/></svg>';

const plainHero = ({ eyebrow, title, lead, actions = "", id = "page-title" }) => `
  <section class="page-hero page-hero--plain" aria-labelledby="${id}">
    <div class="container container--wide page-hero__inner">
      <!--breadcrumbs-->
      <span class="eyebrow eyebrow--rule rise">${eyebrow}</span>
      <h1 class="h1 page-hero__title rise rise-d1" id="${id}">${title}</h1>
      ${lead ? `<p class="lead page-hero__lead rise rise-d2">${lead}</p>` : ""}
      ${actions ? `<div class="btn-row rise rise-d3">${actions}</div>` : ""}
    </div>
  </section>`;

const ctaBand = (title = "Let’s talk about how we can help.", text = "Book a phone, video or in-person consultation. It takes about three minutes.") => `
  <section class="cta-band on-dark" aria-label="Book a consultation">
    <div class="container container--wide cta-band__grid">
      <div><h2 class="h2">${title}</h2><p>${text}</p></div>
      <div class="btn-row"><a class="btn" href="/book-consultation/">Book a consultation ${btnArrow}</a><a class="btn btn--outline-light" href="/contact/">Contact us</a></div>
    </div>
  </section>`;

const portrait = (initials) => `<div class="portrait-ph"><span class="portrait-ph__initials">${initials}</span><span class="portrait-ph__label">Approved portrait to follow</span></div>`;

export function pages(ctx) {
  const { tokens, cfg, tbc } = ctx;
  const pricing = loadPricing(ctx.root);
  const individual = AREAS.filter((a) => a.slug !== "technology-data-ai-governance");
  const out = [];
  const add = (meta, body) => out.push({ meta, body });

  /* ======================= SERVICES OVERVIEW ======================= */
  const short = {
    "family-law": "Divorce and separation, finances, children and protection orders.",
    immigration: "UK visas, sponsor licences, settlement, citizenship and appeals.",
    "criminal-defence": "From police station advice through to trial, including local authority prosecutions.",
    "licensing-regulatory": "Premises, taxi and private hire licensing, hearings and appeals.",
    "property-housing": "First-tier Tribunal appeals, local authority enforcement, and landlord and tenant matters.",
  };
  add({ path: "/services/", title: "Legal services | Confidère Legal", description: "Legal services for individuals, families and businesses: family, immigration, criminal defence, licensing and regulatory, property and housing, and technology, data and AI governance.", section: "services", breadcrumbs: [["Services"]] }, `
<main id="main">
  ${plainHero({ eyebrow: "Services", title: "How we can help", lead: "Practical advice on the law of England and Wales for individuals, families and businesses. Choose an area to see what we handle, how we work and what it costs." })}
  <section class="section" aria-labelledby="ind-title">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">For individuals and families</span><h2 class="h2" id="ind-title">Five areas of practice</h2></div>
      <ul class="photo-cards" role="list">
        ${individual.map((a, i) => `<li class="photo-card reveal${i % 3 ? " reveal-d" + (i % 3) : ""}"><a href="/services/${a.slug}/"><span class="photo-card__img"><img src="/assets/img/${a.image}.webp" alt="" loading="lazy" width="1200" height="800"></span><span class="photo-card__t">${a.name}</span><span class="photo-card__d">${short[a.slug]}</span><span class="link-arrow">Find out more ${arrow}</span></a></li>`).join("")}
        <li class="photo-card reveal reveal-d2"><a href="/contact/"><span class="photo-card__img" style="display:grid;place-items:center;background:var(--off)"><span class="serif-italic" style="font-size:1.5rem;color:var(--navy);padding:2rem;text-align:center">Not sure which area applies?</span></span><span class="photo-card__t">Ask us</span><span class="photo-card__d">Send a short enquiry and we will point you in the right direction.</span><span class="link-arrow">Contact us ${arrow}</span></a></li>
      </ul>
    </div>
  </section>
  <section class="section bg-off" aria-labelledby="biz-title">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">For businesses</span><h2 class="h2" id="biz-title">Technology, Data and AI Governance</h2></div>
      <div class="biz-feature reveal">
        <div class="biz-feature__media figure-cover"><img src="/assets/img/glass-tower.webp" alt="" loading="lazy" width="1600" height="1067"></div>
        <div class="biz-feature__body on-dark">
          <span class="eyebrow eyebrow--rule">UK businesses</span>
          <h3>Senior support, without the full-time hire</h3>
          <p>Data protection, privacy and AI governance in one relationship, from a fractional Data Protection Officer to board-level AI governance.</p>
          <ul class="check-list" role="list"><li>Fractional Data Protection Officer</li><li>Data protection and privacy</li><li>AI governance and compliance</li><li>Cyber assurance</li><li>Technology contracts</li></ul>
          <div class="btn-row"><a class="btn" href="/services/technology-data-ai-governance/">Explore business services ${btnArrow}</a><a class="btn btn--outline-light" href="/products/confidere-app/">The Confidère app</a></div>
        </div>
      </div>
    </div>
  </section>
  ${ctaBand()}
</main>`);

  /* ======================= ABOUT ======================= */
  add({ path: "/about/", title: "About us | Confidère Legal", description: "Confidère Legal gives individuals, families and businesses straightforward legal advice from experienced solicitors, with clear prices and direct access to the person handling your matter.", section: "about", breadcrumbs: [["About us"]] }, `
<main id="main">
  <section class="page-hero page-hero--split" aria-labelledby="page-title">
    <div class="container container--wide page-hero__grid">
      <div>
        <!--breadcrumbs-->
        <span class="eyebrow eyebrow--rule rise">About us</span>
        <h1 class="h1 page-hero__title rise rise-d1" id="page-title">Straightforward legal advice from experienced solicitors.</h1>
        <p class="lead page-hero__lead rise rise-d2">We aim to be easy to reach and easy to understand, whoever you are and whatever your budget.</p>
      </div>
      <figure class="page-hero__media figure-cover rise rise-d2"><img src="/assets/img/library.webp" alt="Shelves of leather-bound law reports" width="2000" height="1333" fetchpriority="high"></figure>
    </div>
  </section>

  <section class="section" aria-labelledby="story-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Our story</span><h2 class="h2" id="story-title">Who we are</h2></div>
      <div class="prose" style="font-size:var(--fs-md)">
        <p>Confidère Legal gives individuals, families and businesses straightforward legal advice from experienced solicitors. We are based in East London.</p>
        <p>The firm is led by Managing Partner Sajid Mahmood, a solicitor with more than fifteen years’ experience in private practice and local government. That combination shapes how we work: we understand the practical demands of preparing a case, and the statutory framework within which public authorities operate.</p>
        <p>We advise individuals and families on family, immigration, criminal defence, licensing and housing matters, and give businesses senior support on data protection, privacy and AI governance.</p>
      </div>
    </div>
  </section>

  <section class="section bg-off" aria-labelledby="values-title">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">Our values</span><h2 class="h2" id="values-title">What you can expect from us</h2></div>
      <ul class="values" role="list">
        <li class="reveal"><span>i.</span><h3>Accessible</h3><p>Plain English, clear prices and appointments that fit around you, by phone, video or in person.</p></li>
        <li class="reveal reveal-d1"><span>ii.</span><h3>Experienced</h3><p>Senior solicitors handle your matter, and you deal directly with the person doing the work.</p></li>
        <li class="reveal reveal-d2"><span>iii.</span><h3>Both sides of the table</h3><p>We have acted for, and against, public authorities, so we know how cases are built.</p></li>
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="areas-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">What we do</span><h2 class="h2" id="areas-title">Areas of practice</h2><p>Advice on the law of England and Wales.</p></div>
      <div class="link-list">
        ${AREAS.map((a) => `<a href="/services/${a.slug}/"><span class="link-list__t">${a.name}</span><span class="link-list__d">${a.intro}</span><span class="link-list__go" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></a>`).join("")}
      </div>
    </div>
  </section>

  <section class="section bg-off" aria-labelledby="reg-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Regulation</span><h2 class="h2" id="reg-title">Regulatory information</h2><p>Our full regulatory details will be published here once confirmed.</p></div>
      <div>
        <div class="placeholder-block"><strong>To be confirmed before launch</strong>Regulatory status, SRA number and SRA digital badge, company details and professional indemnity insurance. These are added only once authorisation has been granted and the details approved.</div>
        <a class="link-arrow" href="/legal/" style="margin-top:var(--s-5)">Legal and regulatory information ${arrow}</a>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="team-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Our team</span><h2 class="h2" id="team-title">Small by design</h2><p>You deal directly with a senior solicitor.</p><a class="btn btn--outline" href="/team/" style="margin-top:var(--s-5)">Meet the team</a></div>
      <div class="team-grid" style="grid-template-columns:1fr 1fr">
        <article class="team-card"><a class="team-card__media" href="/team/sajid-mahmood/" tabindex="-1" aria-hidden="true">${portrait("SM")}</a><div class="team-card__body"><p class="team-card__role">Managing Partner</p><h3><a href="/team/sajid-mahmood/">Sajid Mahmood</a></h3></div></article>
        <article class="team-card"><a class="team-card__media" href="/team/sahera-begum/" tabindex="-1" aria-hidden="true">${portrait("SB")}</a><div class="team-card__body"><p class="team-card__role">${tbc("Title to confirm")}</p><h3><a href="/team/sahera-begum/">Sahera Begum</a></h3></div></article>
      </div>
    </div>
  </section>
  ${ctaBand()}
</main>`);

  /* ======================= TEAM ======================= */
  const contactDl = `<dl><div><dt>Phone</dt><dd>${tbc()}</dd></div><div><dt>Email</dt><dd>${tbc()}</dd></div></dl>`;
  add({ path: "/team/", title: "Our team | Confidère Legal", description: "Meet the Confidère Legal team. Small by design: you deal directly with a senior solicitor.", section: "team", breadcrumbs: [["Our team"]] }, `
<main id="main">
  ${plainHero({ eyebrow: "Our team", title: "Small by design", lead: "You deal directly with a senior solicitor, from your first conversation to the end of your matter." })}
  <section class="section" aria-label="Team members">
    <div class="container container--wide">
      <div class="team-grid">
        <article class="team-card reveal">
          <a class="team-card__media" href="/team/sajid-mahmood/" tabindex="-1" aria-hidden="true">${portrait("SM")}</a>
          <div class="team-card__body">
            <p class="team-card__role">Managing Partner</p>
            <h2><a href="/team/sajid-mahmood/">Sajid Mahmood</a></h2>
            <p class="team-card__meta">Solicitor (England and Wales) · Qualified 2009</p>
            <p style="margin-top:var(--s-3);font-size:.9375rem">Immigration, family, licensing and regulatory, criminal, and property and housing.</p>
            ${contactDl}
            <a class="link-arrow" href="/team/sajid-mahmood/">Full profile ${arrow}</a>
          </div>
        </article>
        <article class="team-card reveal reveal-d1">
          <a class="team-card__media" href="/team/sahera-begum/" tabindex="-1" aria-hidden="true">${portrait("SB")}</a>
          <div class="team-card__body">
            <p class="team-card__role">${tbc("Title to confirm")}</p>
            <h2><a href="/team/sahera-begum/">Sahera Begum</a></h2>
            <p class="team-card__meta">${tbc("Biography to confirm")}</p>
            ${contactDl}
            <a class="link-arrow" href="/team/sahera-begum/">Full profile ${arrow}</a>
          </div>
        </article>
      </div>
    </div>
  </section>
  ${ctaBand()}
</main>`);

  const sajidAreas = [
    ["Immigration", "Experience across all areas of immigration law, advising on a broad range of immigration matters.", "immigration"],
    ["Family", "Divorce and financial remedy proceedings.", "family-law"],
    ["Licensing and regulatory", "Work for both applicants and licensing authorities, including Licensing Sub-Committee hearings, appeals against Sub-Committee decisions, and taxi and private hire licensing.", "licensing-regulatory"],
    ["Criminal and local authority offences", "Criminal and regulatory proceedings, with particular experience of local authority enforcement, including fly-tipping, Blue Badge fraud and social housing fraud.", "criminal-defence"],
    ["Property and housing", "First-tier Tribunal appeals and proceedings on improvement notices, civil financial penalties and selective licensing, and landlord and tenant matters.", "property-housing"],
  ];
  add({ path: "/team/sajid-mahmood/", title: "Sajid Mahmood, Managing Partner | Confidère Legal", description: "Sajid Mahmood is Managing Partner of Confidère Legal, a solicitor of England and Wales qualified in 2009 with experience in private practice and local government.", section: "team", breadcrumbs: [["Our team", "/team/"], ["Sajid Mahmood"]],
    schema: [{ "@context": "https://schema.org", "@type": "Person", name: "Sajid Mahmood", jobTitle: "Managing Partner", worksFor: { "@type": "LegalService", name: "Confidère Legal", url: cfg.siteUrl + "/" }, knowsAbout: sajidAreas.map((a) => a[0]), url: cfg.siteUrl + "/team/sajid-mahmood/" }] }, `
<main id="main">
  <section class="section" aria-labelledby="page-title" style="padding-top:var(--s-7)">
    <div class="container container--wide">
      <!--breadcrumbs-->
      <div class="profile" style="margin-top:var(--s-7)">
        <aside class="profile__aside">
          ${portrait("SM")}
          <dl>
            <div><dt>Role</dt><dd>Managing Partner</dd></div>
            <div><dt>Qualified</dt><dd>2009</dd></div>
            <div><dt>Admitted</dt><dd>Solicitor, England and Wales</dd></div>
            <div><dt>Phone</dt><dd>${tbc()}</dd></div>
            <div><dt>Email</dt><dd>${tbc()}</dd></div>
          </dl>
          <a class="btn" href="/book-consultation/">Book a consultation</a>
        </aside>
        <div>
          <span class="eyebrow eyebrow--rule rise">Managing Partner</span>
          <h1 class="h1 rise rise-d1" id="page-title" style="margin-top:var(--s-4)">Sajid Mahmood</h1>
          <p class="lead rise rise-d2" style="margin-top:var(--s-5)">Solicitor (England and Wales), qualified in 2009.</p>
          <div class="prose" style="margin-top:var(--s-7)">
            <p>Sajid has extensive legal experience gained in both private practice and local government. His practice combines client-facing legal work with substantial experience advising public authorities, conducting proceedings and dealing with complex regulatory and statutory enforcement matters.</p>
            <p>He understands the statutory framework within which public authorities operate, alongside the practical demands of preparing cases and presenting them before courts, tribunals and licensing committees.</p>
          </div>
          <h2 class="h3" style="margin-top:var(--s-8)">Areas of practice</h2>
          <ul class="practice-list" role="list">
            ${sajidAreas.map(([t, d, slug]) => `<li><h3><a href="/services/${slug}/">${t}</a></h3><p>${d}</p></li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>
  ${ctaBand("Speak to Sajid", "Book a phone, video or in-person consultation.")}
</main>`);

  add({ path: "/team/sahera-begum/", title: "Sahera Begum | Confidère Legal", description: "Sahera Begum, Confidère Legal.", section: "team", breadcrumbs: [["Our team", "/team/"], ["Sahera Begum"]], index: false }, `
<main id="main">
  <section class="section" aria-labelledby="page-title" style="padding-top:var(--s-7)">
    <div class="container container--wide">
      <!--breadcrumbs-->
      <div class="profile" style="margin-top:var(--s-7)">
        <aside class="profile__aside">
          ${portrait("SB")}
          <dl><div><dt>Role</dt><dd>${tbc()}</dd></div><div><dt>Phone</dt><dd>${tbc()}</dd></div><div><dt>Email</dt><dd>${tbc()}</dd></div></dl>
          <a class="btn" href="/book-consultation/">Book a consultation</a>
        </aside>
        <div>
          <span class="eyebrow eyebrow--rule">${tbc("Title to confirm")}</span>
          <h1 class="h1" id="page-title" style="margin-top:var(--s-4)">Sahera Begum</h1>
          <div class="placeholder-block" style="margin-top:var(--s-7)"><strong>Biography to be supplied</strong>Sahera’s role at the firm, background and biography will be added here once confirmed by Confidère Legal.</div>
        </div>
      </div>
    </div>
  </section>
  ${ctaBand()}
</main>`);

  /* ======================= PRODUCT ======================= */
  add({ path: "/products/confidere-app/", title: "Confidère app: data protection, privacy and AI governance | Confidère Legal", description: "Confidère is a separate software product for running a data protection, privacy compliance and AI governance programme in one place. Request a demo.", section: "products", breadcrumbs: [["Products"], ["Confidère app"]], scripts: ["forms"],
    schema: [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Confidère", applicationCategory: "BusinessApplication", description: "Data protection, privacy compliance and AI governance in one app.", url: cfg.siteUrl + "/products/confidere-app/" }] }, `
<main id="main">
  <section class="page-hero page-hero--navy on-dark" aria-labelledby="page-title">
    <div class="page-hero__bg figure-cover" aria-hidden="true"><img src="/assets/img/dark-office.webp" alt="" width="1600" height="1067"></div>
    <div class="container container--wide page-hero__inner">
      <!--breadcrumbs-->
      <span class="eyebrow eyebrow--rule rise">Products · A separate software product</span>
      <h1 class="h1 page-hero__title rise rise-d1" id="page-title">Data protection, privacy compliance and AI governance, in one app.</h1>
      <p class="lead page-hero__lead rise rise-d2">Confidère helps organisations run their data protection and AI governance programme in one place, and show regulators, clients and their board that they do.</p>
      <div class="btn-row rise rise-d3"><a class="btn" href="#demo">Request a demo ${btnArrow}</a><a class="btn btn--outline-light" href="#features">Key capabilities</a></div>
    </div>
  </section>

  <section class="section--sm" aria-label="Product disclaimer" style="padding-block:var(--s-6)">
    <div class="container container--wide"><div class="notice" role="note"><svg aria-hidden="true"><use href="#i-doc"/></svg><div><strong>Separate from our legal services</strong>Confidère is a software product provided by ${tbc("[provider entity to confirm]")}, which is separate from Confidère Legal’s legal services. Using the app is not legal advice and does not make you a client of Confidère Legal or create a solicitor–client relationship. The final product name and feature list are to be confirmed.</div></div></div>
  </section>

  <section class="section" id="features" aria-labelledby="feat-title" style="padding-top:var(--s-7)">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">Key capabilities</span><h2 class="h2" id="feat-title">What the app does</h2></div>
      <ul class="feature-grid" role="list">
        <li class="reveal"><span class="feature-grid__n">i.</span><h3>Records and data maps</h3><p>Records of processing, data maps and cross-border transfer records.</p></li>
        <li class="reveal reveal-d1"><span class="feature-grid__n">ii.</span><h3>Assessments and risk</h3><p>DPIAs, AI impact assessments and risk registers.</p></li>
        <li class="reveal reveal-d2"><span class="feature-grid__n">iii.</span><h3>Requests and breaches</h3><p>Data subject requests and breach logs, with deadlines tracked.</p></li>
        <li class="reveal"><span class="feature-grid__n">iv.</span><h3>AI governance</h3><p>AI system inventory, use case intake and risk classification.</p></li>
        <li class="reveal reveal-d1"><span class="feature-grid__n">v.</span><h3>Policies and training</h3><p>Policy library, staff training and attestations.</p></li>
        <li class="reveal reveal-d2"><span class="feature-grid__n">vi.</span><h3>Dashboards and reporting</h3><p>Dashboards and board-ready reports.</p></li>
      </ul>
    </div>
  </section>

  <section class="section bg-off" aria-labelledby="who-title">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">Who it is for</span><h2 class="h2" id="who-title">Built for organisations that need to show they are in control</h2></div>
      <div class="audience">
        <div class="audience__item"><h3>Privacy and compliance leads</h3><p>People responsible for running a data protection or AI governance programme day to day.</p></div>
        <div class="audience__item"><h3>Boards and leadership</h3><p>Leaders who need clear, regular reporting on data protection and AI risk.</p></div>
        <div class="audience__item"><h3>Growing and regulated businesses</h3><p>Organisations that need evidence for regulators, clients and auditors.</p></div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="ben-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Benefits</span><h2 class="h2" id="ben-title">Why one place matters</h2></div>
      <div class="prose" style="font-size:var(--fs-md)">
        <ul>
          <li><strong>One programme, one place.</strong> Records, assessments, requests, breaches, policies and AI systems are kept together.</li>
          <li><strong>Deadlines you can see.</strong> Data subject requests and breach logs track the dates that matter.</li>
          <li><strong>Reporting that is ready.</strong> Dashboards and board-ready reports show where you stand.</li>
          <li><strong>Frameworks covered.</strong> Designed around UK GDPR, EU GDPR and the EU AI Act, and aligned to ISO/IEC 42001 and the NIST AI RMF. ${tbc("Coverage to be confirmed")}</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section bg-off" id="demo" aria-labelledby="demo-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Request a demo</span><h2 class="h2" id="demo-title">See Confidère in action</h2><p>Tell us a little about your organisation and we will arrange a demonstration.</p><p class="small">Pricing and availability will be confirmed on request.</p></div>
      <div class="form-panel">
        <form class="form" data-form="demo" data-endpoint="${tokens.formEndpoint}" method="post" novalidate data-success-title="Thank you. Your demo request has been sent." data-success-body="We will be in touch to arrange a time.">
          <div class="form-grid">
            <div class="field"><label for="d-name">Full name<span class="req" aria-hidden="true">*</span></label><input class="input" id="d-name" name="full_name" required autocomplete="name" data-label="Full name"></div>
            <div class="field"><label for="d-email">Work email<span class="req" aria-hidden="true">*</span></label><input class="input" type="email" id="d-email" name="email" required autocomplete="email" data-label="Work email"></div>
            <div class="field"><label for="d-company">Organisation<span class="req" aria-hidden="true">*</span></label><input class="input" id="d-company" name="company" required autocomplete="organization" data-label="Organisation"></div>
            <div class="field"><label for="d-role">Your role <span class="opt">(optional)</span></label><input class="input" id="d-role" name="role" autocomplete="organization-title"></div>
            <div class="field"><label for="d-sector">Sector <span class="opt">(optional)</span></label><input class="input" id="d-sector" name="sector"></div>
            <div class="field"><label for="d-phone">Phone <span class="opt">(optional)</span></label><input class="input" type="tel" id="d-phone" name="phone" autocomplete="tel"></div>
            <div class="field span-2"><label for="d-msg">What would you like to see? <span class="opt">(optional)</span></label><textarea class="textarea" id="d-msg" name="message" maxlength="2000"></textarea></div>
          </div>
          ${privacy("d-privacy")}
          ${spam(tokens.turnstileKey)}
          <input type="hidden" name="area" value="confidere-app">
          <div class="form-actions" data-hide-on-success><button class="btn" type="submit">Request a demo</button><span class="small">Fields marked * are required.</span></div>
          <div data-form-status hidden aria-live="polite"></div>
        </form>
      </div>
    </div>
  </section>
</main>`);

  /* ======================= FEES ======================= */
  const tableFor = (id) => pricing.areas.find((a) => a.id === id);
  add({ path: "/fees/", title: "Fees and pricing | Confidère Legal", description: "Clear prices, agreed before we start. Our published fees, how VAT and third-party fees work, and a cost calculator for an estimate.", section: "fees", breadcrumbs: [["Fees and pricing"]],
    }, `
<main id="main">
  ${plainHero({ eyebrow: "Fees and pricing", title: "Clear prices, agreed before we start", lead: "Our published prices for our main services, how VAT and third-party fees work, and what is and is not included.", actions: `<a class="btn" href="/fees/cost-calculator/">Estimate your costs ${btnArrow}</a><a class="btn btn--outline" href="/book-consultation/">Book a consultation</a>` })}

  <nav class="subnav" aria-label="On this page"><div class="container container--wide"><ul>
    <li><a href="#how">How our fees work</a></li><li><a href="#immigration">Immigration</a></li><li><a href="#licensing">Licensing</a></li><li><a href="#business">Business services</a></li><li><a href="#consultation">Consultations</a></li><li><a href="#other">Other areas</a></li>
  </ul></div></nav>

  <section class="section" id="how" aria-labelledby="how-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">How our fees work</span><h2 class="h2" id="how-title">No surprises</h2></div>
      <div>
        <ol class="steps steps--grid" role="list">
          <li><span class="steps__n">Our fee</span><h3>Fixed fee or written estimate</h3><p>Where we can, we charge a fixed fee. Where we cannot, we give a written estimate or range. We confirm it before we start.</p></li>
          <li><span class="steps__n">VAT</span><h3>Added at 20%</h3><p>VAT is charged on our fee only. All prices on this page exclude VAT unless stated.</p></li>
          <li><span class="steps__n">Third-party fees</span><h3>Shown separately</h3><p>Home Office, court, tribunal and council fees are set by those bodies, are not subject to VAT here, and can change.</p></li>
          <li><span class="steps__n">In writing</span><h3>Before any work starts</h3><p>Your engagement letter sets out what is included, what is not, and the key stages of your matter.</p></li>
        </ol>
        <p class="small" style="margin-top:var(--s-6)">Prices last reviewed: ${pricing.lastReviewed || tbc()}. See also <a class="link-underline" href="/legal/fees-transparency/">fees and service transparency</a>.</p>
      </div>
    </div>
  </section>

  <section class="section bg-off" id="immigration" aria-labelledby="imm-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">For individuals and employers</span><h2 class="h2" id="imm-title">Immigration</h2><a class="link-arrow" href="/services/immigration/">About our immigration work ${arrow}</a></div>
      <div>${feeTable(tableFor("immigration"))}</div>
    </div>
  </section>

  <section class="section" id="licensing" aria-labelledby="lic-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">For businesses and drivers</span><h2 class="h2" id="lic-title">Licensing and Regulatory</h2><a class="link-arrow" href="/services/licensing-regulatory/">About our licensing work ${arrow}</a></div>
      <div>${feeTable(tableFor("licensing-regulatory"))}</div>
    </div>
  </section>

  <section class="section bg-off" id="business" aria-labelledby="biz-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">For businesses</span><h2 class="h2" id="biz-title">Technology, Data and AI Governance</h2><a class="link-arrow" href="/services/technology-data-ai-governance/">About our business services ${arrow}</a></div>
      <div>
        <h3 class="h4" style="margin-bottom:var(--s-4)">Fractional DPO retainers</h3>
        ${dpoTable(pricing.dpoPlans)}
        <h3 class="h4" style="margin:var(--s-7) 0 var(--s-4)">Fixed-scope services</h3>
        ${feeTable({ services: [tableFor("technology-data-ai-governance").services[0]] })}
      </div>
    </div>
  </section>

  <section class="section" id="consultation" aria-labelledby="con-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Getting started</span><h2 class="h2" id="con-title">Initial consultation</h2></div>
      <div>${feeTable(tableFor("consultation"))}<p class="small" style="margin-top:var(--s-4)">Whether a free initial call or a paid consultation is offered, and its length and price, are ${tbc()}.</p></div>
    </div>
  </section>

  <section class="section bg-off" id="other" aria-labelledby="oth-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Other areas</span><h2 class="h2" id="oth-title">Family, criminal defence, property and housing</h2></div>
      <div>
        <div class="notice notice--info"><svg aria-hidden="true"><use href="#i-pound"/></svg><div><strong>Published prices for these areas are being finalised</strong>We will discuss costs at your first consultation and confirm your fee or estimate in writing before any work starts.</div></div>
        <ul class="chips" role="list" style="margin-top:var(--s-5)">${pricing.quotedAreas.map((q) => `<li><a href="${q.page}">${q.name}</a></li>`).join("")}</ul>
      </div>
    </div>
  </section>

  <section class="cta-band on-dark" aria-label="Cost calculator">
    <div class="container container--wide cta-band__grid">
      <div><h2 class="h2">Get an estimate in a minute</h2><p>Choose a service, answer two or three questions, and see our fee, VAT and third-party fees separately.</p></div>
      <div class="btn-row"><a class="btn" href="/fees/cost-calculator/">Estimate your costs ${btnArrow}</a></div>
    </div>
  </section>
</main>`);

  /* ======================= CALCULATOR ======================= */
  add({ path: "/fees/cost-calculator/", title: "Cost calculator | Confidère Legal", description: "Estimate the cost of your matter: our fee, VAT and any government, court or tribunal fees, shown separately.", section: "fees", breadcrumbs: [["Fees and pricing", "/fees/"], ["Cost calculator"]], scripts: ["forms", "calculator"] }, `
<main id="main">
  ${plainHero({ eyebrow: "Cost calculator", title: "Estimate your costs", lead: "Choose a practice area and a service, answer a few questions, and see an estimate. We confirm your fee in writing before we start." })}
  <section class="section bg-off" aria-label="Calculator" style="padding-top:var(--s-7)">
    <div class="container container--wide">
      <div class="calc" data-calculator data-pricing="/assets/data/pricing.json" data-base="/">
        <div class="calc__steps">
          <div data-calc-loading><p class="small">Loading prices…</p></div>
          <noscript><div class="form-status form-status--error"><h3>The calculator needs JavaScript</h3><p>You can still see all our prices on the <a href="/fees/">Fees page</a>.</p></div></noscript>
          <fieldset class="calc__step" data-calc-step="1">
            <legend class="calc__step-h"><span class="calc__step-n">01</span> <span class="h4" style="font-family:var(--serif);color:var(--navy)">Choose a practice area</span></legend>
            <div class="calc__areas" data-calc-areas></div>
          </fieldset>
          <fieldset class="calc__step" data-calc-step="2" aria-disabled="true">
            <legend class="calc__step-h"><span class="calc__step-n">02</span> <span class="h4" style="font-family:var(--serif);color:var(--navy)">Choose a service</span></legend>
            <div data-calc-services><p class="small">Choose a practice area first.</p></div>
          </fieldset>
          <fieldset class="calc__step" data-calc-step="3" aria-disabled="true">
            <legend class="calc__step-h"><span class="calc__step-n">03</span> <span class="h4" style="font-family:var(--serif);color:var(--navy)">A few questions</span></legend>
            <div data-calc-questions><p class="small">Choose a service first.</p></div>
          </fieldset>
        </div>
        <aside class="calc__result on-dark" data-calc-result aria-labelledby="calc-result-title">
          <p class="muted">Estimate</p>
          <h2 id="calc-result-title" data-calc-title>Your estimate</h2>
          <dl class="calc__lines" data-calc-lines></dl>
          <div data-calc-note></div>
          <p class="sr-only" aria-live="polite" data-calc-live></p>
          <div class="btn-row"><a class="btn" href="/book-consultation/" data-calc-book data-base-href="/book-consultation/">Book a consultation ${btnArrow}</a></div>
          <p class="calc__disc">This is an estimate based on your answers. Our fees exclude VAT, which is added at 20%. Government, court and tribunal fees are shown separately and are set by those bodies. We will confirm your fee in writing before we start.</p>
          <form class="calc__email form" data-form="estimate" data-calc-email data-custom-submit data-endpoint="${tokens.formEndpoint}" method="post" novalidate hidden data-success-title="Estimate sent" data-success-body="We have emailed this estimate to you.">
            <div class="field"><label for="est-email">Email me this estimate</label><input class="input" type="email" id="est-email" name="email" required autocomplete="email" data-label="Email address"></div>
            <div class="field"><label class="check"><input type="checkbox" name="privacy_ack" value="yes" required data-required-msg="Please confirm you have read the Privacy Notice."> <span>I have read the <a href="/legal/privacy-notice/">Privacy Notice</a>.</span></label></div>
            ${spam(tokens.turnstileKey)}
            <div data-hide-on-success><button class="btn btn--outline-light" type="submit" style="width:100%">Send estimate</button></div>
            <div data-form-status hidden aria-live="polite"></div>
          </form>
        </aside>
      </div>
    </div>
  </section>
</main>`);

  /* ======================= BOOKING ======================= */
  const methodCard = (v, icon, t, d) => `<label class="choice choice--card"><input type="radio" name="method" value="${v}" required data-label="Consultation type"><svg aria-hidden="true"><use href="#i-${icon}"/></svg><strong>${t}</strong><span>${d}</span></label>`;
  add({ path: "/book-consultation/", title: "Book a consultation | Confidère Legal", description: "Book a phone, video or in-person consultation with Confidère Legal. It takes about three minutes.", breadcrumbs: [["Book a consultation"]], scripts: ["forms", "booking"] }, `
<main id="main">
  ${plainHero({ eyebrow: "Book a consultation", title: "Book a consultation. It takes about three minutes.", lead: "Choose your area of law and how you would like to meet, tell us when suits you, and add your details." })}
  <section class="section bg-off" aria-label="Booking form" style="padding-top:var(--s-7)">
    <div class="container container--wide booking">
      <div class="form-panel">
        <ol class="progress" data-progress role="list" aria-label="Booking progress">
          <li aria-current="step">1. Area of law</li><li>2. Consultation type</li><li>3. Date and time</li><li>4. Your details</li><li>5. Confirm</li>
        </ol>
        <form class="form" data-form="booking" data-booking data-custom-submit data-endpoint="${tokens.formEndpoint}" method="post" novalidate
          data-success-title="Request received. Your appointment is not yet confirmed." data-success-body="We have your consultation request and will email you to confirm a time. Your appointment is only booked once we confirm it.">
          <fieldset class="bstep">
            <legend class="sr-only">Step 1 of 5: area of law</legend>
            <input type="hidden" name="service" value="">
            <h2>What do you need help with?</h2>
            <p>Choose the closest match. You can explain more later.</p>
            <div class="field" style="margin-top:var(--s-5)"><label for="b-area">Area of law<span class="req" aria-hidden="true">*</span></label>${areaSelect("b-area", "")}</div>
            <div class="bstep__nav"><span></span><button class="btn" type="button" data-next>Continue ${btnArrow}</button></div>
          </fieldset>
          <fieldset class="bstep">
            <legend class="sr-only">Step 2 of 5: consultation type</legend>
            <h2>How would you like to meet?</h2>
            <div class="field"><div class="choice-grid" role="radiogroup" aria-label="Consultation type">
              ${methodCard("phone", "phone", "Phone", "We call you at the agreed time")}
              ${methodCard("video", "video", "Video call", "A secure video link is sent by email")}
              ${methodCard("in-person", "person", "In person", "At our East London office")}
            </div></div>
            <div class="bstep__nav"><button class="btn btn--outline" type="button" data-back>Back</button><button class="btn" type="button" data-next>Continue ${btnArrow}</button></div>
          </fieldset>
          <fieldset class="bstep">
            <legend class="sr-only">Step 3 of 5: date and time</legend>
            <h2>When suits you?</h2>
            <div class="notice notice--info" style="margin-top:var(--s-4)"><svg aria-hidden="true"><use href="#i-doc"/></svg><div><strong>Tell us your preferred time</strong>Live availability will appear here once our booking calendar is connected. For now, we will confirm a time with you by email.</div></div>
            <div class="form-grid" style="margin-top:var(--s-5)">
              <div class="field"><label for="b-date">Preferred date<span class="req" aria-hidden="true">*</span></label><input class="input" type="date" id="b-date" name="preferred_date" required data-label="Preferred date"></div>
              <fieldset class="field"><legend>Preferred time<span class="req" aria-hidden="true">*</span></legend><div class="choice-row">
                <label class="choice"><input type="radio" name="preferred_time" value="morning" required data-label="Preferred time"> Morning</label>
                <label class="choice"><input type="radio" name="preferred_time" value="afternoon"> Afternoon</label>
                <label class="choice"><input type="radio" name="preferred_time" value="any"> Any time</label>
              </div></fieldset>
            </div>
            <div class="bstep__nav"><button class="btn btn--outline" type="button" data-back>Back</button><button class="btn" type="button" data-next>Continue ${btnArrow}</button></div>
          </fieldset>
          <fieldset class="bstep">
            <legend class="sr-only">Step 4 of 5: your details</legend>
            <h2>Your details</h2>
            <div style="margin-top:var(--s-4)">${sensitiveNote}</div>
            <div class="form-grid" style="margin-top:var(--s-5)">
              <div class="field"><label for="b-name">Full name<span class="req" aria-hidden="true">*</span></label><input class="input" id="b-name" name="full_name" required autocomplete="name" data-label="Full name"></div>
              <div class="field"><label for="b-email">Email address<span class="req" aria-hidden="true">*</span></label><input class="input" type="email" id="b-email" name="email" required autocomplete="email" data-label="Email address"></div>
              <div class="field"><label for="b-phone">Phone number<span class="req" aria-hidden="true">*</span></label><input class="input" type="tel" id="b-phone" name="phone" required autocomplete="tel" data-label="Phone number" pattern="^\\+?[0-9 \\(\\)\\-]{7,20}$" data-pattern-msg="Enter a phone number, including the country code, for example +44 7700 900000."><span class="hint">Include the country code, for example +44.</span></div>
              <div class="field"><label for="b-country">Country of residence<span class="req" aria-hidden="true">*</span></label>${countrySelect("b-country")}</div>
              <div class="field conditional" data-show-when="area=technology-data-ai-governance|confidere-app"><label for="b-company">Company name<span class="req" aria-hidden="true">*</span></label><input class="input" id="b-company" name="company" required autocomplete="organization" data-label="Company name"></div>
              <div class="field conditional" data-show-when="area=technology-data-ai-governance|confidere-app"><label for="b-sector">Business sector <span class="opt">(optional)</span></label><input class="input" id="b-sector" name="sector"></div>
              <div class="field"><label for="b-existing">Are you an existing client? <span class="opt">(optional)</span></label><select class="select" id="b-existing" name="existing_client"><option value="">Select</option><option value="no">No</option><option value="yes">Yes</option></select></div>
              <div class="field"><label for="b-other">Name of any other party involved <span class="opt">(optional)</span></label><input class="input" id="b-other" name="other_party"><span class="hint">For our conflict check.</span></div>
              <div class="field span-2"><label for="b-msg">Briefly, how can we help?<span class="req" aria-hidden="true">*</span></label><textarea class="textarea" id="b-msg" name="message" required maxlength="2000" data-label="A brief description"></textarea></div>
              <fieldset class="field span-2"><legend>Is there a court date, hearing or deadline? <span class="opt">(optional)</span></legend><div class="choice-row"><label class="choice"><input type="radio" name="deadline" value="no"> No</label><label class="choice"><input type="radio" name="deadline" value="yes"> Yes</label></div></fieldset>
              <div class="field conditional" data-show-when="deadline=yes"><label for="b-deadline">Date of the hearing or deadline</label><input class="input" type="date" id="b-deadline" name="deadline_date"></div>
            </div>
            <div class="bstep__nav"><button class="btn btn--outline" type="button" data-back>Back</button><button class="btn" type="button" data-next>Review ${btnArrow}</button></div>
          </fieldset>
          <fieldset class="bstep">
            <legend class="sr-only">Step 5 of 5: confirm</legend>
            <h2>Check and send</h2>
            <p>We will email you to confirm a time. Your appointment is not booked until we confirm it.</p>
            <dl class="review-list" data-review></dl>
            <div style="margin-top:var(--s-5)">${privacy("b-privacy")}</div>
            ${spam(tokens.turnstileKey)}
            <div class="bstep__nav" data-hide-on-success><button class="btn btn--outline" type="button" data-back>Back</button><button class="btn" type="submit" data-busy-label="Sending">Send request</button></div>
            <div data-form-status hidden aria-live="polite"></div>
          </fieldset>
        </form>
      </div>
      <aside class="aside-card" aria-label="About consultations">
        <h2>What to expect</h2>
        <p>A first conversation with an experienced solicitor. We listen, explain your options and tell you what it will cost.</p>
        <dl>
          <div><dt>Consultation fee</dt><dd>${tbc()}</dd></div>
          <div><dt>Length</dt><dd>${tbc()}</dd></div>
          <div><dt>Office hours</dt><dd>${tbc()}</dd></div>
          <div><dt>Phone</dt><dd>${tokens.phoneHtml}</dd></div>
        </dl>
        <p class="small">Contacted by the police or a council investigator? <a class="link-underline" href="/services/criminal-defence/">See criminal defence</a>.</p>
      </aside>
    </div>
  </section>
</main>`);

  /* ======================= CONTACT ======================= */
  add({ path: "/contact/", title: "Contact us | Confidère Legal", description: "Contact Confidère Legal. Send an enquiry and we will reply to arrange a phone, video or in-person consultation.", section: "contact", breadcrumbs: [["Contact us"]], scripts: ["forms"] }, `
<main id="main">
  ${plainHero({ eyebrow: "Contact us", title: "Get in touch", lead: "Send us a short enquiry and we will reply to arrange a consultation. If you would rather choose a time now, you can book directly.", actions: `<a class="btn btn--outline" href="/book-consultation/">Book a consultation</a>` })}
  <section class="section" aria-label="Contact details and enquiry form" style="padding-top:var(--s-7)">
    <div class="container container--wide split">
      <div class="split__head">
        <h2 class="h3">Contact details</h2>
        <dl class="contact-list">
          <div><dt>Office</dt><dd>${tokens.addressHtml}</dd></div>
          <div><dt>Phone</dt><dd>${tokens.phoneHtml}</dd></div>
          <div><dt>Email</dt><dd>${tokens.emailHtml}</dd></div>
          <div><dt>Office hours</dt><dd>${tbc()}</dd></div>
          <div><dt>Urgent police station line</dt><dd>${tokens.urgentPhoneHtml}</dd></div>
        </dl>
        <div class="map-slot" role="note">A map will appear here once the office address is confirmed.</div>
      </div>
      <div class="form-panel">
        <h2 class="h3" style="margin-bottom:var(--s-5)">Send an enquiry</h2>
        ${enquiryForm({ prefix: "c", endpoint: tokens.formEndpoint, turnstileKey: tokens.turnstileKey })}
      </div>
    </div>
  </section>
</main>`);

  /* ======================= INSIGHTS ======================= */
  add({ path: "/insights/", title: "Insights: articles and legal updates | Confidère Legal", description: "Practical articles and legal updates from Confidère Legal.", section: "insights", breadcrumbs: [["Insights"]] }, `
<main id="main">
  ${plainHero({ eyebrow: "Insights", title: "Articles and legal updates", lead: "Practical guidance on the questions our clients ask most." })}
  <section class="section bg-off" aria-label="Articles" style="padding-top:var(--s-7)">
    <div class="container container--wide">
      <div class="empty">
        <span class="tbc-note">Awaiting approved content</span>
        <h2 class="h3">Our first articles are being prepared</h2>
        <p>Articles will be published here once they have been written and approved by our solicitors. They will cover the areas we advise on:</p>
        <ul class="chips" role="list">${AREAS.map((a) => `<li><a href="/services/${a.slug}/">${a.name}</a></li>`).join("")}</ul>
        <a class="btn btn--navy" href="/contact/" style="margin-top:var(--s-4)">Ask us a question</a>
      </div>
    </div>
  </section>
</main>`);

  /* ======================= 404 ======================= */
  add({ path: "/404.html", title: "Page not found | Confidère Legal", description: "The page you were looking for could not be found.", sitemap: false, index: false, absoluteLinks: true }, `
<main id="main">
  ${plainHero({ eyebrow: "Error 404", title: "We could not find that page", lead: "It may have moved, or the link may be incorrect. These pages may help.", id: "nf-title" }).replace("<!--breadcrumbs-->", "")}
  <section class="section" aria-label="Helpful links" style="padding-top:var(--s-7)">
    <div class="container container--wide">
      <div class="link-list">
        <a href="/"><span class="link-list__t">Home</span><span class="link-list__d">Start again from the homepage.</span><span class="link-list__go" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></a>
        <a href="/services/"><span class="link-list__t">Services</span><span class="link-list__d">Our areas of practice.</span><span class="link-list__go" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></a>
        <a href="/contact/"><span class="link-list__t">Contact us</span><span class="link-list__d">Send an enquiry.</span><span class="link-list__go" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></a>
      </div>
    </div>
  </section>
</main>`);

  return out;
}
