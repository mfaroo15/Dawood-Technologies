import { chromium } from "playwright-core";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";

// Only launch an installed Chrome. Never install or download browser binaries.
const executablePath = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
if (!existsSync(executablePath)) throw new Error(`Existing Chrome not found: ${executablePath}. Set CHROME_PATH; no browser will be downloaded.`);
const output = resolve(process.env.VISUAL_OUTPUT ?? "coverage/visual");
mkdirSync(output, { recursive: true });
const port = Number(process.env.VISUAL_PORT ?? 3198);
const base = process.env.VISUAL_BASE_URL ?? `http://127.0.0.1:${port}`;
const server = process.env.VISUAL_BASE_URL ? null : spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(port)], { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
let serverLogs = "";
server?.stdout.on("data", (chunk) => { serverLogs += chunk; });
server?.stderr.on("data", (chunk) => { serverLogs += chunk; });
const services = ["technology-consulting", "ai-automation", "cloud-devops", "application-development", "enterprise-erp", "data-services", "cybersecurity", "managed-technology"];
const paths = ["/services", "/solutions", "/industries", "/company", ...services.map((slug) => `/services/${slug}`)];
const sizes = [{ name: "desktop", width: 1440, height: 1000 }, { name: "tablet", width: 768, height: 1024 }, { name: "mobile", width: 390, height: 844 }];
const cases = sizes.flatMap((size) => [size, { name: `${size.name}-zoom200-equivalent`, width: size.width / 2, height: size.height / 2 }]);
const results = [];
const failures = [];
const internalTargets = new Set();
const captureOptions = { animations: "disabled" };
let browser;
const escape = (text) => String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
try {
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server?.exitCode !== null && server?.exitCode !== undefined) throw new Error(`Dev server exited: ${serverLogs}`);
    try { if ((await fetch(`${base}/services`, { signal: AbortSignal.timeout(2000) })).ok) break; } catch { /* Startup can include initial compilation. */ }
    if (attempt === 119) throw new Error(`Server not ready: ${serverLogs}`);
    await new Promise((done) => setTimeout(done, 500));
  }
  browser = await chromium.launch({ executablePath, headless: true });
  console.log(`Using installed Chrome ${browser.version()} at ${executablePath}`);
  for (const size of cases) {
    const context = await browser.newContext({ viewport: { width: size.width, height: size.height }, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const path of paths) {
      const errorStart = errors.length;
      const response = await page.goto(base + path, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.locator("main").waitFor();
      // Offscreen lazy images are pending, not broken. Load them before checking.
      await page.evaluate(async () => { await Promise.all([...document.images].map(async (img) => { img.loading = "eager"; try { await img.decode(); } catch { /* Failed decodes are reported below. */ } })); });
      // The site's CSP blocks injected stylesheet tags. Inline style attributes are
      // permitted; hide only the development overlay, which is absent in production.
      await page.evaluate(() => document.querySelectorAll("nextjs-portal").forEach((el) => el.style.setProperty("display", "none", "important")));
      const metrics = await page.evaluate(() => {
        const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
        const describe = (el) => ({ tag: el.tagName, class: el.className?.baseVal ?? el.className, text: el.textContent.trim().slice(0, 100) });
        const outside = [...document.querySelectorAll("header *, main *, footer *")].filter(visible).filter((el) => { const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }).map(describe);
        const textOutside = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (!node.textContent.trim() || !node.parentElement.closest("header, main, footer") || !visible(node.parentElement) || node.parentElement.closest("script, style, .visually-hidden, .skip-link")) continue;
          const range = document.createRange(); range.selectNodeContents(node);
          if ([...range.getClientRects()].some((r) => r.left < -1 || r.right > innerWidth + 1)) textOutside.push(node.textContent.trim().slice(0, 100));
        }
        const clipping = [...document.querySelectorAll("main a, main p, main h1, main h2, main h3, main li")].filter(visible).filter((el) => el.scrollWidth > el.clientWidth + 2 && !["visible", "clip"].includes(getComputedStyle(el).overflowX)).map(describe);
        const labels = [...document.querySelectorAll(".capability-overview-intro .text-link")].map((a) => { const range = document.createRange(); const rects = [...a.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()).flatMap((node) => { range.selectNodeContents(node); return [...range.getClientRects()]; }); return { text: a.textContent.trim(), href: a.getAttribute("href"), lines: new Set(rects.map((r) => Math.round(r.top))).size, width: a.getBoundingClientRect().width }; });
        const navItems = [...document.querySelectorAll(".header-inner > *")].filter(visible);
        const headerOverlaps = [];
        for (let i = 0; i < navItems.length; i++) for (let j = i + 1; j < navItems.length; j++) { const a = navItems[i].getBoundingClientRect(), b = navItems[j].getBoundingClientRect(); if (Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1) headerOverlaps.push([describe(navItems[i]),describe(navItems[j])]); }
        return { viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, outside, textOutside, clipping, labels, headerOverlaps, internal: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href")), brokenImages: [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src) };
      });
      metrics.internal.forEach((href) => internalTargets.add(href));
      delete metrics.internal;
      const screenshot = `${size.name}--${path.slice(1).replaceAll("/", "--")}.png`;
      await page.screenshot({ path: resolve(output, screenshot), fullPage: true, ...captureOptions });
      const interactions = [];
      try {
        const toggle = page.locator(".menu-toggle");
        if (await toggle.isVisible()) {
          await toggle.click();
          const panel = page.locator("#mobile-navigation");
          if (!(await panel.isVisible()) || await toggle.getAttribute("aria-expanded") !== "true") throw new Error("Mobile menu did not open");
          if (path === "/services") await page.screenshot({ path: resolve(output, `${size.name}--navigation-open.png`), fullPage: false, ...captureOptions });
          await page.keyboard.press("Escape");
          if (await panel.count() || !(await toggle.evaluate((el) => el === document.activeElement))) throw new Error("Escape/focus restoration failed");
          await toggle.click();
          await page.locator('#mobile-navigation a[href="/company"]').click();
          await page.waitForURL(base + "/company");
          if (await panel.count()) throw new Error("Mobile menu did not close after navigation");
          interactions.push("Mobile menu open/Escape/focus restoration/link navigation/close passed");
        } else {
          await page.locator('.desktop-nav a[href="/company"]').click();
          await page.waitForURL(base + "/company");
          interactions.push("Desktop navigation passed");
        }
        await page.goto(base + path, { waitUntil: "networkidle" });
        const bodyLink = page.locator('main a[href^="/"]').first();
        if (await bodyLink.count()) { const target = await bodyLink.getAttribute("href"); await bodyLink.click(); await page.waitForURL(base + target); interactions.push(`Body link click passed: ${target}`); }
        await page.goto(base + path, { waitUntil: "networkidle" });
        const cta = page.locator('main a[href="/contact"]').first();
        await cta.click(); await page.waitForURL(base + "/contact");
        interactions.push("Contact button navigation passed (no form submitted)");
      } catch (error) { failures.push({ path, size: size.name, interaction: error.message }); console.error(`Interaction issue at ${size.name} ${path}: ${error.message}`); }
      const result = { path, size: size.name, width: size.width, height: size.height, status: response.status(), screenshot, metrics, interactions, errors: errors.slice(errorStart) };
      results.push(result);
      if (result.status !== 200 || metrics.scrollWidth > size.width + 1 || metrics.outside.length || metrics.textOutside.length || metrics.clipping.length || metrics.headerOverlaps.length || metrics.brokenImages.length || result.errors.length) failures.push({ path, size: size.name, reason: "Review layout/runtime metrics", outside: metrics.outside.length, textOutside: metrics.textOutside.length, headerOverlaps: metrics.headerOverlaps.length, errors: result.errors });
      console.log(`${size.name} ${path}: ${result.status}; outside=${metrics.outside.length}; textOutside=${metrics.textOutside.length}; overlaps=${metrics.headerOverlaps.length}`);
    }
    await context.close();
  }
  const linkPage = await browser.newPage();
  const linkResults = [];
  for (const href of internalTargets) {
    const response = await linkPage.request.get(base + href);
    linkResults.push({ href, status: response.status() });
    if (!response.ok()) failures.push({ href, status: response.status() });
  }
  await linkPage.close();
  const report = { browser: browser.version(), executablePath, base, zoomMethod: "Half CSS viewport width and height at unchanged device scale. Tests 200% browser-zoom reflow equivalents, not actual browser chrome zoom or text-only zoom.", results, linkResults, failures };
  writeFileSync(resolve(output, "results.json"), JSON.stringify(report, null, 2));
  writeFileSync(resolve(output, "index.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><title>Visual verification screenshots</title><style>body{font:16px system-ui;margin:24px;background:#eee}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}article{background:white;padding:12px}img{width:100%;height:480px;object-fit:contain;object-position:top;background:#ddd}a{color:#154580}</style><h1>Dawood Technologies visual verification</h1><p>${results.length} page captures. Existing Chrome ${escape(report.browser)}. Zoom captures use half-width/half-height CSS viewports.</p><p><a href="results.json">Detailed measurements and interaction results</a></p><section>${results.map((r) => `<article><h2>${escape(r.path)}</h2><p>${escape(r.size)}: ${r.width} × ${r.height}</p><a href="${r.screenshot}"><img loading="lazy" src="${r.screenshot}" alt="${escape(r.path + ' ' + r.size)}"></a></article>`).join("")}</section></html>`);
  console.log(`Saved ${results.length} page screenshots, gallery and results to ${output}. Findings requiring review: ${failures.length}.`);
  if (failures.length) process.exitCode = 1;
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    if (process.platform === "win32") {
      const stopped = spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], { windowsHide: true, stdio: "ignore", timeout: 10000 });
      if (stopped.error || stopped.status !== 0) { server.kill(); console.warn(`Could not confirm server-tree cleanup for PID ${server.pid}; check the owned server process.`); }
    }
    else server.kill();
    server.stdout.destroy(); server.stderr.destroy(); server.unref();
  }
  writeFileSync(resolve(output, "server.log"), serverLogs);
}
