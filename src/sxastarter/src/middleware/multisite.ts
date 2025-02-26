/**
 * @type {import("astro").MiddlewareHandler}
 */
import { languages } from "@/lib/languages";
import config from "@/temp/config";
import { defineMiddleware } from "astro/middleware";

// This middleware is used to rewrite the URL based on the site configuration
// We read sites configuration from Sitecore Edge and write it to the config file
// Once we get request to the site, we compare URL with the site configuration and rewrite the URL
// We add sc_site to set Sitecore site
// We add sc_lang to set Sitecore language

export const multisite = defineMiddleware((context, next) => {

  const request = context.request;
  const url = new URL(request.url.toLowerCase());

  if (request.url.indexOf("/-/") !== -1
    //|| request.url.indexOf("/_image") !== -1
    || request.url.indexOf("/api/editing/") !== -1
    || request.url.indexOf("site_") !== -1
    || request.url.indexOf(".js") !== -1
    || request.url.indexOf(".css") !== -1
    || request.url.indexOf(".ico") !== -1
    || request.url.indexOf(".webp") !== -1
    || request.url.indexOf(".png") !== -1
    || request.url.indexOf(".jpg") !== -1
    || request.url.indexOf("sc_site") !== -1) {
    return next();
  }

  const sites = [...JSON.parse(config.sites), {
    "name": import.meta.env.SITECORE_SITE_NAME ?? "Basic",
    "language": "en",
    "hostName": "localhost",
  }];

  for (const site of sites) {
    // https://github.com/Sitecore/Sitecore.Demo.XMCloud.Verticals/issues/251
    // Temporary fix for the issue above
    const hostname = site.hostName.replace("-basic", "-website");

    //We use startsWith to support Next.js and Astro running with the same Sitecore instance
    if (url.host.startsWith(hostname)) {
      let path = url.pathname;
      let hasLanguage = false;
      for (const language of languages) {
        if (url.pathname.startsWith("/" + language.toLocaleLowerCase())) {
          hasLanguage = true;
        }
      }

      if (!hasLanguage) {
        path = `/${site.language}${path}`;
      }

      url.searchParams.set("sc_site", site.name);
      url.searchParams.set("sc_lang", site.language);

      console.log(`Rewriting URL to ${url.protocol}//${url.host}${path}${url.search}`.toLowerCase());
      return context.rewrite(`${url.protocol}//${url.host}${path}${url.search}`.toLowerCase());
    }
  }

  return next();
});