export const Size = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export const Whitespace = {
  NORMAL: 'normal',
  PRE: 'pre',
  PRE_WRAP: 'pre-wrap',
  BREAK_SPACES: 'break-spaces',
} as const;

export const Align = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  JUSTIFY: 'justify',
} as const;

export const getSize = (x: (typeof Size)[keyof typeof Size] = Size.MD) =>
  Object.values(Size).includes(x) ? x : Size.MD;

export const getWhitespace = (x: (typeof Whitespace)[keyof typeof Whitespace] = Whitespace.NORMAL) =>
  Object.values(Whitespace).includes(x) ? x : Whitespace.NORMAL;

export const getAlign = (x: (typeof Align)[keyof typeof Align] = Align.START) =>
  Object.values(Align).includes(x) ? x : Align.START;
