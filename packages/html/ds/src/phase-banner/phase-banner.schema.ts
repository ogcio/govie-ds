import * as zod from 'zod';

export enum LevelEnum {
  Alpha = 'alpha',
  Beta = 'beta',
}

export const phaseBannerSchema = zod.object({
  content: zod.string({
    description: 'Content for PhaseBanner.',
    required_error: 'Content is required',
  }),
  level: zod
    .nativeEnum(LevelEnum, {
      description: 'Specifies the level.',
    })
    .optional(),
});

export type PhaseBannerProps = zod.infer<typeof phaseBannerSchema>;
