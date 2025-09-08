import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

const adapter = process.env.VERCEL
  ? vercel({
      isr: {
        // 5 minutes
        expiration: 60 * 5,
      },
      //Images from Sitecore are already optimized. Enable this if you want to use the Astro image service with Sitecore images from Sitecore Experience Edge.
      //imageService: true,
    })
  : node({
      mode: "standalone",
    });

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  security: {
    checkOrigin: false,
  },
  server: {
    port: 3000,
    host: true,
  },
  output: "server",
  adapter: vercel(),
  i18n: {
    locales: ["en", "fr-CA", "ja-JP", "es-ES", "uk-UA", "de-DE", "it-IT", "nl-NL", "pt-PT", "ru-RU", "zh-CN", "zh-TW"],
    defaultLocale: "en",
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: [
      "financial.sxastarter.localhost.astro",
      "services.sxastarter.localhost.astro",
      "renderingastro",
      "sitecore-demo-xm-cloud-verticals-services.vercel.app",
      "sitecore-demo-xm-cloud-verticals-financial.vercel.app",
      //Images from Sitecore are already optimized. Enable this if you want to use the Astro image service with Sitecore images from Sitecore Experience Edge.
      //"edge.sitecorecloud.io",
    ],
  },
});
