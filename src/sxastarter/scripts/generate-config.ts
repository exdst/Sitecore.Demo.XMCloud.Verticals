import { JssConfig, jssConfigGenerator } from "./config/config-generator";
import fs from "fs";
import path from "path";
import * as changeCase from "change-case";

const CONFIG_PATH = path.resolve("src/temp/config.js");
const VERCEL_CONFIG_PATH = path.resolve("src/temp/config.vercel.js");

const defaultConfig: JssConfig = {
  sitecoreSiteName: process.env.SITECORE_SITE_NAME || process.env.JSS_APP_NAME,
  sitecoreApiKey: process.env.SITECORE_API_KEY,
  sitecoreApiHost: process.env.SITECORE_API_HOST,
  graphQLEndpointPath: process.env.GRAPH_QL_ENDPOINT_PATH,
  graphQLEndpoint: process.env.GRAPH_QL_ENDPOINT,
  rootItemId: process.env.rootItemId,
  defaultLanguage: process.env.DEFAULT_LANGUAGE,
  fetchWith: process.env.FETCH_WITH,
  publicUrl: process.env.PUBLIC_URL,
};

generateConfig(defaultConfig);

function generateConfig(defaultConfig: JssConfig): void {
  console.log("Start config generation.");

  jssConfigGenerator
    .generateConfig(defaultConfig)
    .then(config => {
      writeConfig(config);
      if (process.env.VERCEL) {
        writeConfigVercel(config);
      }
    })
    .catch(e => {
      console.error("Config generation error");
      console.error(e);

      process.exit(1);
    })
    .finally(() => console.log("Config generation finished."));
};

function writeConfig(config: JssConfig): void {
  console.log(`Write configuration to '${CONFIG_PATH}'.`);

  let configText = `const config = {};\n`;

  Object.keys(config).forEach(key => {
    configText += `config.${key} = import.meta.env.${changeCase.constantCase(key)} || '${config[key]}';\n`
  });

  configText += "export default config;";
  fs.writeFileSync(CONFIG_PATH, configText, { encoding: "utf-8" });
}

function writeConfigVercel(config: JssConfig): void {
  let configText = `const config = {};\n`;
  let sites = config.sites ? JSON.parse(config.sites) : [];
  configText += `config.sites = ${JSON.stringify(sites)};\n`;
  configText += "export default config;";
  console.log(`Write configuration to '${VERCEL_CONFIG_PATH}'.`);
  console.log(configText);
  fs.writeFileSync(VERCEL_CONFIG_PATH, configText, { encoding: "utf-8" });
}

