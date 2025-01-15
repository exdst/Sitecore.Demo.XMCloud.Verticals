import { sequence } from "astro/middleware";

import { multisite } from "./multisite";

export const onRequest = sequence(multisite);