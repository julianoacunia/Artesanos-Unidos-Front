/// <reference types="react-scripts" />
declare interface APIResponse<T> {
  data: T;
  ok: boolean;
  error?: string;
}
declare interface Window {
  gtag: any;
}

declare module 'classnames'