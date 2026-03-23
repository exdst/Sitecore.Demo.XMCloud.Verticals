import { defineCliConfig } from "@exdst-sitecore-content-sdk/astro/config-cli";
import config from "./sitecore.config";
import {
  generateMetadata,
  generateSites,
} from "@exdst-sitecore-content-sdk/astro/tools";

export default defineCliConfig({
  config: config,
  build: {
    commands: [
      generateMetadata(),
      generateSites(),
      /*extractFiles(),*/
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
