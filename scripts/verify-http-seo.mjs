import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { once } from "node:events";

// Run after npm run build. Own the server so checks cannot hit a stale dev build.
const port = 3197;
const base = `http://127.0.0.1:${port}`;
const origin = "https://www.dawoodtech.com";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: ["ignore", "pipe", "pipe"] });
let logs = "";
let ready;
const started = new Promise((resolve, reject) => {
  ready = setTimeout(() => reject(new Error(`Server startup timed out: ${logs}`)), 30000);
  const capture = (chunk) => {
    logs += chunk.toString();
    if (logs.includes("Ready in")) resolve();
  };
  server.stdout.on("data", capture);
  server.stderr.on("data", capture);
  server.once("error", reject);
  server.once("exit", (code) => reject(new Error(`Server exited (${code}): ${logs}`)));
});
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const targets = ["/services", "/solutions", "/company", "/work", "/contact"];
try {
  await started;
  clearTimeout(ready);
  const get = async (path) => {
    const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(15000) });
    return { response, body: await response.text() };
  };
  const { response: sitemapResponse, body: sitemap } = await get("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.equal(sitemap, readFileSync(".next/server/app/sitemap.xml.body", "utf8"));
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 20, "Expected 20 canonical pages");
  const pages = new Map();
  const resources = new Set(["/icon.svg", "/apple-icon.png", "/favicon.png"]);
  const links = [];
  for (const url of urls) {
    assert.equal(new URL(url).origin, origin);
    const path = new URL(url).pathname;
    const { response, body } = await get(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.ok(!/noindex|nofollow/i.test(response.headers.get("x-robots-tag") ?? ""), `Blocked HTTP robots: ${path}`);
    const generated = readFileSync(`.next/server/app/${path === "/" ? "index" : path.slice(1)}.html`, "utf8");
    for (const pattern of [/<title>.*?<\/title>/g, /<meta\b[^>]*>/g, /<link\b[^>]*rel="canonical"[^>]*>/g, /<script type="application\/ld\+json">.*?<\/script>/g]) {
      assert.deepEqual(body.match(pattern), generated.match(pattern), `HTTP/build SEO mismatch: ${path}`);
    }
    const ids = new Set([...body.matchAll(/\bid="([^"]*)"/g)].map((match) => decode(match[1])));
    pages.set(path, ids);
    for (const [tag] of body.matchAll(/<a\b[^>]*>/g)) {
      const href = attrs(tag).href;
      if (!href) continue;
      const target = new URL(decode(href), origin + path);
      if (target.origin === origin) links.push({ from: path, target });
    }
    for (const [tag] of body.matchAll(/<(?:script|link|img)\b[^>]*>/g)) {
      const attributes = attrs(tag);
      const value = attributes.src ?? (attributes.rel !== "canonical" ? attributes.href : undefined);
      if (value?.startsWith("/")) resources.add(decode(value));
    }
    for (const landmark of ["header", "footer"]) {
      const section = body.match(new RegExp(`<${landmark}\\b[^>]*>(.*?)</${landmark}>`, "s"))?.[1];
      assert.ok(section, `Missing ${landmark}: ${path}`);
      for (const target of targets) assert.ok(section.includes(`href="${target}"`), `${landmark} missing ${target}: ${path}`);
    }
    console.log(`200 ${path}`);
  }
  for (const { from, target } of links) {
    assert.ok(pages.has(target.pathname), `Broken internal link: ${from} -> ${target.href}`);
    if (target.hash) assert.ok(pages.get(target.pathname).has(decodeURIComponent(target.hash.slice(1))), `Broken fragment: ${from} -> ${target.href}`);
  }
  for (const resource of resources) {
    const response = await fetch(new URL(resource, base), { redirect: "manual", signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, `Broken asset: ${resource}`);
    await response.arrayBuffer();
  }
  const { response: robotsResponse, body: robots } = await get("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.equal(robots, readFileSync(".next/server/app/robots.txt.body", "utf8"));
  assert.ok(!/Disallow:\s*\/\s*$/m.test(robots));
  for (const [path, destination] of [["/about", "/company"], ["/capabilities", "/services"], ["/process", "/services"], ["/services/", "/services"]]) {
    const { response } = await get(path);
    assert.equal(response.status, 308, path);
    assert.equal(response.headers.get("location"), destination, path);
  }
  for (const path of ["/insights", "/services/unknown", "/work/unknown", "/oil-crisis-brewing-global-market"]) {
    assert.equal((await get(path)).response.status, 404, path);
  }
  assert.ok(!/\bError:|Unhandled|uncaught/i.test(logs), `Server errors: ${logs}`);
  console.log(`HTTP QA passed: ${pages.size} pages, ${links.length} internal links/fragments, ${resources.size} local resources, build metadata parity, shared navigation, robots, sitemap, redirects and 404s. No server errors observed.`);
} finally {
  clearTimeout(ready);
  if (server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill();
    await exited;
  }
}
