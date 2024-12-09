import * as zod from 'zod';

export const progressStepperSchema = zod.object({
  steps: zod.array(zod.string(), {
    description: 'Array of step labels.',
  }),
  currentStepIndex: zod
    .number({
      description: 'Index of the current step (zero-based).',
    })
    .optional(),
  orientation: zod
    .enum(['horizontal', 'vertical'], {
      description: 'Orientation of the progress stepper.',
    })
    .optional(),
  completeAll: zod
    .boolean({
      description: 'Complete all steps.',
    })
    .optional(),
});

export type ProgressStepperProps = zod.infer<typeof progressStepperSchema>;
