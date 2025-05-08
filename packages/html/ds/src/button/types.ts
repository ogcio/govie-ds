export const ButtonVariants = ['primary', 'secondary', 'flat'] as const;
export const ButtonSizes = ['medium', 'small', 'large'];
export const ButtonAppearances = ['default', 'dark', 'light'];

export type ButtonAppearance = (typeof ButtonAppearances)[number];
export type ButtonVariant = (typeof ButtonVariants)[number];
export type ButtonSize = (typeof ButtonSizes)[number];

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
