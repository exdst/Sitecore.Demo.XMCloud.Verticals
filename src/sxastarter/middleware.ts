import { rewrite } from '@vercel/edge';
import config from './src/temp/config.vercel.js';
import { languages } from './src/lib/languages.js';

export default function middleware(request: Request) {
  const url = new URL(request.url.toLowerCase());

  if (request.url.indexOf("/-/") !== -1
    || request.url.indexOf("/api/editing/") !== -1
    || request.url.indexOf("site_") !== -1
    || request.url.indexOf(".js") !== -1
    || request.url.indexOf(".css") !== -1
    || request.url.indexOf(".ico") !== -1
    || request.url.indexOf(".webp") !== -1
    || request.url.indexOf(".png") !== -1
    || request.url.indexOf(".jpg") !== -1
    || request.url.indexOf("sc_site") !== -1) {
    return;
  }

  const sites = [...config.sites, {
    "name": "Basic",
    "language": "en",
    "hostName": "localhost",
  }];

  for (const site of sites) {

    // https://github.com/Sitecore/Sitecore.Demo.XMCloud.Verticals/issues/251
    // Temporary fix for the issue above
    const hostname = site.hostName.replace("-basic", "-website");

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

      return rewrite(`${url.protocol}//${url.host}${path}${url.search}`.toLowerCase());
    }
  }
}