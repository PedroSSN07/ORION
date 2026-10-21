import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const site = env.VITE_SITE_URL
    ? new URL(env.VITE_SITE_URL).href.replace(/\/$/, "")
    : "";
  return {
    base: env.VITE_BASE_PATH || "/",
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "orion-seo",
        generateBundle() {
          if (site) {
            this.emitFile({
              type: "asset",
              fileName: "sitemap.xml",
              source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}/</loc></url></urlset>`,
            });
            this.emitFile({
              type: "asset",
              fileName: "robots.txt",
              source: `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`,
            });
          }
        },
        transformIndexHtml(html) {
          return site
            ? html.replace(
                "</head>",
                `<link rel="canonical" href="${site}/"/><meta property="og:url" content="${site}/"/></head>`,
              )
            : html;
        },
      },
    ],
  };
});
