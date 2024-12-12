import * as zod from 'zod';

export const progressBarSchema = zod.object({
  value: zod
    .number({
      description: 'The current value of the progress bar.',
    })
    .optional(),
  max: zod
    .number({
      description: 'The maximum value of the progress bar.',
    })
    .optional(),
  size: zod
    .enum(['sm', 'md', 'lg'], {
      description: 'Specifies the size of the progress bar.',
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
