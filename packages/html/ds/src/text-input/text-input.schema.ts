import * as zod from 'zod';
import { errorTextSchema } from '../error-text/error-text.schema';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { labelSchema } from '../label/label.schema';

export enum InputTypeEnum {
  Text = 'text',
  Date = 'date',
  Datetime = 'datetime-local',
  Email = 'email',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Tel = 'tel',
  Time = 'time',
  Url = 'url',
  Week = 'week',
}

const validAriaProps = [
  'aria-required',
  'aria-invalid',
  'aria-describedby',
  'aria-labelledby',
  'aria-autocomplete',
  'aria-placeholder',
] as const;

export const ariaSchema = zod.record(
  zod.enum(validAriaProps, {
    description: 'Valid ARIA attributes key',
  }),
  zod.string({
    description: 'ARIA attributes value',
  }),
  { description: 'An object of ARIA attributes' },
);

export const textInputSchema = zod.object({
  name: zod
    .string({
      description: 'Sets the unique ID for the input field.',
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
  type: zod
    .nativeEnum(InputTypeEnum, {
      description: 'Specifies the input type.',
    })
    .optional(),
  label: labelSchema.describe('Label for text-input').optional(),
  hint: hintTextSchema.describe('Hint for text-input').optional(),
  error: errorTextSchema
    .describe('Set error boundaries for text-input')
    .optional(),
  className: zod.string({ description: 'Add aditional classes' }).optional(),
  placeholder: zod
    .string({ description: 'The placeholder for the input element' })
    .optional(),
  disabled: zod.boolean({ description: 'Disabled state' }).optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type TextInputProps = zod.infer<typeof textInputSchema>;
