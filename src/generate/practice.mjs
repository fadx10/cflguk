// Practice area pages. Content is taken from the client's website information document (Annex A and
// Sajid Mahmood's biography), limited to UK services. FAQs are deliberately process-focused and make
// no promises about outcomes. All legal wording must be approved by the firm before launch.
import { enquiryForm } from "../lib/fields.mjs";
import { loadPricing, feeTable, dpoTable } from "../lib/pricing.mjs";

const AREAS = [
  {
    slug: "family-law", name: "Family Law", audience: "For individuals and families",
    hero: "split", image: "consultation", imageAlt: "A solicitor and client talking at a meeting table",
    title: "Family law advice that is clear, practical and calm.",
    intro: "Clear, practical advice on separation, finances and children, from first questions through to court applications.",
    meta: "Family law solicitors advising on divorce, financial remedies, child arrangements and protection orders under the law of England and Wales.",
    what: [
      "Family law covers the legal side of relationships and family life: ending a marriage or civil partnership, dividing finances, making arrangements for children, and seeking protection where there is abuse or a risk of harm.",
      "We explain each option open to you, what it is likely to cost and what happens next, so you can make decisions with a clear view of the road ahead.",
    ],
    help: ["Explain your options in plain English", "Negotiate with the other party or their solicitor", "Prepare and draft agreements, applications and consent orders", "Represent you in proceedings", "Make urgent applications where protection is needed"],
    special: "safety",
    groups: [
      { t: "Divorce and separation", items: ["Divorce and separation", "Dissolution of civil partnerships", "Judicial separation"] },
      { t: "Finances", items: ["Financial remedy proceedings", "Consent orders", "Financial relief after an overseas divorce", "Pre-nuptial and post-nuptial agreements", "Maintenance and pension sharing"] },
      { t: "Children", items: ["Child arrangements", "Specific issue and prohibited steps orders", "Relocation", "International child abduction cases"] },
      { t: "Protection", items: ["Non-molestation orders", "Occupation orders", "Urgent applications"] },
    ],
    who: [
      { t: "Separating couples", d: "Married couples and civil partners who are separating, and need advice on the process and on finances." },
      { t: "Parents", d: "Parents who need to agree, or ask the court to decide, arrangements for their children." },
      { t: "Couples planning ahead", d: "Couples who want a pre-nuptial or post-nuptial agreement to set out how finances would be dealt with." },
    ],
    laws: ["Matrimonial Causes Act 1973", "Divorce, Dissolution and Separation Act 2020", "Children Act 1989", "Family Law Act 1996", "1980 Hague Convention"],
    steps: [
      ["First conversation", "We listen, explain the options open to you and what each is likely to cost."],
      ["Clear plan", "A fixed fee or written estimate, with the steps and documents involved."],
      ["Negotiation or proceedings", "We negotiate on your behalf and, where needed, prepare and present your application."],
      ["Resolution", "We draw up the agreement or order and explain what happens next."],
    ],
    faqs: [
      ["How much will my family matter cost?", "It depends on the type of matter and whether it can be agreed. Before we start, we give you a fixed fee or a written estimate and explain what is and is not included. Court fees are separate. Published prices for family matters are being finalised and will appear on our Fees page."],
      ["Will my case have to go to court?", "Not always. Many family matters are resolved by agreement, which can then be recorded in a court order. We will explain whether proceedings are likely in your circumstances and why."],
      ["Can we meet by video?", "Yes. Appointments are available by phone, by video call or in person."],
      ["What should I bring to a first meeting?", "Any letters or court papers you have received, details of any dates or deadlines, and a short note of the key events. We will tell you if we need anything else."],
    ],
    cta: "Book a family law consultation",
  },
  {
    slug: "immigration", name: "Immigration", audience: "For individuals, families and employers",
    hero: "wide", image: "westminster-bus", imageAlt: "A red London bus passing the Houses of Parliament",
    title: "UK immigration advice, from first application to appeal.",
    intro: "Careful advice on UK visas, sponsor licences, settlement and citizenship, and on challenging a refusal.",
    meta: "UK immigration solicitors advising on Skilled Worker, Global Talent and family visas, sponsor licences, settlement, citizenship, appeals and judicial review.",
    what: [
      "Immigration law decides who can come to, stay in and settle in the UK, and on what terms. Applications are detailed and evidence-heavy, and a refusal can have serious consequences for individuals, families and employers.",
      "We advise on the right route, prepare applications carefully, and act on refusals through administrative review, appeal or judicial review. Our Managing Partner has experience across all areas of immigration law.",
    ],
    help: ["Identify the right route and check eligibility", "Prepare a clear list of the evidence you need", "Prepare and submit your application", "Advise employers on sponsor licences and compliance", "Challenge refusals by review, appeal or judicial review"],
    special: "noGuarantee",
    groups: [
      { t: "Work and business", items: ["Skilled Worker visas", "Global Talent visas", "Global Business Mobility visas", "Sponsor licences and compliance"] },
      { t: "Family", items: ["Spouse and partner applications", "Parent applications", "Child applications"] },
      { t: "Settlement and citizenship", items: ["Indefinite leave to remain", "British citizenship"] },
      { t: "Visitors and students", items: ["Visitor routes", "Student routes"] },
      { t: "Refusals and challenges", items: ["Administrative review", "First-tier Tribunal appeals", "Judicial review"] },
    ],
    groupCols: 3,
    who: [
      { t: "Individuals and families", d: "People applying to visit, work, study, join family, settle or become British citizens." },
      { t: "Employers", d: "Businesses that need a sponsor licence, or support staying compliant once they have one." },
      { t: "People facing a refusal", d: "Applicants who have been refused and want to know whether and how to challenge the decision." },
    ],
    steps: [
      ["Assess", "We discuss your circumstances and identify the right route."],
      ["Plan", "A fixed fee in writing and a clear checklist of the evidence you need."],
      ["Prepare and submit", "We prepare your application and check it carefully before it is submitted."],
      ["Follow through", "We deal with any requests and advise you on the decision and next steps."],
    ],
    faqs: [
      ["Can you guarantee my application will succeed?", "No. Decisions are made by the Home Office, the tribunal or the courts, and no adviser can promise a result. We can make sure your application or challenge is as strong and as well prepared as it can be."],
      ["Are Home Office fees included in your fee?", "No. Home Office application fees, and the Immigration Health Surcharge where it applies, are set by the government and paid separately. Our cost calculator shows them on a separate line."],
      ["My application has been refused. What should I do?", "Contact us as soon as possible. Time limits for challenging a decision can be short, and the right route depends on the decision you received. We will review it and explain your options."],
      ["Do you advise employers?", "Yes. We advise on sponsor licence applications and ongoing compliance, and on the Skilled Worker, Global Talent and Global Business Mobility routes."],
    ],
    cta: "Book an immigration consultation",
  },
  {
    slug: "criminal-defence", name: "Criminal Defence", audience: "For individuals",
    hero: "navy", image: "justice", imageAlt: "",
    title: "Criminal defence and local authority prosecutions.",
    intro: "From the first police or council contact through to trial. Early advice matters.",
    meta: "Criminal defence solicitors advising at police station and council interviews, in the Magistrates’ Court and, with counsel, in the Crown Court.",
    what: [
      "Being investigated or charged is stressful, and what happens at the start of a case can shape everything that follows. Taking advice before any interview is important.",
      "We advise at police and council interviews, represent clients in the Magistrates’ Court, and handle Crown Court matters with counsel. We have also worked on prosecutions brought by local authorities, so we understand how these cases are built.",
    ],
    help: ["Advise you before and during interviews", "Make bail applications and pre-charge representations", "Represent you in the Magistrates’ Court", "Instruct counsel for Crown Court matters", "Advise on and pursue appeals"],
    special: "urgent",
    groups: [
      { t: "Police station", items: ["Police station interviews", "Voluntary interviews", "Bail", "Pre-charge representations"] },
      { t: "Council investigations", items: ["Interviews under caution by council investigators", "Local authority offences, including fly-tipping, Blue Badge fraud and social housing fraud", "Housing and licensing offences"] },
      { t: "Court", items: ["Magistrates’ Court matters", "Trials and sentencing", "Crown Court matters with counsel", "Appeals"] },
    ],
    groupCols: 3,
    who: [
      { t: "Invited to a police interview", d: "Including voluntary interviews, where you attend by arrangement rather than under arrest." },
      { t: "Contacted by a council investigator", d: "Councils investigate and prosecute some offences themselves, and may invite you to an interview under caution." },
      { t: "Charged or summonsed", d: "People who have been charged or have received a court summons and need representation." },
    ],
    steps: [
      ["Contact us early", "Tell us as soon as you are contacted, arrested or invited to an interview."],
      ["Advice before interview", "We find out what we can about the allegation and advise you before you answer questions."],
      ["Representation", "We prepare your case and represent you, instructing counsel where needed."],
      ["Outcome", "We explain the outcome, and any options for appeal."],
    ],
    faqs: [
      ["I have been invited to a voluntary interview. Do I need a solicitor?", "We strongly recommend taking advice before any interview under caution, including a voluntary interview. Contact us as soon as you are invited so we can prepare with you."],
      ["What is an interview under caution by a council?", "Local authorities investigate and prosecute some offences themselves, for example fly-tipping, Blue Badge fraud and social housing fraud. An interview under caution is a formal interview, and what you say may be used as evidence. Take advice before you attend."],
      ["Do you handle Crown Court cases?", "Yes. We handle Crown Court matters working with counsel (a barrister)."],
      ["How much will it cost?", "We will discuss costs with you at the outset and confirm them in writing. Published prices for criminal defence are being finalised and will appear on our Fees page."],
    ],
    cta: "Speak to a criminal defence solicitor",
  },
  {
    slug: "licensing-regulatory", name: "Licensing and Regulatory", audience: "For businesses, drivers and licensing authorities",
    hero: "split", image: "hospitality", imageAlt: "Diners at a busy restaurant table",
    title: "Licensing for businesses, drivers and licensing authorities.",
    intro: "We act for applicants and for licensing authorities, so we understand both sides of a licensing hearing.",
    meta: "Licensing solicitors advising on premises licences, temporary event notices, reviews, taxi and private hire licensing, hearings and appeals.",
    what: [
      "Licensing decisions affect whether a business can trade and whether a driver can work. Applications, reviews and hearings follow formal procedures, and the way a case is prepared and presented matters.",
      "We help applicants and licence holders with applications, variations, reviews and hearings, and advise licensing authorities on their decisions and on defending appeals. Our experience includes Licensing Sub-Committee hearings, appeals against Sub-Committee decisions, and taxi and private hire licensing.",
    ],
    help: ["Prepare applications and variations", "Respond to representations and licence reviews", "Represent you at licensing hearings", "Appeal, or defend an appeal against, a licensing decision", "Advise licensing authorities on decisions and procedure"],
    special: "twoSides",
    groups: [
      { t: "Premises licensing", items: ["Premises licences", "Variations", "Temporary event notices", "Licence reviews"] },
      { t: "Taxi and private hire", items: ["Driver licences", "Vehicle licences", "Operator licences", "Suspensions and revocations"] },
      { t: "Hearings and appeals", items: ["Licensing hearings", "Appeals", "Advice for licensing authorities"] },
    ],
    groupCols: 3,
    steps: [
      ["Review", "We review your application, licence, notice or decision."],
      ["Prepare", "We prepare the application, representations or evidence."],
      ["Hearing", "We represent you before the Licensing Sub-Committee or the court."],
      ["Follow through", "We advise on conditions, compliance and any right of appeal."],
    ],
    faqs: [
      ["Do you act for licensing authorities as well as applicants?", "Yes. We act for applicants and licence holders, and we advise licensing authorities, including on hearings and defending appeals."],
      ["Can you represent me at a licensing hearing?", "Yes. We prepare your case and represent you at Licensing Sub-Committee hearings and on appeal."],
      ["My taxi or private hire licence has been suspended or revoked. What can I do?", "Contact us promptly. Depending on the decision, you may be able to appeal, and time limits apply. We will review the decision and explain your options."],
    ],
    cta: "Book a licensing consultation",
  },
  {
    slug: "property-housing", name: "Property and Housing", audience: "For landlords, tenants and local authorities",
    hero: "wide", image: "house-keys", imageAlt: "House keys beside a model house",
    title: "Advice for landlords, tenants and local authorities.",
    intro: "First-tier Tribunal appeals, local authority enforcement, and landlord and tenant matters.",
    meta: "Housing solicitors advising on First-tier Tribunal appeals, improvement notices, civil penalties, selective and HMO licensing, possession, disrepair and unlawful eviction.",
    what: [
      "Housing law governs the relationship between landlords and tenants, and the powers local authorities use to regulate private rented housing. Enforcement action and disputes can move quickly, with deadlines that matter.",
      "We advise on tribunal appeals against council enforcement, on licensing schemes, and on landlord and tenant disputes. Our experience includes First-tier Tribunal proceedings on improvement notices, civil financial penalties and selective licensing.",
    ],
    help: ["Review notices and penalties and explain your options", "Prepare and conduct First-tier Tribunal appeals", "Advise on selective and HMO licensing", "Act in possession, disrepair and unlawful eviction matters", "Advise landlords on compliance"],
    special: "trio",
    groups: [
      { t: "First-tier Tribunal appeals", items: ["Improvement notices", "Civil financial penalties", "Selective licensing", "HMO licensing", "Rent repayment orders"] },
      { t: "Landlord and tenant", items: ["Possession claims", "Disrepair", "Unlawful eviction", "Renters’ Rights Act compliance"] },
    ],
    steps: [
      ["Review", "We review the notice, penalty, claim or tenancy and the deadlines that apply."],
      ["Advise", "We explain your options and what each is likely to cost."],
      ["Act", "We prepare representations, applications or your tribunal case."],
      ["Resolve", "We represent you and advise on the outcome and next steps."],
    ],
    faqs: [
      ["I have received a civil financial penalty notice. What should I do?", "Act quickly. There are deadlines for responding and for appealing. Contact us with the notice and any earlier correspondence and we will explain your options."],
      ["Do you act for tenants as well as landlords?", "Yes. We advise landlords and tenants, and draw on experience of acting for public authorities in housing enforcement."],
      ["Can you help with HMO or selective licensing?", "Yes. We advise on licensing applications and conditions, and on appeals to the First-tier Tribunal."],
    ],
    cta: "Book a housing consultation",
  },
  {
    slug: "technology-data-ai-governance", name: "Technology, Data and AI Governance", audience: "For businesses",
    hero: "navy", image: "circuit", imageAlt: "",
    title: "Technology, data and AI governance for growing and regulated businesses.",
    intro: "Senior data protection, privacy and AI governance support in one relationship, from a fractional Data Protection Officer to board-level AI governance.",
    meta: "Fractional Data Protection Officer, data protection and privacy compliance, AI governance, cyber assurance and technology contracts for UK businesses.",
    what: [
      "Data and AI now sit at the heart of most businesses, and regulators, customers and boards expect organisations to show they are in control of both.",
      "We give UK businesses senior data protection, privacy and AI governance support without the cost of a full-time hire, and we draft and negotiate the technology contracts that sit around it.",
    ],
    help: ["Act as your fractional Data Protection Officer", "Assess where you stand and plan remediation", "Build your records, assessments and policies", "Set up AI governance that fits your business", "Draft and review technology contracts"],
    special: "plans",
    groups: [
      { id: "fractional-dpo", t: "Fractional Data Protection Officer", items: ["DPO appointment and registration", "Ongoing advisory support", "Privacy compliance", "Data subject access request support", "Complaint triage", "Policy reviews", "Vendor data processing agreement reviews", "Board reporting", "AI governance support"] },
      { id: "data-protection", t: "Data protection and privacy", items: ["Health checks, gap assessments and remediation roadmaps", "Data mapping and records of processing", "International transfer mechanisms", "DPIAs, legitimate interests and transfer risk assessments", "Privacy notices, policies and cookie compliance", "Data subject request services", "Breach response planning"] },
      { id: "ai-governance", t: "AI governance and compliance", items: ["AI use case intake", "AI system inventory", "Risk classification", "AI impact assessments", "AI vendor risk assessments", "AI contract terms", "Governance frameworks"] },
      { id: "cyber-contracts", t: "Cyber assurance and technology contracts", items: ["Security and privacy assurance", "Technology agreements", "SaaS and cloud agreements", "Outsourcing and licence agreements", "Data processing agreements", "NDAs", "AI terms of use"] },
    ],
    who: [
      { t: "SMEs", d: "Growing businesses that need senior expertise without a full-time hire." },
      { t: "Technology and AI companies", d: "Businesses building or deploying technology and AI that customers and investors will scrutinise." },
      { t: "Regulated and data-heavy sectors", d: "Healthcare, fintech and professional services firms handling sensitive data." },
    ],
    laws: ["UK GDPR", "Data Protection Act 2018", "PECR", "Data (Use and Access) Act 2025", "EU GDPR", "EU AI Act"],
    steps: [
      ["Health check", "We review where you stand today and the risks that matter most."],
      ["Roadmap", "A prioritised plan, with a fixed fee or retainer agreed in writing."],
      ["Implement", "We build the records, assessments, policies and contracts you need."],
      ["Ongoing support", "Advice on call, board reporting and regular reviews."],
    ],
    faqs: [
      ["What is a fractional DPO?", "A Data Protection Officer provided on a part-time basis, for a set number of hours each month, instead of a full-time employee. You get a named adviser and regular reporting."],
      ["Does my organisation need a DPO?", "Some organisations are legally required to appoint one, depending on what they do and how they use personal data. Others choose to. A health check will tell you where you stand."],
      ["Is the Confidère app part of this service?", "No. The Confidère app is a separate software product. Using it is not legal advice and does not make you a client of Confidère Legal."],
    ],
    cta: "Book a data protection health check",
  },
];

export function pages(ctx) {
  const { tokens, cfg } = ctx;
  const pricing = loadPricing(ctx.root);
  const arrow = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';

  return AREAS.map((a) => {
    const path = `/services/${a.slug}/`;
    const book = `/book-consultation/?area=${a.slug}`;
    const priceArea = pricing.areas.find((x) => x.id === a.slug);
    const biz = a.slug === "technology-data-ai-governance";

    // ---------- hero ----------
    const heroCopy = `
        <!--breadcrumbs-->
        <span class="eyebrow eyebrow--rule rise">${a.audience}</span>
        <h1 class="h1 page-hero__title rise rise-d1">${a.title}</h1>
        <p class="lead page-hero__lead rise rise-d2">${a.intro}</p>
        <div class="btn-row rise rise-d3">
          <a class="btn" href="${book}">${a.cta} <svg class="arrow" aria-hidden="true"><use href="#i-arrow"/></svg></a>
          <a class="btn ${a.hero === "navy" ? "btn--outline-light" : "btn--outline"}" href="#fees">Fees</a>
        </div>`;
    let hero;
    if (a.hero === "split") {
      hero = `<section class="page-hero page-hero--split" aria-labelledby="page-title">
      <div class="container container--wide page-hero__grid">
        <div>${heroCopy.replace('class="h1 page-hero__title', 'id="page-title" class="h1 page-hero__title')}</div>
        <figure class="page-hero__media figure-cover rise rise-d2"><img src="/assets/img/${a.image}.webp" alt="${a.imageAlt}" width="1200" height="800" fetchpriority="high"></figure>
      </div>
    </section>`;
    } else if (a.hero === "wide") {
      hero = `<section class="page-hero page-hero--wide" aria-labelledby="page-title">
      <div class="container container--wide page-hero__inner" style="padding-top:var(--s-6)">
        <div>${heroCopy.replace('class="h1 page-hero__title', 'id="page-title" class="h1 page-hero__title')}</div>
        <div class="page-hero__aside rise rise-d3"><p class="small"><strong style="color:var(--navy)">In this section</strong></p><ul class="check-list small" role="list" style="margin-top:.75rem">${a.groups.map((g) => `<li>${g.t}</li>`).join("")}</ul></div>
      </div>
      <figure class="page-hero__banner figure-cover"><img src="/assets/img/${a.image}.webp" alt="${a.imageAlt}" width="1200" height="800" fetchpriority="high"></figure>
    </section>`;
    } else {
      hero = `<section class="page-hero page-hero--navy on-dark" aria-labelledby="page-title">
      <div class="page-hero__bg figure-cover" aria-hidden="true"><img src="/assets/img/${a.image}.webp" alt="" width="1200" height="800"></div>
      <div class="container container--wide page-hero__inner">${heroCopy.replace('class="h1 page-hero__title', 'id="page-title" class="h1 page-hero__title')}</div>
    </section>`;
    }

    // ---------- distinctive block ----------
    const specials = {
      safety: `<div class="notice" role="note"><svg aria-hidden="true"><use href="#i-shield"/></svg><div><strong>If you are in immediate danger, call 999.</strong>We can make urgent applications for protection, such as non-molestation and occupation orders. Contact us as soon as you are safe to do so.</div></div>`,
      noGuarantee: `<div class="notice notice--info" role="note"><svg aria-hidden="true"><use href="#i-scale"/></svg><div><strong>An honest word on outcomes</strong>Decisions are made by the Home Office, the tribunal or the courts. We cannot promise a particular result, but we can make sure your application or challenge is as strong as it can be.</div></div>`,
      urgent: `<div class="notice notice--urgent" role="note"><svg aria-hidden="true"><use href="#i-phone"/></svg><div><strong>Contacted by the police or a council investigator?</strong><p>Speak to a solicitor before any interview. Our urgent police station line: ${tokens.urgentPhoneHtml}</p><div class="btn-row"><a class="btn" href="/contact/?area=criminal-defence">Contact us now</a><a class="btn btn--outline-light" href="${book}">Book a consultation</a></div></div></div>`,
      twoSides: `<div class="two-sides">
          <div><span class="eyebrow eyebrow--rule">For applicants and licence holders</span><h3 class="h3">Businesses, venues and drivers</h3><ul class="check-list" role="list"><li>Premises licences and variations</li><li>Temporary event notices</li><li>Licence reviews</li><li>Taxi and private hire driver, vehicle and operator licences</li><li>Suspensions, revocations and appeals</li></ul></div>
          <div><span class="eyebrow eyebrow--rule">For licensing authorities</span><h3 class="h3">Councils and committees</h3><ul class="check-list" role="list"><li>Advice on licensing decisions and procedure</li><li>Licensing Sub-Committee hearings</li><li>Defending appeals against decisions</li><li>Licensing policy</li></ul></div>
        </div>`,
      trio: `<div class="audience" style="--cols:3">
          <div class="audience__item"><h3>Landlords</h3><ul class="check-list" role="list"><li>Appeals against improvement notices and civil financial penalties</li><li>Selective and HMO licensing</li><li>Possession claims</li><li>Renters’ Rights Act compliance</li></ul></div>
          <div class="audience__item"><h3>Tenants</h3><ul class="check-list" role="list"><li>Disrepair</li><li>Unlawful eviction</li><li>Rent repayment orders</li></ul></div>
          <div class="audience__item"><h3>Local authorities</h3><ul class="check-list" role="list"><li>Housing enforcement matters</li><li>First-tier Tribunal proceedings</li></ul></div>
        </div>`,
      plans: `<div id="dpo-plans"><div class="section-title"><span class="eyebrow eyebrow--rule">Fractional DPO plans</span><h3 class="h2">Senior expertise on demand</h3><p>A named adviser, a fixed number of hours each month, and the independence regulators expect.</p></div>${dpoTable(pricing.dpoPlans)}</div>`,
    };
    const specialTitle = { safety: "", noGuarantee: "", urgent: "", twoSides: "Both sides of a licensing hearing", trio: "Who we help", plans: "" }[a.special];

    // ---------- sections ----------
    const groups = `<div class="svc-groups${a.groupCols === 3 ? " svc-groups--3" : ""}">${a.groups
      .map((g, i) => `<div class="svc-group reveal"${g.id ? ` id="${g.id}"` : ""}><span class="svc-group__n">${String(i + 1).padStart(2, "0")}</span><h3>${g.t}</h3><ul class="check-list" role="list">${g.items.map((x) => `<li>${x}</li>`).join("")}</ul></div>`)
      .join("")}</div>`;

    const who = a.who
      ? `<section class="section bg-off" id="who" aria-labelledby="who-title"><div class="container container--wide">
        <div class="section-title"><span class="eyebrow eyebrow--rule">Who we help</span><h2 class="h2" id="who-title">Is this for you?</h2></div>
        <div class="audience">${a.who.map((w) => `<div class="audience__item reveal"><h3>${w.t}</h3><p>${w.d}</p></div>`).join("")}</div>
      </div></section>`
      : "";

    const fees = priceArea
      ? `${feeTable(priceArea)}
        <p class="small" style="margin-top:var(--s-4)">VAT is added to our fees at 20%. Third-party fees are set by the relevant body, are not subject to VAT here, and can change. We confirm your fee in writing before we start.</p>
        <div class="btn-row" style="margin-top:var(--s-5)"><a class="btn btn--navy" href="/fees/cost-calculator/?area=${a.slug}">Estimate your costs</a><a class="btn btn--outline" href="/fees/">All fees</a></div>`
      : `<div class="notice notice--info"><svg aria-hidden="true"><use href="#i-pound"/></svg><div><strong>Published prices for ${a.name.toLowerCase()} are being finalised</strong>We will discuss costs at your first consultation and confirm your fee or estimate in writing before any work starts. Court and other third-party fees are shown separately.</div></div>
        <div class="btn-row" style="margin-top:var(--s-5)"><a class="btn btn--navy" href="${book}">Book a consultation</a><a class="btn btn--outline" href="/fees/">How our fees work</a></div>`;

    const whatTitle = {
      "family-law": "What family law covers", immigration: "What UK immigration law covers", "criminal-defence": "Why early advice matters",
      "licensing-regulatory": "What licensing work involves", "property-housing": "What housing law covers", "technology-data-ai-governance": "Why data and AI governance matters",
    }[a.slug];
    const sec = []; // [id, html-with-{{bg}}]
    sec.push(`<section class="section{{bg}}" id="overview" aria-labelledby="ov-title">
    <div class="container container--wide with-aside">
      <div>
        <span class="eyebrow eyebrow--rule">Overview</span>
        <h2 class="h2" id="ov-title" style="margin-top:var(--s-4)">${whatTitle}</h2>
        <div class="prose" style="margin-top:var(--s-5)">${a.what.map((p) => `<p>${p}</p>`).join("")}
          <h3>How we can help</h3>
          <ul>${a.help.map((h) => `<li>${h}</li>`).join("")}</ul>
          ${a.laws ? `<h3>Laws we work with</h3><ul class="laws" role="list">${a.laws.map((l) => `<li>${l}</li>`).join("")}</ul>` : ""}
        </div>
        ${["safety", "noGuarantee", "urgent"].includes(a.special) ? `<div style="margin-top:var(--s-7)">${specials[a.special]}</div>` : ""}
      </div>
      <aside class="aside-card" aria-label="Next steps">
        <h2>Talk to us</h2>
        <p>Phone, video or in-person consultations with an experienced solicitor.</p>
        <dl><div><dt>Practice area</dt><dd>${a.name}</dd></div><div><dt>Phone</dt><dd>${tokens.phoneHtml}</dd></div><div><dt>Email</dt><dd>${tokens.emailHtml}</dd></div></dl>
        <a class="btn" href="${book}">Book a consultation</a>
        <a class="btn btn--outline" href="#enquire">Send an enquiry</a>
      </aside>
    </div>
  </section>`);
    if (["twoSides", "trio", "plans"].includes(a.special)) {
      sec.push(`<section class="section{{bg}}" aria-label="${specialTitle || "Fractional DPO plans"}"><div class="container container--wide">${specialTitle ? `<div class="section-title"><span class="eyebrow eyebrow--rule">${a.audience}</span><h2 class="h2">${specialTitle}</h2></div>` : ""}${specials[a.special]}</div></section>`);
    }
    sec.push(`<section class="section{{bg}}" id="services" aria-labelledby="svc-title">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">Services</span><h2 class="h2" id="svc-title">What we handle</h2></div>
      ${groups}
    </div>
  </section>`);
    if (a.who) sec.push(`<section class="section{{bg}}" id="who" aria-labelledby="who-title"><div class="container container--wide">
        <div class="section-title"><span class="eyebrow eyebrow--rule">Who we help</span><h2 class="h2" id="who-title">Is this for you?</h2></div>
        <div class="audience">${a.who.map((w) => `<div class="audience__item reveal"><h3>${w.t}</h3><p>${w.d}</p></div>`).join("")}</div>
      </div></section>`);
    sec.push(`<section class="section{{bg}}" id="process" aria-labelledby="pr-title">
    <div class="container container--wide">
      <div class="section-title"><span class="eyebrow eyebrow--rule">How we work</span><h2 class="h2" id="pr-title">What happens next</h2></div>
      <ol class="steps" role="list">${a.steps.map(([t, d], i) => `<li class="reveal"><span class="steps__n">Step ${String(i + 1).padStart(2, "0")}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}</ol>
    </div>
  </section>`);
    sec.push(`<section class="section{{bg}}" id="fees" aria-labelledby="fees-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">Fees</span><h2 class="h2" id="fees-title">Clear prices, agreed before we start</h2><p>Our fee, VAT and any third-party fees are always shown separately.</p></div>
      <div>${fees}</div>
    </div>
  </section>`);
    sec.push(`<section class="section{{bg}}" id="faqs" aria-labelledby="faq-title">
    <div class="container container--wide split">
      <div class="split__head"><span class="eyebrow eyebrow--rule">FAQs</span><h2 class="h2" id="faq-title">Common questions</h2></div>
      <div class="faq">${a.faqs.map(([q, ans]) => `<details><summary>${q}</summary><div class="faq__a"><p>${ans}</p></div></details>`).join("")}</div>
    </div>
  </section>`);
    sec.push(`<section class="section{{bg}}" id="enquire" aria-labelledby="enq-title">
    <div class="container container--wide split">
      <div class="split__head">
        <span class="eyebrow eyebrow--rule">Enquire</span>
        <h2 class="h2" id="enq-title">Tell us what you need</h2>
        <p>Send a short enquiry and we will reply to arrange a consultation. Or book a time directly.</p>
        <a class="link-arrow" href="${book}" style="margin-top:var(--s-4)">Book a consultation ${arrow}</a>
      </div>
      <div class="form-panel">${enquiryForm({ prefix: "pa", area: a.slug, endpoint: tokens.formEndpoint, turnstileKey: tokens.turnstileKey, compact: true })}</div>
    </div>
  </section>`);

    const body = `
<main id="main">
  ${hero}

  <nav class="subnav" aria-label="On this page"><div class="container container--wide"><ul>
    <li><a href="#overview">Overview</a></li><li><a href="#services">Services</a></li>${a.who ? '<li><a href="#who">Who we help</a></li>' : ""}<li><a href="#process">How we work</a></li><li><a href="#fees">Fees</a></li><li><a href="#faqs">FAQs</a></li><li><a href="#enquire">Enquire</a></li>
  </ul></div></nav>

  ${sec.map((h, i) => h.replace("{{bg}}", i % 2 ? " bg-off" : "")).join("\n\n  ")}
</main>`;

    return {
      meta: {
        path,
        title: `${a.name} | Confidère Legal`,
        description: a.meta,
        section: "services",
        breadcrumbs: [["Services", "/services/"], [a.name]],
        scripts: ["forms"],
        schema: [
          { "@context": "https://schema.org", "@type": "Service", name: a.name, serviceType: a.name, description: a.meta, areaServed: { "@type": "Country", name: "United Kingdom" }, provider: { "@type": "LegalService", name: "Confidère Legal", url: cfg.siteUrl + "/" }, url: cfg.siteUrl + path },
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faqs.map(([q, ans]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: ans } })) },
        ],
      },
      body,
    };
  });
}

export { AREAS };
