import * as zod from 'zod';

export enum LinkSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

export const linkSchema = zod.object({
  href: zod.string({
    description: 'Hypertext reference',
    required_error: 'href is required',
  }),
  label: zod.string({
    description: 'Label of link',
    required_error: 'label is required',
  }),
  noVisited: zod
    .boolean({
      description:
        'Where it is not helpful to distinguish between visited and unvisited states.',
    })
    .optional(),
  external: zod
    .boolean({
      description: 'To open the link in a new tab.',
    })
    .optional(),
  noUnderline: zod
    .boolean({
      description: 'To remove underlines from links.',
    })
    .optional(),
  noColor: zod
    .boolean({
      description: 'To inherit color from parent.',
    })
    .optional(),
  size: zod
    .nativeEnum(LinkSize, {
      description: 'Size of the link',
    })
    .optional(),
});

export type LinkProps = zod.infer<typeof linkSchema>;
