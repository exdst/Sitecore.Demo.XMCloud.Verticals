import { SitecoreContextMap } from "@astro-sitecore-jss/astro-sitecore-jss";
import CdpHelperPkg from "@sitecore-jss/sitecore-jss/personalize";
import Layout from "@sitecore-jss/sitecore-jss/layout";
import config from "../../temp/config";

const { LayoutServicePageState } = Layout;
const { CdpHelper } = CdpHelperPkg;

export interface ICdpService {
  isNormalMode(): boolean;
  getPageViewData(channel: string, currency: string): object;
}

export class CdpService implements ICdpService {

  isNormalMode(): boolean {

    const sitecoreContext = SitecoreContextMap.get()["scContext"];
    const pageState = sitecoreContext.pageState;
    const itemId = sitecoreContext.route.itemId;
    /**
      * Determines if the page view events should be turned off.
      * IMPORTANT: You should implement based on your cookie consent management solution of choice.
      * By default it is disabled in development mode
      * Do not create events in editing or preview mode or if missing route data
      **/
    return import.meta.env.MODE !== "development" &&
      pageState === LayoutServicePageState.Normal &&
      !!itemId;
  }

  getPageViewData(channel: string, currency: string): object{

    const sitecoreContext = SitecoreContextMap.get()["scContext"];
    const itemId = sitecoreContext.route.itemId;
    const page = sitecoreContext.route?.name;
    const language = sitecoreContext.language || config.defaultLanguage;
    const variantId = sitecoreContext.variantId || "default";
    const scope = process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE;

    const pageVariantId = CdpHelper.getPageVariantId(
      itemId,
      language,
      variantId as string,
      scope,
    );

    const pageViewData = {
      channel,
      currency,
      page,
      pageVariantId,
      language,
    };

    return pageViewData
  }
}