export const Size = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
} as const;
export const Whitespace = {
  NORMAL: 'normal',
  PRE: 'pre',
  PRE_WRAP: 'pre-wrap',
  BREAK_SPACES: 'break-spaces'
} as const;
export const Align = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  JUSTIFY: 'justify'
} as const;
export const Variant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FLAT: 'flat'
} as const;
export const Appearance = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light'
} as const;
export function clamp<T extends Record<string, string>>(value: string | undefined, options: T, defaultValue: T[keyof T]): T[keyof T] {
  const allowed = Object.values(options) as T[keyof T][];
  return value !== undefined && allowed.includes(value as T[keyof T]) ? value as T[keyof T] : defaultValue;
}