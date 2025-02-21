import * as zod from 'zod';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Flat = 'flat',
}

export enum ButtonAppearance {
  Default = 'default',
  Dark = 'dark',
  Light = 'light',
}

export enum ButtonSize {
  Medium = 'medium',
  Small = 'small',
  Large = 'large',
}

export enum ButtonType {
  Submit = 'submit',
  Reset = 'reset',
  Button = 'button',
}

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
    .nativeEnum(ButtonVariant, {
      description: 'Button variants',
    })
    .optional(),
  appearance: zod
    .nativeEnum(ButtonAppearance, {
      description: 'Choose the appearance of the button',
    })
    .optional(),
  size: zod
    .nativeEnum(ButtonSize, {
      description: 'Button sizes',
    })
    .optional(),
  disabled: zod
    .boolean({ description: 'Specify if the button should be disabled' })
    .optional(),
  type: zod
    .nativeEnum(ButtonType, {
      description: 'Select the action type of the button',
    })
    .optional(),
  form: zod
    .string({ description: 'The ID of the form that button is bond to ' })
    .optional(),
  value: zod
    .string({
      description: 'The value for the button sent in the request',
    })
    .optional(),
  dataTestid: zod.string({ description: 'Data test id for button' }).optional(),
  aria: ariaSchema.describe('Defines the aria attributes').optional(),
});

export type ButtonProps = zod.infer<typeof buttonSchema>;
