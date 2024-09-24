import * as zod from 'zod';

export const textInputSchema = zod.object({
  hasError: zod
    .boolean({
      description:
        'Indicates whether the input should be displayed in an error state. When `true`, the border color will be red.',
    })
    .optional(),
  prefix: zod
    .string({
      description:
        'Element or text to display on the left side of the input, such as a unit or symbol.',
    })
    .optional(),
  suffix: zod
    .string({
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
    })
    .optional(),
  halfFluid: zod
    .boolean({
      description:
        'When `true`, the input width is set to 50% of the available space.',
    })
    .optional(),
  fullFluid: zod
    .boolean({
      description:
        'When `true`, the input width is set to 100% of the available space.',
    })
    .optional(),
  characterWidth: zod
    .number({
      description:
        'Sets the width of the input in terms of the number of characters it can contain.',
    })
    .optional(),
  id: zod
    .string({
      description: 'Sets the unique ID for the input field.',
    })
    .optional(),
});

export type TextInputProps = zod.infer<typeof textInputSchema>;
