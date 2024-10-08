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

export enum IconPosition {
  Start = 'start',
  End = 'end',
}

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
  className: zod
    .string({
      description: 'Add additional classes',
    })
    .optional(),
});

export type ButtonProps = zod.infer<typeof buttonSchema>;
