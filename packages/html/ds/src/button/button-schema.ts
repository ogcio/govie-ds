import * as zod from 'zod';
import { iconSchema } from '../icon/icon.schema';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Flat = 'flat',
  Outlined = 'outlined',
}

export enum ButtonSize {
  Medium = 'medium',
  Small = 'small',
  Large = 'large',
}

export enum IconPosition {
  Left = 'left',
  Right = 'right',
}

export const buttonSchema = zod.object({
  variant: zod
    .nativeEnum(ButtonVariant, {
      description: 'Button variants',
    })
    .optional(),
  size: zod
    .nativeEnum(ButtonSize, {
      description: 'Button sizes',
    })
    .optional(),
  label: zod
    .string({
      description: 'The text of the button',
    })
    .optional(),
  disabled: zod
    .boolean({ description: 'Specify if the button should be disabled' })
    .optional(),
  icon: zod
    .object({
      props: iconSchema.describe('Icon for the button'),
      position: zod
        .nativeEnum(IconPosition, {
          description: 'The position of the icon',
        })
        .optional(),
    })
    .optional(),
});

export type ButtonProps = zod.infer<typeof buttonSchema>;
