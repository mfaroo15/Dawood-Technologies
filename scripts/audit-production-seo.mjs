// Read-only public HTTP audit. No indexing submissions or account changes.
import { writeFileSync, readFileSync, existsSync } from "node:fs";
const origin = "https://www.dawoodtech.com";
const get = async (url, userAgent) => {
  const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20000), headers: userAgent ? { "User-Agent": userAgent } : {} });
  return { status: response.status, location: response.headers.get("location"), robots: response.headers.get("x-robots-tag"), body: await response.text() };
};
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const sitemap = await get(`${origin}/sitemap.xml`);
const urls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const pages = [];
for (const url of urls) {
  const r = await get(url);
  const tags = [...r.body.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(m => attrs(m[0]));
  const images = [...r.body.matchAll(/<img\b[^>]*>/g)].map(m => attrs(m[0]));
  const schemas = [...r.body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  const path = new URL(url).pathname;
  const local = `.next/server/app/${path === "/" ? "index" : path.slice(1)}.html`;
  const title = r.body.match(/<title>(.*?)<\/title>/s)?.[1];
  const canonical = tags.filter(t => t.rel === "canonical").map(t => t.href);
  const description = tags.filter(t => t.name === "description").map(t => t.content);
  const links = [...r.body.matchAll(/<a\b[^>]*>/g)].map(m => attrs(m[0]).href).filter(Boolean);
  const localHtml = existsSync(local) ? readFileSync(local, "utf8") : "";
  pages.push({ url, status: r.status, title, description, canonical, robotsHeader: r.robots, robotsMeta: tags.filter(t => /robots|googlebot|bingbot/.test(t.name ?? "")), images: images.map(i => ({ src: i.src, alt: i.alt, hasAlt: Object.hasOwn(i, "alt") })), schemas, links, h1Count: (r.body.match(/<h1\b/g) ?? []).length, localTitleMatches: localHtml.includes(`<title>${title}</title>`), localCanonicalMatches: canonical.every(c => localHtml.includes(`href="${c}"`)) });
}
const probes = [];
for (const url of ["http://dawoodtech.com/", "http://www.dawoodtech.com/", "https://dawoodtech.com/", "https://dawoodtech.com/services", `${origin}/about`, `${origin}/capabilities`, `${origin}/process`]) {
  const r = await get(url); probes.push({ url, status: r.status, location: r.location });
}
const bots = [];
for (const agent of ["Googlebot", "bingbot"]) {
  for (const url of [...urls, `${origin}/robots.txt`, `${origin}/sitemap.xml`]) {
    const r = await get(url, agent); bots.push({ agent, url, status: r.status, robots: r.robots, hasMain: r.body.includes('<main'), canonical: r.body.match(/<link rel="canonical" href="([^"]*)"/)?.[1] });
  }
}
const robots = await get(`${origin}/robots.txt`);
const report = { checkedAt: new Date().toISOString(), sitemap: { status: sitemap.status, urls, matchesLocal: existsSync('.next/server/app/sitemap.xml.body') && sitemap.body === readFileSync('.next/server/app/sitemap.xml.body', 'utf8') }, robots, pages, probes, bots };
writeFileSync("production-seo-evidence.json", JSON.stringify(report, null, 2) + "\n");
console.log(`Saved production-seo-evidence.json: ${pages.length} pages, ${bots.length} crawler probes, ${probes.length} redirect probes.`);
