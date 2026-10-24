#!/usr/bin/env node
// Static site generator: builds every page into /public from config.js and
// content.js. No dependencies. Run with `npm run build`.

const fs = require("fs");
const path = require("path");
const site = require("./config");
const { services, areas, fleet, generalFaqs } = require("./content");

const OUT = path.join(__dirname, "..", "public");
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// ── helpers ──────────────────────────────────────────────────────────────────

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const abs = (p) => site.url + p;
const tel = `tel:${site.phoneE164}`;
const sameAs = Object.values(site.social).filter(Boolean);
const BUSINESS_ID = `${site.url}/#business`;

function write(rel, html) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const icons = {
  phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
  rings: '<circle cx="9" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 3l1.5 3h3L15 3z"/>',
  plane: '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  briefcase: '<path d="M10 3h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4V5a2 2 0 0 1 2-2zm0 4h4V5h-4z"/>',
  music: '<path d="M12 3v10.6A4 4 0 1 0 14 17V7h4V3z"/>',
  ticket: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4zm11 0v2h2V7zm0 4v2h2v-2zm0 4v2h2v-2z"/>',
  heart: '<path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.1 3 4 6.8 4c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3C21 4 23.2 8.1 21.6 11.8 19.5 16.4 12 21 12 21z"/>',
  dove: '<path d="M21 5c-2 0-4 1-5 3-1-3-4-5-8-5 0 3 1 5 3 7-3 0-6-1-8-3 0 5 4 9 9 9l-2 4h3l2-4c4-1 6-4 6-8l2-2z"/>',
  check: '<path d="M9 16.2l-3.5-3.5L4 14.1l5 5 11-11-1.4-1.4z"/>',
  clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4l3.5 2.1-.8 1.3L11 13V6h2z"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 9.7-8 11-4.6-1.3-8-6-8-11V5z"/>',
  tag: '<path d="M21.4 11.6l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8zM6.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>',
  pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
  car: '<path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2zm1.7 0h10.6l-1-3.2a1 1 0 0 0-1-.8H8.7a1 1 0 0 0-1 .8z"/>',
};
const icon = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${icons[name]}</svg>`;

// ── structured data (schema.org JSON-LD) ─────────────────────────────────────

function businessSchema() {
  const address = {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  };
  if (site.address.street) address.streetAddress = site.address.street;
  if (site.address.postalCode) address.postalCode = site.address.postalCode;

  const s = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutomotiveBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    alternateName: site.shortName,
    description: `${site.name} provides limo service and luxury chauffeured transportation in Columbus, Ohio and surrounding Central Ohio communities: weddings, prom, airport transfers to CMH, corporate car service, party buses and special events.`,
    url: site.url + "/",
    telephone: site.phoneE164,
    email: site.email,
    image: abs("/images/og-image.png"),
    logo: abs("/images/logo.png"),
    priceRange: site.priceRange,
    address,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areas.map((a) => ({ "@type": "City", name: `${a.city}, OH` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Limousine & Chauffeured Transportation Services",
      itemListElement: services.map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sv.name, url: abs(`/services/${sv.slug}/`) },
      })),
    },
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "USD",
  };
  if (site.open24x7) {
    s.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    };
  }
  if (site.foundingYear) s.foundingDate = site.foundingYear;
  if (sameAs.length) s.sameAs = sameAs;
  return s;
}

const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url + "/",
  name: site.name,
  publisher: { "@id": BUSINESS_ID },
});

const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map(([name, url], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(url),
  })),
});

const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

const serviceSchema = (name, url, description, areaServed) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  serviceType: "Limousine service",
  description,
  url: abs(url),
  provider: { "@id": BUSINESS_ID },
  areaServed,
});

const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

// ── layout ───────────────────────────────────────────────────────────────────

const nav = [
  ["Services", "/services/"],
  ["Fleet", "/fleet/"],
  ["Service Areas", "/service-areas/"],
  ["About", "/about/"],
  ["FAQ", "/faq/"],
];

function layout({ path: pagePath, title, description, body, schema = [], crumbs, ogType = "website", noindex = false }) {
  const url = abs(pagePath);
  const allSchema = [businessSchema(), ...schema];
  if (pagePath === "/") allSchema.push(websiteSchema());
  if (crumbs) allSchema.push(breadcrumbSchema([["Home", "/"], ...crumbs]));

  const navLinks = nav
    .map(([label, href]) => `<li><a href="${href}"${pagePath.startsWith(href) ? ' aria-current="page"' : ""}>${label}</a></li>`)
    .join("");

  const breadcrumbHtml = crumbs
    ? `<nav class="breadcrumbs container" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>${crumbs
        .map(([name, href], i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${href}">${esc(name)}</a></li>`))
        .join("")}</ol></nav>`
    : "";

  const ga = site.ga4Id
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.ga4Id}');</script>`
    : "";

  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="geo.region" content="US-OH">
<meta name="geo.placename" content="Columbus, Ohio">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">
${site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">` : ""}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs("/images/og-image.png")}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs("/images/og-image.png")}">
<meta name="theme-color" content="#0b0b0f">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap">
<link rel="stylesheet" href="/css/styles.css">
${allSchema.map(jsonld).join("\n")}
${ga}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${esc(site.name)} home">
      <span class="brand-mark" aria-hidden="true">A</span>
      <span class="brand-text"><strong>A Team Limo</strong><small>Columbus, Ohio</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>${navLinks}</ul>
      <a class="btn btn-gold btn-sm" href="/contact/">Get a Quote</a>
    </nav>
    <a class="header-phone" href="${tel}">${icon("phone")}<span>${esc(site.phone)}</span></a>
  </div>
</header>
${breadcrumbHtml}
<main id="main">
${body}
</main>
${ctaBand()}
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="/"><span class="brand-mark" aria-hidden="true">A</span><span class="brand-text"><strong>A Team Limo</strong><small>Columbus, Ohio</small></span></a>
      <p class="footer-about">Luxury limousine and chauffeured car service for Columbus and Central Ohio. Weddings, prom, airport transfers, corporate travel and nights out, 24/7.</p>
      <address class="nap">
        <strong>${esc(site.name)}</strong><br>
        ${site.address.street ? `${esc(site.address.street)}<br>` : ""}${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}<br>
        <a href="${tel}">${esc(site.phone)}</a><br>
        <a href="mailto:${esc(site.email)}">${esc(site.email)}</a><br>
        ${site.open24x7 ? "Open 24 hours, 7 days a week" : ""}
      </address>
    </div>
    <div>
      <h2 class="footer-h">Services</h2>
      <ul class="footer-links">${services.map((s) => `<li><a href="/services/${s.slug}/">${esc(s.name)}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h2 class="footer-h">Service Areas</h2>
      <ul class="footer-links cols-2">${areas.map((a) => `<li><a href="/service-areas/${a.slug}/">${esc(a.city)}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h2 class="footer-h">Company</h2>
      <ul class="footer-links">
        <li><a href="/fleet/">Our Fleet</a></li>
        <li><a href="/about/">About Us</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="/contact/">Contact &amp; Quote</a></li>
      </ul>
      ${sameAs.length ? `<ul class="social">${Object.entries(site.social).filter(([, v]) => v).map(([k, v]) => `<li><a href="${esc(v)}" rel="noopener" target="_blank">${k[0].toUpperCase() + k.slice(1)}</a></li>`).join("")}</ul>` : ""}
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${esc(site.name)}. All rights reserved. Limo service in Columbus, OH and Central Ohio.</p>
  </div>
</footer>
<a class="mobile-call" href="${tel}">${icon("phone")} Call Now</a>
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

function ctaBand() {
  return `<section class="cta-band" aria-labelledby="cta-h">
  <div class="container cta-inner">
    <div>
      <h2 id="cta-h">Ready to ride with A Team Limo?</h2>
      <p>Get a free, no-obligation quote in minutes. Available 24/7 across Columbus and Central Ohio.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-gold" href="/contact/">Get a Free Quote</a>
      <a class="btn btn-outline" href="${tel}">${icon("phone")} ${esc(site.phone)}</a>
    </div>
  </div>
</section>`;
}

// ── shared sections ──────────────────────────────────────────────────────────

const faqList = (faqs) =>
  `<div class="faq-list">${faqs
    .map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><div class="faq-a"><p>${esc(a)}</p></div></details>`)
    .join("")}</div>`;

const serviceCards = (list = services) =>
  `<div class="card-grid">${list
    .map(
      (s) => `<a class="card service-card" href="/services/${s.slug}/">
      <span class="card-icon">${icon(s.icon)}</span>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.description.split(". ")[0])}.</p>
      <span class="card-link">Learn more &rarr;</span>
    </a>`
    )
    .join("")}</div>`;

const areaChips = (exclude) =>
  `<ul class="chips">${areas
    .filter((a) => a.slug !== exclude)
    .map((a) => `<li><a href="/service-areas/${a.slug}/">${icon("pin")}${esc(a.city)}</a></li>`)
    .join("")}</ul>`;

const whyUs = `<div class="why-grid">
  <div class="why">${icon("clock")}<h3>On Time, Every Time</h3><p>Chauffeurs arrive early. We track flights and traffic so you never wait.</p></div>
  <div class="why">${icon("shield")}<h3>Licensed &amp; Insured</h3><p>Professional, background-checked chauffeurs and fully insured commercial vehicles.</p></div>
  <div class="why">${icon("tag")}<h3>Upfront Pricing</h3><p>Clear, all-inclusive quotes. No surge pricing and no surprise fees.</p></div>
  <div class="why">${icon("car")}<h3>Immaculate Fleet</h3><p>Clean, well-maintained stretch limos, SUVs, party buses and sedans.</p></div>
</div>`;

const vehiclePlaceholder = (name) =>
  `<div class="vehicle-ph" role="img" aria-label="${esc(name)}">${icon("car", "vehicle-ph-icon")}</div>`;

function quoteForm(compact = false) {
  const serviceOptions = services.map((s) => `<option>${esc(s.short)}</option>`).join("");
  const vehicleOptions = fleet.map((v) => `<option>${esc(v.name)}</option>`).join("");
  return `<form class="quote-form${compact ? " compact" : ""}" ${site.formEndpoint ? `action="${esc(site.formEndpoint)}" method="POST"` : 'action="#" data-mailto="' + esc(site.email) + '"'} novalidate>
  <div class="form-row">
    <label>Name<input name="name" autocomplete="name" required></label>
    <label>Phone<input name="phone" type="tel" autocomplete="tel" required></label>
  </div>
  <label>Email<input name="email" type="email" autocomplete="email" required></label>
  <div class="form-row">
    <label>Service<select name="service" required><option value="">Choose one</option>${serviceOptions}<option>Other</option></select></label>
    <label>Date<input name="date" type="date" required></label>
  </div>
  ${compact ? "" : `<div class="form-row">
    <label>Pickup time<input name="time" type="time"></label>
    <label>Passengers<input name="passengers" type="number" min="1" max="60" inputmode="numeric"></label>
  </div>
  <label>Preferred vehicle<select name="vehicle"><option value="">No preference</option>${vehicleOptions}</select></label>
  <label>Pickup location<input name="pickup" autocomplete="street-address" placeholder="Address, hotel or airport"></label>
  <label>Drop-off / itinerary<textarea name="details" rows="4" placeholder="Destinations, stops, hours needed, special requests"></textarea></label>`}
  <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
  <button class="btn btn-gold btn-block" type="submit">Request My Free Quote</button>
  <p class="form-status" role="status" aria-live="polite"></p>
  <p class="form-note">Prefer to talk? Call <a href="${tel}">${esc(site.phone)}</a>, available 24/7.</p>
</form>`;
}

// ── pages ────────────────────────────────────────────────────────────────────

const pages = [];
const page = (p) => pages.push(p);

// Home
page({
  path: "/",
  title: "Limo Service Columbus, OH | A Team Limo | Weddings, Prom, CMH",
  description:
    "A Team Limo LLC is a top-rated limo service in Columbus, Ohio. Luxury limousines, party buses & SUVs for weddings, prom, CMH airport transfers, corporate travel & nights out. 24/7. Free quote.",
  schema: [faqSchema(generalFaqs.slice(0, 5))],
  body: `
<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">Columbus, Ohio &bull; Available 24/7</p>
      <h1>Columbus Limo Service<br><span>Arrive Like the A Team.</span></h1>
      <p class="lead">Luxury limousines, party buses and executive SUVs for weddings, prom, airport transfers, corporate travel and unforgettable nights out across Columbus and Central Ohio.</p>
      <div class="hero-actions">
        <a class="btn btn-gold" href="/contact/">Get a Free Quote</a>
        <a class="btn btn-outline" href="${tel}">${icon("phone")} Call ${esc(site.phone)}</a>
      </div>
      <ul class="trust">
        <li>${icon("check")} Licensed &amp; insured</li>
        <li>${icon("check")} Professional chauffeurs</li>
        <li>${icon("check")} No hidden fees</li>
      </ul>
    </div>
    <div class="hero-form">
      <h2>Get a Quick Quote</h2>
      ${quoteForm(true)}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Our Services</p>
      <h2>Limousine &amp; Car Service for Every Occasion</h2>
      <p>From the biggest day of your life to a 5 a.m. flight out of CMH, A Team Limo delivers a first-class ride.</p>
    </div>
    ${serviceCards()}
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Why A Team Limo</p>
      <h2>The Columbus Limo Company People Recommend</h2>
    </div>
    ${whyUs}
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">About Us</p>
      <h2>Your Local Columbus Limo Service</h2>
      <p>${esc(site.name)} is a locally owned and operated limousine and chauffeured transportation company based in Columbus, Ohio. We know Central Ohio, from game-day traffic around Ohio Stadium to the quickest route to John Glenn Columbus International Airport, and we treat every ride like a VIP event.</p>
      <p>Whether you need a <a href="/services/wedding-limo/">wedding limo</a>, a <a href="/services/prom-limo/">prom limo</a>, <a href="/services/airport-transportation/">airport car service to CMH</a>, <a href="/services/corporate-transportation/">corporate transportation</a> or a <a href="/services/party-bus/">party bus</a> for a night out, our team is ready 24 hours a day.</p>
      <a class="btn btn-dark" href="/about/">More About Us</a>
    </div>
    <div class="stat-grid">
      <div class="stat"><strong>24/7</strong><span>Reservations &amp; service</span></div>
      <div class="stat"><strong>${areas.length}+</strong><span>Central Ohio cities served</span></div>
      <div class="stat"><strong>${fleet.length}</strong><span>Vehicle classes</span></div>
      <div class="stat"><strong>100%</strong><span>Licensed &amp; insured</span></div>
    </div>
  </div>
</section>

<section class="section section-muted">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">The Fleet</p>
      <h2>Luxury Vehicles for Groups of Any Size</h2>
    </div>
    <div class="fleet-grid">
      ${fleet
        .slice(0, 3)
        .map(
          (v) => `<article class="vehicle">
        ${v.image ? `<img src="${esc(v.image)}" alt="${esc(v.name)} limo rental in Columbus, Ohio" loading="lazy" width="600" height="400">` : vehiclePlaceholder(v.name)}
        <div class="vehicle-body"><h3>${esc(v.name)}</h3><p class="seats">${esc(v.seats)}</p><p>${esc(v.bestFor)}</p></div>
      </article>`
        )
        .join("")}
    </div>
    <p class="center"><a class="btn btn-dark" href="/fleet/">View the Full Fleet</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Service Areas</p>
      <h2>Limo Service Throughout Columbus &amp; Central Ohio</h2>
      <p>Based in Columbus, we pick up across Franklin, Delaware, Licking, Fairfield and Union counties.</p>
    </div>
    ${areaChips()}
  </div>
</section>

<section class="section section-muted">
  <div class="container narrow">
    <div class="section-head">
      <p class="eyebrow">FAQ</p>
      <h2>Columbus Limo Service: Frequently Asked Questions</h2>
    </div>
    ${faqList(generalFaqs.slice(0, 5))}
    <p class="center"><a href="/faq/">See all FAQs &rarr;</a></p>
  </div>
</section>`,
});

// Services index
page({
  path: "/services/",
  title: "Limo Services in Columbus, OH | A Team Limo",
  description:
    "Explore A Team Limo's Columbus limo services: wedding limos, prom, CMH airport car service, corporate transportation, party buses, sporting events, special occasions and funerals.",
  crumbs: [["Services", "/services/"]],
  body: `
<section class="page-hero"><div class="container"><h1>Limo &amp; Chauffeured Services in Columbus, OH</h1><p class="lead">Whatever the occasion, we have the right vehicle and a professional chauffeur ready to go.</p></div></section>
<section class="section"><div class="container">${serviceCards()}</div></section>
<section class="section section-dark"><div class="container"><div class="section-head"><h2>Why Columbus Chooses A Team Limo</h2></div>${whyUs}</div></section>`,
});

// Service pages
for (const s of services) {
  const url = `/services/${s.slug}/`;
  const faqs = s.faqs.length ? s.faqs : [];
  page({
    path: url,
    title: (s.title + " | A Team Limo").length <= 62 ? `${s.title} | A Team Limo` : s.title,
    description: s.description,
    crumbs: [["Services", "/services/"], [s.name, url]],
    schema: [
      serviceSchema(s.name, url, s.description, areas.map((a) => ({ "@type": "City", name: `${a.city}, OH` }))),
      ...(faqs.length ? [faqSchema(faqs)] : []),
    ],
    body: `
<section class="page-hero"><div class="container"><p class="eyebrow">${icon(s.icon)} ${esc(s.short)}</p><h1>${esc(s.title)}</h1><p class="lead">${esc(s.intro)}</p>
<div class="hero-actions"><a class="btn btn-gold" href="/contact/">Get a Free Quote</a><a class="btn btn-outline" href="${tel}">${icon("phone")} ${esc(site.phone)}</a></div></div></section>
<section class="section"><div class="container split split-top">
  <div class="prose">
    <h2>What's Included</h2>
    <ul class="checklist">${s.bullets.map((b) => `<li>${icon("check")}<span>${esc(b)}</span></li>`).join("")}</ul>
    ${s.body.map((p) => `<p>${esc(p)}</p>`).join("")}
    <h2>Recommended Vehicles</h2>
    <p>${fleet.map((v) => `<strong>${esc(v.name)}</strong> (${esc(v.seats.toLowerCase())})`).join(", ")}. <a href="/fleet/">See the full fleet &rarr;</a></p>
    ${faqs.length ? `<h2>${esc(s.short)} FAQs</h2>${faqList(faqs)}` : ""}
  </div>
  <aside class="sidebar">
    <div class="sidebar-card"><h2>Request a Quote</h2>${quoteForm(true)}</div>
  </aside>
</div></section>
<section class="section section-muted"><div class="container">
  <div class="section-head"><h2>${esc(s.short)} Transportation Across Central Ohio</h2><p>We provide ${esc(s.name.toLowerCase())} throughout Columbus and these nearby communities:</p></div>
  ${areaChips()}
</div></section>
<section class="section"><div class="container"><div class="section-head"><h2>Other Services</h2></div>${serviceCards(services.filter((x) => x !== s).slice(0, 4))}</div></section>`,
  });
}

// Service areas index
page({
  path: "/service-areas/",
  title: "Limo Service Areas in Central Ohio | A Team Limo",
  description:
    "A Team Limo serves Columbus and all of Central Ohio, including Dublin, Westerville, Powell, Hilliard, Grove City, Gahanna, New Albany, Upper Arlington, Worthington and Delaware.",
  crumbs: [["Service Areas", "/service-areas/"]],
  body: `
<section class="page-hero"><div class="container"><h1>Limo Service Areas in Central Ohio</h1><p class="lead">Based in Columbus, A Team Limo provides limousine and car service across Franklin, Delaware, Licking, Fairfield and Union counties, plus long-distance trips anywhere in Ohio.</p></div></section>
<section class="section"><div class="container"><div class="area-grid">
${areas
  .map(
    (a) => `<a class="card area-card" href="/service-areas/${a.slug}/"><h2>${icon("pin")} ${esc(a.city)}, OH</h2><p>${esc(a.blurb)}</p><span class="card-link">${esc(a.city)} limo service &rarr;</span></a>`
  )
  .join("")}
</div></div></section>`,
});

// Area pages
for (const a of areas) {
  const url = `/service-areas/${a.slug}/`;
  const isColumbus = a.slug === "columbus";
  const h1 = isColumbus ? "Limo Service in Columbus, Ohio" : `Limo Service in ${a.city}, Ohio`;
  const desc = `Looking for a limo service in ${a.city}, OH? A Team Limo provides luxury limousines, party buses and car service in ${a.city} for weddings, prom, airport transfers to CMH and nights out. 24/7, free quotes.`;
  const areaFaqs = [
    [`Do you provide limo service in ${a.city}, Ohio?`, `Yes. A Team Limo serves all of ${a.city} (${a.zips}) and the rest of ${a.county}, with pickups at homes, hotels, venues and businesses 24/7.`],
    [`How much is a limo in ${a.city}?`, `Pricing depends on the vehicle, date and hours needed. Request a free quote and we'll give you an exact, all-inclusive price for your ${a.city} trip.`],
    [`Can you take me from ${a.city} to the Columbus airport?`, `Absolutely. We provide private car and limo service from ${a.city} to John Glenn Columbus International Airport (CMH) and Rickenbacker (LCK), with flight tracking included.`],
  ];
  page({
    path: url,
    title: `Limo Service ${a.city}, OH | Limo & Party Bus | A Team Limo`.length <= 62 ? `Limo Service ${a.city}, OH | Limo & Party Bus | A Team Limo` : `Limo Service ${a.city}, OH | A Team Limo`,
    description: desc,
    crumbs: [["Service Areas", "/service-areas/"], [a.city, url]],
    schema: [
      serviceSchema(`Limo Service in ${a.city}, OH`, url, desc, { "@type": "City", name: `${a.city}, OH` }),
      faqSchema(areaFaqs),
    ],
    body: `
<section class="page-hero"><div class="container"><p class="eyebrow">${icon("pin")} ${esc(a.county)}</p><h1>${esc(h1)}</h1>
<p class="lead">Luxury limousines, party buses and executive car service for ${esc(a.city)} residents, businesses and visitors. Weddings, prom, airport transfers, corporate travel and nights out, available 24/7.</p>
<div class="hero-actions"><a class="btn btn-gold" href="/contact/">Get a Free Quote</a><a class="btn btn-outline" href="${tel}">${icon("phone")} ${esc(site.phone)}</a></div></div></section>
<section class="section"><div class="container split split-top">
  <div class="prose">
    <h2>Your ${esc(a.city)} Limo Company</h2>
    ${a.copy.map((p) => `<p>${esc(p)}</p>`).join("")}
    <h2>Popular ${esc(a.city)} Destinations</h2>
    <ul class="checklist">${a.landmarks.map((l) => `<li>${icon("check")}<span>${esc(l)}</span></li>`).join("")}</ul>
    <h2>Limo Services in ${esc(a.city)}</h2>
    <ul class="link-list">${services.map((s) => `<li><a href="/services/${s.slug}/">${esc(a.city)} ${esc(s.short.toLowerCase())} ${s.slug === "airport-transportation" || s.slug === "corporate-transportation" ? "car service" : "limo"}</a></li>`).join("")}</ul>
    <h2>${esc(a.city)} Limo FAQs</h2>
    ${faqList(areaFaqs)}
  </div>
  <aside class="sidebar">
    <div class="sidebar-card"><h2>Free ${esc(a.city)} Quote</h2>${quoteForm(true)}</div>
  </aside>
</div></section>
<section class="section section-muted"><div class="container"><div class="section-head"><h2>Nearby Service Areas</h2></div>${areaChips(a.slug)}</div></section>`,
  });
}

// Fleet
page({
  path: "/fleet/",
  title: "Limo & Party Bus Fleet in Columbus, OH | A Team Limo",
  description:
    "Browse A Team Limo's Columbus fleet: stretch limousines, SUV limos, party buses, executive black SUVs, sedans and Sprinter vans. Clean, modern and fully insured.",
  crumbs: [["Fleet", "/fleet/"]],
  body: `
<section class="page-hero"><div class="container"><h1>Our Columbus Limo Fleet</h1><p class="lead">Spotless, modern vehicles for every group size, from a quiet sedan for one to a party bus for the whole crew.</p></div></section>
<section class="section"><div class="container"><div class="fleet-grid">
${fleet
  .map(
    (v) => `<article class="vehicle">
  ${v.image ? `<img src="${esc(v.image)}" alt="${esc(v.name)} rental in Columbus, Ohio" loading="lazy" width="600" height="400">` : vehiclePlaceholder(v.name)}
  <div class="vehicle-body">
    <h2>${esc(v.name)}</h2>
    <p class="seats">${esc(v.seats)}</p>
    <ul class="checklist small">${v.features.map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}</ul>
    <p><strong>Best for:</strong> ${esc(v.bestFor)}</p>
    <a class="btn btn-dark btn-sm" href="/contact/">Request this vehicle</a>
  </div>
</article>`
  )
  .join("")}
</div></div></section>`,
});

// About
page({
  path: "/about/",
  title: "About A Team Limo LLC | Locally Owned Columbus Limo Company",
  description:
    "A Team Limo LLC is a locally owned limousine company in Columbus, Ohio, built on punctuality, professionalism and first-class service for every client.",
  crumbs: [["About", "/about/"]],
  body: `
<section class="page-hero"><div class="container"><h1>About A Team Limo LLC</h1><p class="lead">A locally owned Columbus limo company built on one idea: every client deserves A-Team treatment.</p></div></section>
<section class="section"><div class="container split split-top">
  <div class="prose">
    <h2>Who We Are</h2>
    <p>${esc(site.name)} is a Columbus, Ohio limousine and chauffeured transportation company serving all of Central Ohio. We started with a simple goal: give Columbus a limo service that shows up on time, communicates clearly, charges fairly and makes every ride feel special.</p>
    <p>Today we drive couples on their wedding day, students on prom night, executives to meetings, travelers to CMH and friends out on the town, and we bring the same care and professionalism to every trip.</p>
    <h2>Our Promise</h2>
    <ul class="checklist">
      <li>${icon("check")}<span><strong>Punctuality:</strong> we arrive early, every time.</span></li>
      <li>${icon("check")}<span><strong>Safety:</strong> licensed, insured, background-checked chauffeurs and well-maintained vehicles.</span></li>
      <li>${icon("check")}<span><strong>Transparency:</strong> all-inclusive quotes with no hidden fees.</span></li>
      <li>${icon("check")}<span><strong>Hospitality:</strong> courteous chauffeurs who treat you like a VIP.</span></li>
    </ul>
    <h2>Proudly Local</h2>
    <p>We live and work in Central Ohio. We know the shortcuts on game day, the best photo spots for wedding parties, and the fastest way to the airport at rush hour. When you book with A Team Limo, you're supporting a local Columbus business.</p>
  </div>
  <aside class="sidebar"><div class="sidebar-card"><h2>Get in Touch</h2>
    <p>${icon("phone")} <a href="${tel}">${esc(site.phone)}</a></p>
    <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
    <p>Serving Columbus &amp; Central Ohio<br>${site.open24x7 ? "Open 24/7" : ""}</p>
    <a class="btn btn-gold btn-block" href="/contact/">Get a Free Quote</a>
  </div></aside>
</div></section>
<section class="section section-dark"><div class="container">${whyUs}</div></section>`,
});

// FAQ
page({
  path: "/faq/",
  title: "Limo Rental FAQ: Prices & Booking | A Team Limo Columbus",
  description:
    "Answers to common questions about renting a limo in Columbus, Ohio: pricing, booking, service areas, alcohol policy, cancellations and more.",
  crumbs: [["FAQ", "/faq/"]],
  schema: [faqSchema(generalFaqs)],
  body: `
<section class="page-hero"><div class="container"><h1>Limo Rental FAQ</h1><p class="lead">Everything you need to know about booking a limo in Columbus. Still have questions? Call <a href="${tel}">${esc(site.phone)}</a>.</p></div></section>
<section class="section"><div class="container narrow">${faqList(generalFaqs)}</div></section>`,
});

// Contact
page({
  path: "/contact/",
  title: "Contact & Free Limo Quote | A Team Limo LLC Columbus, OH",
  description: `Get a free limo quote from A Team Limo in Columbus, Ohio. Call ${site.phone} or request a quote online for weddings, prom, airport transfers, corporate travel and more. 24/7.`,
  crumbs: [["Contact", "/contact/"]],
  body: `
<section class="page-hero"><div class="container"><h1>Get a Free Limo Quote</h1><p class="lead">Tell us about your trip and we'll get back to you quickly with an all-inclusive price. Need an answer now? Call us 24/7.</p></div></section>
<section class="section"><div class="container split split-top">
  <div class="sidebar-card">${quoteForm(false)}</div>
  <aside class="contact-info">
    <h2>Contact ${esc(site.name)}</h2>
    <p class="big-phone"><a href="${tel}">${icon("phone")} ${esc(site.phone)}</a></p>
    <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
    <p>${site.address.street ? `${esc(site.address.street)}<br>` : ""}${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}</p>
    <p>${site.open24x7 ? "<strong>Hours:</strong> Open 24 hours, 7 days a week" : ""}</p>
    <h3>Areas We Serve</h3>
    <p>${areas.map((a) => `<a href="/service-areas/${a.slug}/">${esc(a.city)}</a>`).join(", ")}, and all of Central Ohio.</p>
    <div class="map-wrap"><iframe title="A Team Limo service area map, Columbus Ohio" src="https://www.google.com/maps?q=Columbus,+OH&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </aside>
</div></section>`,
});

// Thank-you page for form submissions (not indexed)
page({
  path: "/thank-you/",
  title: "Thank You | A Team Limo",
  description: "Thanks for your quote request. A Team Limo will be in touch shortly.",
  noindex: true,
  body: `<section class="page-hero"><div class="container"><h1>Thank You!</h1><p class="lead">We received your request and will get back to you shortly. For immediate help, call <a href="${tel}">${esc(site.phone)}</a>.</p><a class="btn btn-gold" href="/">Back to Home</a></div></section>`,
});

// ── write pages ──────────────────────────────────────────────────────────────

for (const p of pages) {
  write(path.join(p.path, "index.html"), layout(p));
}

write(
  "404.html",
  layout({
    path: "/404.html",
    title: "Page Not Found | A Team Limo",
    description: "Sorry, that page could not be found.",
    noindex: true,
    body: `<section class="page-hero"><div class="container"><h1>Page Not Found</h1><p class="lead">Sorry, we couldn't find that page. Try one of these instead:</p><div class="hero-actions"><a class="btn btn-gold" href="/">Home</a><a class="btn btn-outline" href="/services/">Services</a><a class="btn btn-outline" href="/contact/">Get a Quote</a></div></div></section>`,
  })
);

// sitemap.xml
const priority = (p) => (p === "/" ? "1.0" : p.split("/").length <= 3 ? "0.9" : "0.8");
const indexed = pages.filter((p) => !p.noindex);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${BUILD_DATE}</lastmod><priority>${priority(p.path)}</priority></url>`).join("\n")}
</urlset>
`
);

write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${abs("/sitemap.xml")}\n`);

write(
  "site.webmanifest",
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      start_url: "/",
      display: "standalone",
      background_color: "#0b0b0f",
      theme_color: "#0b0b0f",
      icons: [
        { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  )
);

console.log(`Built ${pages.length + 1} pages into public/ (${indexed.length} in sitemap).`);
