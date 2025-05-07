export const ButtonVariants = ['primary', 'secondary', 'flat'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export type ButtonAppearance = 'default' | 'dark' | 'light';

export type ButtonSize = 'medium' | 'small' | 'large';

export type ButtonProps = {
  content?: string;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  form?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
};
