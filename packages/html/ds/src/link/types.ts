import { ButtonVariant, ButtonAppearance, ButtonSize } from '../button/types';

export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  asChild?: boolean;
};

export type LinkProps = AnchorProps & {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  as?: 'a' | 'button';
  noVisited?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  external?: boolean;
  size?: 'sm' | 'md';
  dataTestid?: string;
  asButton?: {
    variant?: ButtonVariant;
    appearance?: ButtonAppearance;
    size?: ButtonSize;
  };
};
