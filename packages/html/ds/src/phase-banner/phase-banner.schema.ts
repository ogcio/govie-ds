import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const LevelEnum = {
  ALPHA: 'alpha',
  BETA: 'beta',
} as const;

export const phaseBannerSchema = zod.object({
  content: zod.string({
    description: 'Content for PhaseBanner.',
    required_error: 'Content is required',
  }),
  level: zod
    .enum(getEnumValues(LevelEnum), {
      description: 'Specifies the level.',
    })
    .optional(),
});

export type PhaseBannerProps = zod.infer<typeof phaseBannerSchema>;
