// ─────────────────────────────────────────────────────────────────────────────
//  BUSINESS DETAILS — edit these, then run `npm run build`.
//  Every page, the structured data (schema.org), sitemap and robots.txt are
//  generated from this file, so your Name / Address / Phone stay identical
//  everywhere (consistency is a major local-SEO ranking factor).
//
//  Values marked TODO are placeholders. Replace them before going live.
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  name: "A Team Limo LLC",
  shortName: "A Team Limo",
  tagline: "Columbus Limo Service & Luxury Transportation",

  // TODO: your real domain, no trailing slash. Used for canonical URLs + sitemap.
  url: "https://www.ateamlimollc.com",

  // TODO: real phone number. `phoneE164` is the same number in +1XXXXXXXXXX form.
  phone: "(614) 555-0142",
  phoneE164: "+16145550142",

  // TODO: real email address.
  email: "info@ateamlimollc.com",

  // If you have a public street address, fill in `street` and `postalCode`.
  // If you run as a service-area business (no storefront), leave `street` blank
  // and only city/region will be published, matching a Google Business Profile
  // with a hidden address.
  address: {
    street: "",
    city: "Columbus",
    region: "OH",
    postalCode: "",
    country: "US",
  },

  // Map center used in structured data (downtown Columbus).
  geo: { lat: 39.9612, lng: -82.9988 },

  // Opening hours. Limo companies that answer 24/7 should say so.
  open24x7: true,

  foundingYear: "", // e.g. "2019"
  priceRange: "$$",

  // Links to your profiles. These go into schema.org `sameAs`, which helps
  // Google tie your website to your Google Business Profile and reviews.
  // Leave blank to omit.
  social: {
    google: "", // your Google Business Profile / Maps share link
    facebook: "",
    instagram: "",
    yelp: "",
    tiktok: "",
  },

  // Quote-form destination. Paste a Formspree / Basin / Getform endpoint URL
  // (e.g. "https://formspree.io/f/abcdwxyz") to get submissions by email.
  // If left blank, the form opens the visitor's email app pre-filled instead.
  formEndpoint: "",

  // Optional analytics: Google Analytics 4 measurement ID, e.g. "G-XXXXXXX".
  ga4Id: "",

  // Optional: Google Search Console HTML-tag verification code (content="...").
  googleSiteVerification: "",
};
