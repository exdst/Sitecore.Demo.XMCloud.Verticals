import { SitecoreClient } from '@astro-sitecore-jss/astro-content-sdk/client';
import scConfig from 'sitecore.config';

const client = new SitecoreClient({
  ...scConfig,
});

export default client;
