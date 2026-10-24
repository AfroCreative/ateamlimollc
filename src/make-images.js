#!/usr/bin/env node
// Renders the social-share image (og-image.png), logo and app icons with
// Playwright. Only needs re-running if you change the branding.
// Usage: npm run images   (requires `playwright` to be installed)

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const site = require("./config");

const IMG = path.join(__dirname, "..", "public", "images");
fs.mkdirSync(IMG, { recursive: true });

const fonts =
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">';

const mark = (size) => `<!doctype html><html><head>${fonts}<style>
html,body{margin:0;width:${size}px;height:${size}px;background:#0b0b0f}
div{width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle,#e6c87a 0,#c9a24b 55%,#9c7a2e 100%);border-radius:${size * 0.22}px;
font:700 ${size * 0.62}px/1 "Playfair Display",Georgia,serif;color:#0b0b0f}</style></head><body><div>A</div></body></html>`;

const og = `<!doctype html><html><head>${fonts}<style>
html,body{margin:0;width:1200px;height:630px}
body{background:radial-gradient(900px 420px at 90% -10%,rgba(201,162,75,.35),transparent 60%),linear-gradient(180deg,#0b0b0f,#1a1a23);color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;position:relative;overflow:hidden}
.m{width:96px;height:96px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#e6c87a,#9c7a2e);color:#0b0b0f;font:700 58px "Playfair Display",serif;margin-bottom:34px}
h1{font:700 82px/1.05 "Playfair Display",serif;margin:0 0 18px}
h1 span{color:#e6c87a}
p{font-size:32px;margin:0;color:#d6d6de}
.b{position:absolute;left:90px;bottom:54px;font-size:28px;font-weight:700;color:#e6c87a;letter-spacing:.04em}
.bar{position:absolute;left:0;right:0;bottom:0;height:12px;background:linear-gradient(90deg,#e6c87a,#c9a24b)}
</style></head><body><div class="m">A</div><h1>A Team Limo<br><span>Columbus Limo Service</span></h1>
<p>Weddings &bull; Prom &bull; CMH Airport &bull; Corporate &bull; Party Bus</p>
<div class="b">${site.phone} &nbsp;&middot;&nbsp; Available 24/7</div><div class="bar"></div></body></html>`;

// Wrap a PNG in an .ico container (PNG-in-ICO is supported by all browsers).
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  header.writeUInt32LE(png.length, 16);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

(async () => {
  const browser = await chromium.launch();
  const shot = async (html, w, h, file) => {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(html, { waitUntil: "networkidle" });
    const buf = await page.screenshot({ path: file ? path.join(IMG, file) : undefined, omitBackground: false });
    await page.close();
    return buf;
  };
  await shot(og, 1200, 630, "og-image.png");
  await shot(mark(512), 512, 512, "logo.png");
  await shot(mark(512), 512, 512, "icon-512.png");
  await shot(mark(192), 192, 192, "icon-192.png");
  await shot(mark(180), 180, 180, "apple-touch-icon.png");
  const fav = await shot(mark(32), 32, 32);
  fs.writeFileSync(path.join(__dirname, "..", "public", "favicon.ico"), pngToIco(fav, 32));
  await browser.close();
  console.log("Images written to public/images/ and public/favicon.ico");
})();
