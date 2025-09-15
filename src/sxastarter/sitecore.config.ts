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
    local: {
      apiHost: import.meta.env?.SITECORE_API_HOST || process.env?.SITECORE_API_HOST,
      apiKey: import.meta.env?.SITECORE_API_KEY || process.env?.SITECORE_API_KEY,
    }
  }
});
