import * as zod from 'zod';
import { getEnumValues } from '../helpers';

export const ButtonVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
  Flat: 'flat',
} as const;

export const ButtonAppearance = {
  Default: 'default',
  Dark: 'dark',
  Light: 'light',
} as const;

export const ButtonSize = {
  Medium: 'medium',
  Small: 'small',
  Large: 'large',
} as const;

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
});

export type ButtonProps = zod.infer<typeof buttonSchema>;
