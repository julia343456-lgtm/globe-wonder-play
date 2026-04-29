import { createFileRoute } from "@tanstack/react-router";

const ROUTES = ["/", "/services", "/work", "/process", "/about", "/insights", "/contact"];
const SLUGS = ["aurora-dtc", "helio-finance", "orbiter-studio", "nimbus-health", "vector-atlas", "luma-cosmetics"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const base = "https://neomteckverse.com";
        const today = new Date().toISOString().slice(0, 10);
        const urls = [
          ...ROUTES.map((r) => `<url><loc>${base}${r}</loc><lastmod>${today}</lastmod></url>`),
          ...SLUGS.map((s) => `<url><loc>${base}/work/${s}</loc><lastmod>${today}</lastmod></url>`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
