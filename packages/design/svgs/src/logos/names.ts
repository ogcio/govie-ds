export const LOGOS_NAMES = [
  'figma',
  'general-harp-black',
  'general-harp-white',
  'general-harp',
  'government-of-ireland-gov-black',
  'government-of-ireland-gov-green',
  'government-of-ireland-gov-std-reverse',
  'government-of-ireland-gov-std',
  'government-of-ireland-gov-white',
  'storybook',
] as const;

export type LogoName = (typeof LOGOS_NAMES)[number];
