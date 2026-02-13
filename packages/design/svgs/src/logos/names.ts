export const LOGOS_NAMES = [
  'figma',
  'logo-black',
  'logo-gold-green',
  'logo-gold-white',
  'logo-harp-black',
  'logo-harp-white',
  'logo-harp',
  'logo-std-reverse',
  'logo-white',
  'storybook',
] as const;

export type LogoName = (typeof LOGOS_NAMES)[number];
