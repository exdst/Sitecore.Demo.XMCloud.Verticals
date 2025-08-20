import { defineConfig } from "@astro-sitecore-jss/astro-content-sdk/config";
/**
 * See the documentation for `defineConfig`:
 * https://doc.sitecore.com/xmc/en/developers/content-sdk/the-sitecore-configuration-file.html
 */
export default defineConfig({
  api: {
    edge: {
      contextId: import.meta.env?.SITECORE_EDGE_CONTEXT_ID || "",
    },
  },
});
