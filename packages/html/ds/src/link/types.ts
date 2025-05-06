import { ButtonAppearance, ButtonSize, ButtonVariant } from '../button/types';
import { IconIdType } from '../icon/icon.schema';

export type AnchorProps = {
  content?: string;
  className?: string;
  external?: boolean;
  asChild?: boolean;
};

export type LinkProps = {
  href?: string;
  content: string;
  asButton?: {
    variant?: ButtonVariant;
    appearance?: ButtonAppearance;
    size?: ButtonSize;
  };
  noVisited?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  external?: boolean;
  size?: ButtonSize;
  dataTestid?: string;
  iconStart?: IconIdType;
  iconEnd?: IconIdType;
  disabled?: boolean;
  appearance?: ButtonAppearance;
  className?: string;
};
