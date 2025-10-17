import { ButtonProps } from '../button/types';
import { IconProps } from '../icon/icon.schema';
import { LinkProps } from '../link/types';
import { TagProps } from '../tag/types';

type Action =
  | (ButtonProps & { type: 'button' })
  | (LinkProps & { type: 'link' });

type ImagePropTypes = {
  src: string;
  alt?: string;
  aspectRatio?: '4/3' | '1/1' | `${number}/${number}`;
  ariaLabel?: string;
  label?: string;
};

type IframePropTypes = {
  src: string;
  title?: string;
  allowFullScreen?: boolean;
  allow?: string;
  ariaLabel?: string;
  label?: string;
};

type MediaContent =
  | {
      type: 'image';
      config: ImagePropTypes;
    }
  | {
      type: 'icon';
      config: IconProps;
    }
  | {
      type: 'iframe';
      config: IframePropTypes;
    };

export type CardProps = {
  type: 'vertical' | 'horizontal';
  inset?: 'body' | 'full' | 'none';
  background?: 'white' | 'grey';
  truncate?: boolean;
  title: string;
  subtitle?: string;
  href?: string;
  media?: MediaContent;
  tag?: TagProps;
  content?: string;
  action?: Action;
  dataTestid?: string;
  titleAsChild?: boolean;
};
