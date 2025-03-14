import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const SizeEnum = {
  ExtraLarge: 'xl',
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export const sectionBreakSchema = zod.object({
  size: zod
    .enum(getEnumValues(SizeEnum), {
      description: 'Specifies the size of the Section Break.',
    })
    .optional(),
  color: zod
    .string({
      description: 'Color for the component.',
    })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type SectionBreakProps = zod.infer<typeof sectionBreakSchema>;
