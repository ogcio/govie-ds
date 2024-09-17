import * as zod from 'zod';

export enum SizeEnum {
  ExtraLarge = 'xl',
  Large = 'l',
  Medium = 'm',
  Small = 's',
}

export const sectionBreakSchema = zod.object({
  size: zod
    .nativeEnum(SizeEnum, {
      description: 'Specifies the size of the Section Break.',
    })
    .optional(),
});

export type SectionBreakProps = zod.infer<typeof sectionBreakSchema>;
