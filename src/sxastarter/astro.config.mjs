import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

const adapter = process.env.VERCEL ?
vercel({
  isr: {
    // 5 minutes
    expiration: 60 * 5,
  },
}) : node({
  mode: 'standalone',
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
  adapter: adapter,
  i18n: {
    locales: ["en", "fr-CA", "ja-JP"],
    defaultLocale: "en",
  },
  devToolbar: {
    enabled: false
  }
});
