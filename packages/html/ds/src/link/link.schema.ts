import * as zod from 'zod';
import { buttonSchema } from '../button/button-schema';

export enum LinkSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

const linkTypeSchema = zod.union([zod.literal('a'), zod.literal('button')]);

export const linkSchema = zod.object({
  as: linkTypeSchema
    .optional()
    .describe('Specify if the component should be a button or a link'),
  asButton: buttonSchema
    .omit({ content: true })
    .optional()
    .describe('Specify if the link should look like a button'),
  href: zod.string({
    description: 'Hypertext reference',
  }).optional(),
  label: zod.string({
    description: 'Label of link',
    required_error: 'label is required',
  }),
  ariaLabel: zod
    .string({
      description: 'ARIA Label of link, default is label',
    })
    .optional(),
  ariaCurrent: zod
    .string({
      description: 'ARIA current attribute',
    })
    .optional(),
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
