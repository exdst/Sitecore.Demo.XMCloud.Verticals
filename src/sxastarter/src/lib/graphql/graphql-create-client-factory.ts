import jss from "@sitecore-jss/sitecore-jss/graphql";
import type { GraphQLRequestClientFactoryConfig } from "@sitecore-jss/sitecore-jss/graphql";
import config from "../../temp/config";
const { GraphQLRequestClient } = jss;

export const SITECORE_EDGE_URL_DEFAULT = 'https://edge-platform.sitecorecloud.io';
/**
 * Generates a URL for accessing Sitecore Edge Platform Content using the provided endpoint and context ID.
 * @param {string} sitecoreEdgeContextId - The unique context id.
 * @param {string} [sitecoreEdgeUrl] - The base endpoint URL for the Edge Platform. Default is https://edge-platform.sitecorecloud.io
 * @returns {string} The complete URL for accessing content through the Edge Platform.
 */
export const getEdgeProxyContentUrl = (
  sitecoreEdgeContextId: string,
  sitecoreEdgeUrl = SITECORE_EDGE_URL_DEFAULT
) => `${sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${sitecoreEdgeContextId}`;



export const createGraphQLClientFactory = () => {
  let clientConfig: GraphQLRequestClientFactoryConfig;
  if (config.sitecoreEdgeContextId) {
    clientConfig = {
      endpoint: getEdgeProxyContentUrl(config.sitecoreEdgeContextId, config.sitecoreEdgeUrl),
    };
  }
  else if (config.graphQLEndpoint && config.sitecoreApiKey) {
    {
      clientConfig = {
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
      };
    }
  } else {
    throw new Error('Please configure your graphQLEndpoint and sitecoreApiKey.');
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

export default createGraphQLClientFactory();