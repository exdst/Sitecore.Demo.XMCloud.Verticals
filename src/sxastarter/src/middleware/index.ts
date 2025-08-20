import { sequence } from "astro/middleware";

import { populateEnv } from "./populate-env";
import { multisite } from "./multisite";

export const onRequest = sequence(populateEnv, multisite);