import { defineCliConfig } from "@astro-sitecore-jss/astro-sitecore-jss/config-cli";
import config from './sitecore.config';
import { generateMetadata, generateSites } from "@sitecore-content-sdk/core/tools";

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
    paths: ['src/components'],
    // Exclude content-sdk auxillary components
    exclude: ['src/components/content-sdk/*'],
  },
});
