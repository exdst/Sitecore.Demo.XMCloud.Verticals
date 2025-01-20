import { constantCase } from 'constant-case';
import type { IConfigPlugin, JssConfig } from "../config-generator";

/**
 * This plugin will set config props used by the Sitecore Edge Platform.
 */
class EdgePlatformPlugin implements IConfigPlugin {
  order = 30;

  async execute(config: JssConfig): Promise<JssConfig> {
    const sitecoreEdgeUrl =
      process.env[`${constantCase('sitecoreEdgeUrl')}`]?.replace(/\/$/, '') ||
      'https://edge-platform.sitecorecloud.io';

    const sitecoreEdgeContextId = process.env[`${constantCase('sitecoreEdgeContextId')}`];

    if (config.sitecoreApiKey && sitecoreEdgeContextId) {
      console.log(
        "You have configured both 'sitecoreApiKey' and 'sitecoreEdgeContextId' values. The 'sitecoreEdgeContextId' is used instead."
      );
    }

    return Object.assign({}, config, {
      sitecoreEdgeUrl,
      sitecoreEdgeContextId,
    });
  }
}

export const edgePlatformPlugin = new EdgePlatformPlugin();
