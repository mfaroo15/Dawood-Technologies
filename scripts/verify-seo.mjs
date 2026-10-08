import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Run after next build; verify the actual prerendered output rather than source declarations.
const output = join(process.cwd(), ".next/server/app");
const origin = "https://www.dawoodtech.com";
const sitemap = readFileSync(join(output, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const titles = new Set();
const descriptions = new Set();
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
for (const url of urls) {
  assert.ok(url.startsWith(`${origin}/`), `Wrong origin: ${url}`);
  const path = new URL(url).pathname;
  const html = readFileSync(join(output, `${path === "/" ? "index" : path.slice(1)}.html`), "utf8");
  const titleTags = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(titleTags.length, 1, `Title count: ${path}`);
  const title = titleTags[0][1];
  assert.ok(title && !titles.has(title), `Empty/duplicate title: ${path}`);
  titles.add(title);
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const descriptionTags = tags.filter((tag) => tag.name === "description");
  assert.equal(descriptionTags.length, 1, `Description count: ${path}`);
  const description = descriptionTags[0].content;
  assert.ok(description && !descriptions.has(description), `Empty/duplicate description: ${path}`);
  descriptions.add(description);
  const canonical = tags.filter((tag) => tag.rel === "canonical");
  assert.equal(canonical.length, 1, `Canonical count: ${path}`);
  assert.equal(new URL(canonical[0].href).href, url, `Canonical mismatch: ${path}`);
  for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
    assert.ok(tags.some((tag) => tag.property === property && tag.content), `${property}: ${path}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    assert.ok(tags.some((tag) => tag.name === name && tag.content), `${name}: ${path}`);
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `H1 count: ${path}`);
  assert.ok(!tags.some((tag) => tag.name === "robots" && /noindex|nofollow/.test(tag.content)), `Robots restriction: ${path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  if (path === "/") {
    const graph = schemas.flatMap((schema) => schema["@graph"] ?? [schema]);
    for (const type of ["Organization", "WebSite"]) {
      assert.equal(graph.filter((schema) => schema["@type"] === type).length, 1, `Schema count: ${type}`);
    }
    assert.ok(tags.some((tag) => tag.rel === "icon" && tag.href === "/favicon.png"), "Stable PNG favicon missing");
  }
  if (/^\/(services|work)\/.+/.test(path)) {
    const breadcrumbs = schemas.filter((schema) => schema["@type"] === "BreadcrumbList");
    assert.equal(breadcrumbs.length, 1, `Breadcrumb count: ${path}`);
    breadcrumbs[0].itemListElement.forEach((item, index) => {
      assert.equal(item.position, index + 1);
      assert.ok(urls.includes(item.item), `Unknown breadcrumb: ${item.item}`);
    });
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attributes(tag).href;
    if (href?.startsWith("/") && !href.startsWith("//")) {
      const target = new URL(href, origin).pathname;
      assert.ok(urls.includes(`${origin}${target}`), `Broken/noncanonical internal link: ${path} -> ${href}`);
    }
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok("alt" in attributes(tag), `Image missing alt: ${path}`);
  }
}
for (const path of ["/", "/services", "/solutions", "/work", "/company", "/careers", "/contact", "/industries", "/services/data-services"]) {
  assert.ok(urls.includes(`${origin}${path}`), `Primary page missing: ${path}`);
}
assert.ok(!urls.some((url) => /insights|capabilities|process/.test(new URL(url).pathname) || new URL(url).pathname === "/about"), "Noncanonical route in sitemap");
const routesManifest = JSON.parse(readFileSync(join(process.cwd(), ".next/routes-manifest.json"), "utf8"));
assert.ok(routesManifest.redirects.some((redirect) => redirect.source === "/about" && redirect.destination === "/company" && redirect.statusCode === 308), "Missing permanent About redirect");
const robots = readFileSync(join(output, "robots.txt.body"), "utf8");
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(robots.includes("Allow: /"));
assert.ok(existsSync(join(process.cwd(), "public/favicon.png")));
console.log(`SEO checks passed for ${urls.length} canonical pages: unique metadata, social tags, H1s, JSON-LD, internal links, image alt attributes, sitemap and robots.`);
