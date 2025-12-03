export type RenderingEngine = 'chromium' | 'gecko' | 'webkit' | 'unknown';

export type BrowserInfo = {
  brand: string;
  version: number;
  engine: RenderingEngine;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isAndroidWebView: boolean;
  isSamsungInternet: boolean;
};

export type SupportPolicy = {
  desktop: { chromium: number; gecko: number; webkit: number };
  mobile: { chromium: number; gecko: number; webkit: number };
};

export type BrowserSupportProps = {
  onDismiss?: () => void;
  forceShow?: boolean;
  className?: string;
};
