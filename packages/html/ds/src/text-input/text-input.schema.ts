import * as zod from 'zod';

import { errorTextSchema } from '../error-text/error-text.schema';
import { getEnumValues } from '../helpers';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { labelSchema } from '../label/label.schema';

export const InputTypeEnum = {
  TEXT: 'text',
  DATE: 'date',
  DATETIME_LOCAL: 'datetime-local',
  EMAIL: 'email',
  MONTH: 'month',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel',
  TIME: 'time',
  URL: 'url',
  WEEK: 'week',
} as const;

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
  id: zod
    .string({
      description: 'Sets the unique ID for the input field.',
    })
    .optional(),
  type: zod
    .enum(getEnumValues(InputTypeEnum), {
      description: 'Specifies the input type.',
    })
    .optional(),
  value: zod.string().optional().describe('The input value'),
  defaultValue: zod.string().optional().describe('The default input value'),
  placeholder: zod
    .string({ description: 'The placeholder for the input element' })
    .optional(),
  disabled: zod.boolean({ description: 'Disabled state' }).optional(),
  readOnly: zod.boolean({ description: 'Readonly state' }).optional(),
  required: zod
    .boolean({ description: 'Marks the input as required' })
    .optional(),
  autoFocus: zod
    .boolean({ description: 'Autofocuses the input field' })
    .optional(),
  maxLength: zod.number().optional().describe('Max character length'),
  minLength: zod.number().optional().describe('Min character length'),
  min: zod
    .union([zod.string(), zod.number()])
    .optional()
    .describe('Minimum value for number inputs'),
  max: zod
    .union([zod.string(), zod.number()])
    .optional()
    .describe('Maximum value for number inputs'),
  step: zod
    .union([zod.string(), zod.number()])
    .optional()
    .describe('Step size for number inputs'),
  pattern: zod
    .string()
    .optional()
    .describe('Regex pattern for input validation'),
  autoComplete: zod
    .string()
    .optional()
    .describe('Autocomplete attribute for input'),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
  className: zod.string({ description: 'Add additional classes' }).optional(),
  label: labelSchema.describe('Label for text-input').optional(),
  hint: hintTextSchema.describe('Hint for text-input').optional(),
  error: errorTextSchema
    .describe('Set error boundaries for text-input')
    .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type TextInputProps = zod.infer<typeof textInputSchema>;
