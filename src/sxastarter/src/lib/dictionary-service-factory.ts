
import jssI18n from '@sitecore-jss/sitecore-jss/i18n';
import type { DictionaryService } from '@sitecore-jss/sitecore-jss/i18n';
import jss from '@sitecore-jss/sitecore-jss';
import config from '../temp/config';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-react';
import { createGraphQLClientFactory } from './graphql/graphql-create-client-factory';

const { RestDictionaryService, GraphQLDictionaryService} = jssI18n;
const { constants } = jss;

/**
 * Factory responsible for creating a DictionaryService instance
 */
export class DictionaryServiceFactory {  
  create(): DictionaryService {
    if(import.meta.env.FETCH_WITH === constants.FETCH_WITH.REST){
      return new RestDictionaryService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: config.sitecoreSiteName,
      });
    } else {
      const clientFactory = createGraphQLClientFactory();
      
      return new GraphQLDictionaryService({
        siteName: config.jssAppName || config.sitecoreSiteName,
        cacheEnabled: false,
        clientFactory
      });
      
    }
  }
}

/** DictionaryServiceFactory singleton */
export const dictionaryServiceFactory = new DictionaryServiceFactory();
