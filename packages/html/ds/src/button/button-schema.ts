import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FLAT: 'flat',
} as const;

export const ButtonAppearance = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export const ButtonSize = {
  MEDIUM: 'medium',
  SMALL: 'small',
  LARGE: 'large',
} as const;

export const ButtonType = {
  SUBMIT: 'submit',
  RESET: 'reset',
  BUTTON: 'button',
} as const;

const validAriaProps = [
  'aria-disabled',
  'aria-label',
  'aria-hidden',
  'aria-expanded',
  'aria-checked',
  'aria-required',
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

export const buttonSchema = zod.object({
  content: zod.string({
    description: 'The raw HTML that will be inserted',
  }),
  variant: zod
    .enum(getEnumValues(ButtonVariant), {
      description: 'Button variants',
    })
    .optional(),
  appearance: zod
    .enum(getEnumValues(ButtonAppearance), {
      description: 'Choose the appearance of the button',
    })
    .optional(),
  size: zod
    .enum(getEnumValues(ButtonSize), {
      description: 'Button sizes',
    })
    .optional(),
  disabled: zod
    .boolean({ description: 'Specify if the button should be disabled' })
    .optional(),
  type: zod
    .enum(getEnumValues(ButtonType), {
      description: 'Select the action type of the button',
    })
    .optional(),
  form: zod
    .string({ description: 'The ID of the form that button is bound to ' })
    .optional(),
  value: zod
    .string({
      description: 'The value for the button sent in the request',
    })
    .optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type ButtonProps = zod.infer<typeof buttonSchema>;
