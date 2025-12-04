export type RenderingEngine = 'chromium' | 'gecko' | 'webkit' | 'unknown';

export type BrowserInfo = {
  version: number;
  engine: RenderingEngine;
};

export type SupportPolicy = { chromium: number; gecko: number; webkit: number };

export type BrowserSupportProps = {
  onDismiss?: () => void;
  forceShow?: boolean;
  className?: string;
};
