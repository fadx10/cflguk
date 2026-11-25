# Confidère Legal — website

A static HTML/CSS/JS website with no runtime dependencies. It is built from `src/` with a small Node script and can be hosted on any static host.

## Run it locally

Needs Node.js 18 or later. There are no packages to install.

```bash
npm start
```

This builds the site into `dist/` and serves it at http://localhost:4400. The homepage design options are at http://localhost:4400/designs/.

`npm run build` builds without serving. `dist/` is generated output: it is git-ignored and rebuilt on every deploy.

## Publish on GitHub Pages

1. Create a repository on GitHub and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Each push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.

The site will be at `https://<username>.github.io/<repository>/`. The design launcher is at `/designs/` under that address.

Links are relative, so the site works at that sub-path, at a user site (`<username>.github.io`) and on a custom domain. The workflow passes the right base path to the build for the 404 page.

**Before making the repository public:**

- The repository has no licence file, so others may view the code but have no right to reuse it. That is usually right for client work. Add a `LICENSE` only if Confidère Legal wants to allow reuse.
- This README and the “to confirm” placeholders on the site show which business details are still pending. Anyone can read them once the repository is public.
- Every page is marked `noindex` until `indexable: true` is set in `src/config.mjs`, so search engines will not list the review site.
- Photo and font credits are in [CREDITS.md](CREDITS.md).

## Structure

| Path | What it is |
| --- | --- |
| `src/config.mjs` | Phone, email, address, form endpoint, booking provider, Turnstile key and the `indexable` launch flag |
| `src/pages/` | Hand-written pages: home (`index.html`), Designs 2–7, the `/designs/` launcher and the design options page (review only) |
| `src/generate/practice.mjs` | The six practice-area pages: content and layout |
| `src/generate/core.mjs` | Services, about, team and profiles, product, fees, calculator, booking, contact, insights, 404 |
| `src/generate/legal.mjs` | Legal and regulatory pages |
| `src/lib/fields.mjs` | Shared enquiry form fields (client brief §20) |
| `src/lib/pricing.mjs` | Fee tables rendered from the pricing data |
| `assets/data/pricing.json` | **All fees.** Read by the Fees page at build time and by the calculator in the browser |
| `assets/css/base.css` | Design system tokens and shared components |
| `assets/css/home.css`, `site.css` | Homepage and inner-page styles |
| `assets/js/` | `site.js` (navigation, cookie consent), `forms.js`, `calculator.js`, `booking.js` |

Internal links in `src/` are written root-relative (`/services/`). The build rewrites them as relative paths, copies `assets/` into `dist/`, and generates `sitemap.xml`, `robots.txt` and `.nojekyll`.

## Integrations still to connect

| Item | Current behaviour | To connect |
| --- | --- | --- |
| Form delivery (contact, practice pages, booking, demo, email estimate) | Validates fully, then shows "Online sending is not connected yet". Never shows a false success | Set `formEndpoint` in `src/config.mjs` to an HTTPS endpoint that accepts JSON, emails the firm and sends the enquirer an acknowledgement |
| Booking calendar | Collects a *preferred* date and time and sends a request. It never says an appointment is confirmed | Choose a scheduling system (e.g. Microsoft Bookings, Calendly) for live slots, confirmation emails and calendar invites |
| Spam protection | Honeypot field and minimum completion time | Add a Cloudflare Turnstile key in `src/config.mjs`, and verify it on the endpoint |
| Price administration | Edit `assets/data/pricing.json`, then rebuild | Move the file into the chosen CMS or admin tool. The calculator only needs it served as JSON |
| Analytics | None loaded. The consent banner blocks non-essential scripts until opt-in | Add analytics as `<script type="text/plain" data-consent="analytics" data-src="…">` |

## Awaiting the client

Gold-highlighted "to confirm" text on the site marks each of these:

- Approved logo (a text wordmark is used for now) and portraits. All photography is interim Unsplash stock.
- Phone, urgent police station line, email on the new domain, office address, office hours.
- Legal entity, company number, registered office, VAT number, ICO registration, PI insurance.
- SRA authorisation: statement, number and badge. No regulatory claim is made until then.
- Sahera Begum's title and biography.
- **All legal fees.** Unconfirmed fees are `null` and show as "To be confirmed". The DPO and fixed-scope business fees are the client's proposed figures and are tagged "Proposed".
- Consultation offer (free call or paid consultation, length, price).
- Confidère app provider entity, final name and feature list.
- Approved wording for every legal page. These pages currently show the required structure with placeholders.
- Review of all practice-area copy and FAQs by the firm's solicitors.
- Insights articles.

## Launch checklist

1. Fill in `src/config.mjs`, including `indexable: true`, then rebuild.
2. Remove Designs 2–7, `designs.html` and `design-options.html` from `src/pages/`, and the review bar from `src/partials/review.html`.
3. Add the SRA badge embed to `src/partials/footer.html` and `src/generate/legal.mjs`.
4. On GitHub Pages, `404.html` is served for missing pages automatically. For a custom domain, add it under **Settings → Pages**.
