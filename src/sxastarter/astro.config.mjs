import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "vite";

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

// Load enviroment variables from .env.* files
dotenvFlow.config();

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    {
      name: "set-prerender",
      hooks: {
        "astro:route:setup": ({ route }) => {
          // Load environment variables from .env files
          const { PRERENDER } = loadEnv(
            process.env.NODE_ENV,
            process.cwd(),
            ""
          );
          if (route.component.endsWith("/[...path].astro")) {
            // Set the prerender value on routes (convert to boolean)
            route.prerender = PRERENDER === "true" ? true : false;
          }
        },
      },
    },
  ],
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
    enabled: false,
  },
  image: {
    domains: [
      "financial.sxastarter.localhost.astro",
      "services.sxastarter.localhost.astro",
      "cm",
      "renderingastro",
      //Images from Sitecore are already optimized. Enable this if you want to use the Astro image service with Sitecore images from Sitecore Experience Edge.
      //"edge.sitecorecloud.io",
    ],
  },
  vite: {
    server: {
      cors: {
        preflightContinue: true,
      },
    },
    ssr: {
      noExternal: [
        "@sitecore-content-sdk/core",
        "@sitecore-cloudsdk/events",
        "@sitecore-cloudsdk/core",
        "@sitecore-cloudsdk/utils",
        "@exdst-sitecore-content-sdk/astro",
      ],
    },
    resolve: {
      extensions: [".mjs", ".js", ".mts", ".ts"],
    },
  },
});
