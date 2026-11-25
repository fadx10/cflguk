// Site-wide settings. Fill in the nulls as the client confirms details, then rebuild.
export default {
  siteName: "Confidère Legal",
  siteUrl: "https://www.confiderelegal.com",

  // Keep false until launch: adds noindex to every page and disallows crawling in robots.txt.
  indexable: false,

  // Contact details. null = not yet confirmed (shown as a "to confirm" placeholder, never invented).
  phone: null,            // e.g. "+44 20 0000 0000"
  urgentPhone: null,      // criminal defence police station line
  email: null,            // enquiries address on the confiderelegal.com domain
  address: null,          // registered / office address

  // Where forms POST their JSON. null = integration not yet connected (forms show an honest error state).
  // Expected: an HTTPS endpoint that accepts JSON, sends the enquiry to the firm and an acknowledgement to the enquirer.
  formEndpoint: null,

  // Scheduling system for live availability (e.g. Calendly, Microsoft Bookings). null = request-a-time mode.
  bookingProvider: null,

  // Spam protection: Cloudflare Turnstile site key. null = honeypot + timing checks only.
  turnstileSiteKey: null,
};
