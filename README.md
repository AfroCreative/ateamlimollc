# A Team Limo LLC: Website

A fast, mobile-first, SEO-optimized website for **A Team Limo LLC**, a limo service in Columbus, Ohio.

- **33 pages**: home, 8 service pages, 16 local city pages (Columbus, Dublin, Westerville, Powell, Hilliard, Grove City, Gahanna, New Albany, Upper Arlington, Worthington, Delaware, Lewis Center, Reynoldsburg, Pickerington, Grandview Heights, Bexley), fleet, about, FAQ, contact/quote, thank-you and 404.
- Plain HTML/CSS with a tiny bit of JS. No frameworks and nothing to slow it down, so it loads fast (page speed is a Google ranking factor).

## Editing the site

1. **Business details** (phone, email, domain, address, social links, form endpoint): edit `src/config.js`.
2. **Text for services, cities, fleet and FAQs**: edit `src/content.js`.
3. **Design**: `public/css/styles.css`.
4. Rebuild the pages:

   ```bash
   npm run build      # regenerates every page in public/
   npm run serve      # preview at http://localhost:8080
   ```

Don't edit the generated `.html` files in `public/` directly, because the next build overwrites them.

### Adding vehicle photos

Real photos make a big difference for both customers and Google Images. Put photos in `public/images/` (JPG/WebP, about 1200×800, under 200 KB each), then set `image: "/images/stretch-limo.jpg"` for that vehicle in `src/content.js` and rebuild.

### Quote form

By default the form opens the visitor's email app, pre-filled. To receive submissions straight to your inbox instead, create a free form at [formspree.io](https://formspree.io), paste its endpoint into `formEndpoint` in `src/config.js`, and rebuild.

## Hosting (pick one)

- **Netlify**: connect this repo. `netlify.toml` already sets the build command and publish folder.
- **GitHub Pages**: in repo Settings → Pages, set Source to **GitHub Actions**. `.github/workflows/deploy-pages.yml` deploys on every push to `main`. Then add your custom domain in the same settings page.
- **Any web host**: run `npm run build` and upload the contents of `public/`.

## What's built in for SEO

- Keyword-targeted titles and meta descriptions on every page ("Limo Service Columbus, OH", "Wedding Limo Service in Columbus, OH", "Limo Service Dublin, OH"…)
- A dedicated page for each service and each nearby city, each with unique local content (venues, schools, landmarks), so the site can rank for "limo service [city]" searches, not just one.
- schema.org structured data: LocalBusiness (with service area, hours, phone and services), Service, FAQPage (eligible for FAQ results) and BreadcrumbList
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph / Twitter share cards, geo meta tags
- Consistent Name/Address/Phone (NAP) on every page, all generated from one config file
- Mobile-first layout with a sticky click-to-call button, semantic HTML and accessible markup
- Strong internal linking between services and cities
- Optional Google Analytics 4 with call-click and quote-form conversion tracking

## ⚠️ Go-live checklist: what actually gets you to the top of Google

No website alone can guarantee the #1 spot. For "limo service Columbus" searches, Google mostly shows the **map pack** (the top 3 businesses on the map), which is driven by your **Google Business Profile**. This site is built to support that, but you need to do these steps too:

1. **Replace the placeholders** in `src/config.js`: real phone, email and domain (the phone `(614) 555-0142` is a placeholder). Update the fleet in `src/content.js` to match your actual vehicles. Rebuild.
2. **Google Business Profile** (most important): create or claim it at business.google.com.
   - Category: **Limousine service**. Secondary categories: *Airport shuttle service*, *Party bus service*, *Chauffeur service*.
   - Use the **exact same** name, phone and website as this site. Add your service areas (the cities above), hours, and lots of photos of your vehicles.
   - Post updates weekly and answer the Q&A.
   - Paste your profile link into `social.google` in `src/config.js`.
3. **Reviews**: ask every happy customer for a Google review (send them your review link by text after each ride). Number, recency and rating of reviews is a top local ranking factor. Reply to every review.
4. **Google Search Console**: verify the site (put the code in `googleSiteVerification`) and submit `https://yourdomain.com/sitemap.xml`.
5. **Citations**: list the business with identical name/phone/website on Yelp, Bing Places, Apple Business Connect, Facebook, The Knot and WeddingWire (for weddings), Nextdoor, BBB and the Columbus chamber of commerce.
6. **Backlinks**: get linked from local wedding venues, hotels, event planners, high school PTOs and prom committees, and local sponsorships.
7. **Real photos**: replace the vehicle placeholders with your own photos (see above).
8. Keep content fresh: add new pages over time (e.g. specific wedding venues or holiday light tours).
