import { defineMiddleware } from "astro/middleware";
import { defineMiddleware as middleware } from "@astro-sitecore-jss/astro-content-sdk/middleware";
import { MultisiteMiddleware } from "@astro-sitecore-jss/astro-content-sdk/middleware";
import sites from ".sitecore/sites.json";
import scConfig from "sitecore.config";

export const onRequest = defineMiddleware((context, next) => {
  // If no Edge server contextId, skip Edge middlewares entirely.
  //(SSR/API can still use Local creds; no crash in Edge runtime.)
  // if (!scConfig.api?.edge?.contextId) {
  //   return next();
  // }

  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /sitecore/api (Sitecore API routes)
   * 3. /- (Sitecore media)
   * 4. /healthz (Health check)
   * 5. all root files inside /public
   * 6. Astro files
   */
  const matcher = new RegExp(
    "(api/|_next/|healthz|sitecore/api/|-/|_astro|_image|favicon.ico|sc_logo.svg)"
  );

  const requestUrl = new URL(context.request.url.toLowerCase());
  if (matcher.test(requestUrl.pathname)) {
    return next();
  }

  const multisite = new MultisiteMiddleware({
    /**
     * List of sites for site resolver to work with
     */
    sites,
    ...scConfig.api.edge,
    ...scConfig.multisite,
    // This function determines if the middleware should be turned off on per-request basis.
    // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to disable more.
    // This is an important performance consideration since Next.js Edge middleware runs on every request.
    skip: () => false,
  });

  return middleware(multisite).exec(context, next);
});
