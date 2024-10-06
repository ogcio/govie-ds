import { IconPropTypes } from '../icon/icon.js';

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

export type ButtonProps = {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  label?: string;
  disabled?: boolean;
  iconEnd?: boolean;
  icon?: React.ReactElement<IconPropTypes>;
};
