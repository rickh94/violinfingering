import { defineConfig } from "astro/config";
// import cloudflare from "@astrojs/cloudflare";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  site: "https://violinfingering.com",
  build: {
    inlineStylesheets: "never",
  },
  integrations: [
    tailwind(),
    solidJs(),
    sitemap({
      filter: page => page !== "https://violinfingering.com/all-the-patterns/all-of-them/",
    }),
  ],
  output: "static",
  // adapter: cloudflare(),
});
