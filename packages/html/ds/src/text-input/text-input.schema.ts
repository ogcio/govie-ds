import * as zod from 'zod';

import { errorTextSchema } from '../error-text/error-text.schema';
import { getEnumValues } from '../helpers';
import { hintTextSchema } from '../hint-text/hint-text.schema';
import { labelSchema } from '../label/label.schema';

export const InputTypeEnum = {
  Text: 'text',
  Date: 'date',
  DatetimeLocal: 'datetime-local',
  Email: 'email',
  Month: 'month',
  Number: 'number',
  Password: 'password',
  Tel: 'tel',
  Time: 'time',
  Url: 'url',
  Week: 'week',
} as const;

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
  className: zod.string({ description: 'Add additional classes' }).optional(),
  label: labelSchema.describe('Label for text-input').optional(),
  hint: hintTextSchema.describe('Hint for text-input').optional(),
  error: errorTextSchema
    .describe('Set error boundaries for text-input')
    .optional(),
  halfFluid: zod.boolean({ description: 'Half container width' }).optional(),
});

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: any;
  hint?: any;
  error?: any;
  prefix?: string;
  suffix?: string;
  type?:
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
  halfFluid?: boolean;
  dataTestId?: string;
};
