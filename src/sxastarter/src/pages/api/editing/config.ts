import type { APIRoute, APIContext } from "astro";
import { EditingConfigMiddleware } from "@astro-sitecore-jss/astro-content-sdk/editing";
import components from ".sitecore/component-map";
import metadata from ".sitecore/metadata.json";

/**
 * This API route is used by Sitecore Editor in XM Cloud
 * to determine feature compatibility and configuration.
 */
export const ALL: APIRoute = async ({ request }: APIContext) => {
  const handler = new EditingConfigMiddleware({
    components,
    metadata,
  }).getHandler();

  return await handler(request);
};
