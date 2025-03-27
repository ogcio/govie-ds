import { ButtonProps } from '../button/types';
import { LinkProps } from '../link/types';

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
