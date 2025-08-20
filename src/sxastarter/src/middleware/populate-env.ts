/**
 * @type {import("astro").MiddlewareHandler}
 */
import { defineMiddleware } from "astro/middleware";
import dotenv from "dotenv";

// This middleware is used to populate process.env variables to use in CJS dependencies.
export const populateEnv = defineMiddleware((context, next) => {
  dotenv.config();
  return next();
});
