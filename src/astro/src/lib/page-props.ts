import { HTMLLink } from "@sitecore-jss/sitecore-jss";
import { LayoutServiceData } from "@sitecore-jss/sitecore-jss/layout";
import { ComponentPropsCollection } from "./component-props";
import { DictionaryPhrases } from "@sitecore-jss/sitecore-jss/i18n";

export declare type SiteInfo = {
  /**
   * Additional user-defined properties
   */
  [key: string]: unknown;
  /**
   * Site name
   */
  name: string;
  /**
   * Site host name. May include multiple values (separated by '|') and wildcards ('*')
   */
  hostName: string;
  /**
   * Site default language
   */
  language: string;
};

export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
};  