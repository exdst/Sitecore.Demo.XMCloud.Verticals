export type ComponentPropsError = {
  error: string;
  componentName: string;
};

export type ComponentPropsCollection = {
  [componentUid: string]: unknown | ComponentPropsError;
};