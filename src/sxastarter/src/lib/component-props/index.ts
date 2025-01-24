import {
  ComponentParams,
  ComponentRendering
} from '@sitecore-jss/sitecore-jss/layout';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};