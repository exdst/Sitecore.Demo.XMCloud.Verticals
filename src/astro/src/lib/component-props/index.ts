import { ComponentParams, ComponentRendering, LayoutServiceContext, RouteData } from '@sitecore-jss/sitecore-jss/layout';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

export type SitecoreContextValue = LayoutServiceContext & {
    itemId?: string;
    route?: RouteData;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};

export type ComponentPropsError = {
  error: string;
  componentName: string;
};

export type ComponentPropsCollection = {
  [componentUid: string]: unknown | ComponentPropsError;
};