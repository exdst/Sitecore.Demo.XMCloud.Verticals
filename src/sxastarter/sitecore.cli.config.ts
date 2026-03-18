import { defineCliConfig } from "@exdst-sitecore-content-sdk/astro/config-cli";
import config from "./sitecore.config";
import {
  generateMetadata,
  generateSites,
} from "@exdst-sitecore-content-sdk/astro/tools";

export default defineCliConfig({
  build: {
    commands: [
      generateMetadata(),
      generateSites({
        scConfig: config,
      }),
      /*extractFiles({
        scConfig: config,
      }),*/
    ],
  },
  componentMap: {
    paths: ["src/components"],
    // Exclude content-sdk auxillary components
    exclude: [
      "src/components/content-sdk/*",
      "src/components/Variants/**/*",
      "src/components/NestedComponents/**/*",
    ],
  },
});
