export const FAVICONS_NAMES = [
  'favicon-dark',
  'favicon-light',
] as const;

export type FaviconName = (typeof FAVICONS_NAMES)[number];
