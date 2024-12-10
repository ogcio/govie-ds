import * as zod from 'zod';

export const progressBarSchema = zod.object({
  currentValue: zod
    .number({
      description: 'The current value of the progress bar.',
    })
    .min(0, { message: 'Current value cannot be negative.' })
    .optional(),
  finalValue: zod
    .number({
      description: 'The final or maximum value of the progress bar.',
    })
    .min(1, { message: 'Final value must be at least 1.' })
    .optional(),
  size: zod
    .enum(['sm', 'md', 'lg'], {
      description: 'Specifies the size of the progress bar.',
    })
    .optional(),
  color: zod
    .enum(['blue', 'green'], {
      description: 'Specifies the color of the progress bar.',
    })
    .optional(),
  isIndeterminate: zod
    .boolean({
      description: 'Determines if the progress bar is in indeterminate mode.',
    })
    .optional(),
  label: zod
    .string({
      description: 'Optional label displayed near the progress bar.',
    })
    .optional(),
});

export type ProgressBarProps = zod.infer<typeof progressBarSchema>;
