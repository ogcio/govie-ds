import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const SizeEnum = {
  EXTRA_LARGE: 'xl',
  LARGE: 'lg',
  MEDIUM: 'md',
  SMALL: 'sm',
} as const;

export const sectionBreakSchema = zod.object({
  size: zod
    .enum(getEnumValues(SizeEnum), {
      description: 'Specifies the size of the Section Break.',
    })
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type SectionBreakProps = zod.infer<typeof sectionBreakSchema>;
