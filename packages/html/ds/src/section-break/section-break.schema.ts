import * as zod from 'zod';

export enum SizeEnum {
  ExtraLarge = 'xl',
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export const sectionBreakSchema = zod.object({
  size: zod
    .nativeEnum(SizeEnum, {
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
