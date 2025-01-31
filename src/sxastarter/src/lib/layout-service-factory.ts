import jss from '@sitecore-jss/sitecore-jss/layout';
import type { LayoutService } from '@sitecore-jss/sitecore-jss/layout';
import config from '../temp/config';
import clientFactory from './graphql/graphql-create-client-factory';
import { constants } from '@sitecore-jss/sitecore-jss';
const { RestLayoutService, GraphQLLayoutService } = jss;

export class LayoutServiceFactory {

  create(sitename?: string): LayoutService {
    return import.meta.env.FETCH_WITH === constants.FETCH_WITH.REST
      ? new RestLayoutService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: sitename || config.sitecoreSiteName,
        configurationName: 'sxa-jss',
      })
      : new GraphQLLayoutService({
        clientFactory,
        siteName: sitename || config.sitecoreSiteName,
      });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();