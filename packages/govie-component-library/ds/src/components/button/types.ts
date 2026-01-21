export const ButtonVariants = ['primary', 'secondary', 'flat'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export type ButtonAppearance = 'default' | 'dark' | 'light';

export type ButtonSize = 'medium' | 'small' | 'large' | 'extraLarge';
