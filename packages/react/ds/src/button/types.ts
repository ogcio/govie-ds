export const ButtonVariants = ['primary', 'secondary', 'flat'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

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
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaPressed?: boolean;
};
