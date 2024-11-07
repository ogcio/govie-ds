export type ButtonVariant = 'primary' | 'secondary' | 'flat';

export type ButtonAppearance = 'default' | 'dark' | 'light';

export type ButtonSize = 'medium' | 'small' | 'large';

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  form?: string;
  value?: string;
  className?: string;
};
