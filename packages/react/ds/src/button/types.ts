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
  children: React.ReactNode;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  label?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
