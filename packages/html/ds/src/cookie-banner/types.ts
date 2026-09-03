import type { ButtonProps } from '../button/types';
import type { LinkProps } from '../link/types';

export type CookieBannerProps = {
  content: string;
  accept: {
    content: string;
    triggerButton: ButtonProps;
  };
  reject: {
    content: string;
    triggerButton: ButtonProps;
  };
  dismissButton?: ButtonProps;
  cookieLink?: LinkProps;
};
