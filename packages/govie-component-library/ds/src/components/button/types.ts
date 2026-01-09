export const ButtonVariants = ['primary', 'secondary', 'flat'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export type ButtonAppearance = 'default' | 'dark' | 'light';

export type ButtonSize = 'medium' | 'small' | 'large' | 'extraLarge';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  form?: string;
  value?: string;
};
