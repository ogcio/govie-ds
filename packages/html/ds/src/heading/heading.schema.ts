import * as zod from 'zod';

export enum SIZE {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

export enum TAG {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    H5 = 'H5',
    H6 = 'H6',
  }

export const headingSchema = zod.object({
  size: zod.nativeEnum(SIZE),
  tag: zod.nativeEnum(TAG),
  text: zod.string(),
  caption: zod.string().optional(),
});

export type HeadingProps = zod.infer<typeof headingSchema>;
