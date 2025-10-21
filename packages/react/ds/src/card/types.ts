import { ComponentPropsWithoutRef, ReactElement } from 'react';
import { ButtonProps } from '../button/types.js';
import { IconProps } from '../icon/icon.js';
import { LinkProps } from '../link/link.js';
import { TagProps } from '../tag/tag.js';
import { CardContainer, CardMedia } from './card-next.js';

type CardNextChild =
  | ReactElement<typeof CardMedia>
  | ReactElement<typeof CardContainer>
  | ReactElement
  | undefined
  | null;

type InsetProps = 'body' | 'full' | 'none';
type TypeProps = 'vertical' | 'horizontal';

export type Action =
  | (ButtonProps & { type: 'button' })
  | (LinkProps & { type: 'link' });

export type ImagePropTypes = {
  src: string;
  alt?: string;
  aspectRatio?: '4/3' | '1/1' | `${number}/${number}`;
};

export type IframePropTypes = {
  src: string;
  title?: string;
  allowFullScreen?: boolean;
  allow?: string;
};

export type MediaContent =
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

export type CardProps = ComponentPropsWithoutRef<'div'> & {
  type?: TypeProps;
  inset?: InsetProps;
  background?: 'grey' | 'white';
  children?: CardNextChild | CardNextChild[] | null;

  /** @deprecated Use <CardTitle> instead */
  title?: string;
  /** @deprecated Use <CardTitle subtitle=""> instead */
  subTitle?: string;
  /** @deprecated Use <CardAction> with a n action component (e.g: Button, Link) instead */
  action?: Action;
  /** @deprecated Use <CardDescription> instead */
  content?: string;
  /** @deprecated Use <CardMedia> instead */
  media?: MediaContent;
  /** @deprecated Use <CardHeader tag={}> instead */
  tag?: TagProps;
  /** @deprecated Use <Link> around <CardTitle> instead */
  href?: string;
  /** @deprecated Use <CardTitle> */
  titleAsChild?: boolean;
};

export type CardContainerProps = ComponentPropsWithoutRef<'div'>;
export type CardDescriptionProps = ComponentPropsWithoutRef<'div'> & {
  children?: string;
};
export type CardActionProps = ComponentPropsWithoutRef<'div'>;
export type CardNextProps = ComponentPropsWithoutRef<'div'> & {
  inset?: InsetProps;
  insetSpace?: number;
  type?: TypeProps;
  background?: 'grey' | 'white';
};
export type CardHeaderProps = ComponentPropsWithoutRef<'div'>;
export type CardTitleProps = ComponentPropsWithoutRef<'div'> & {
  truncate?: boolean;
};

export type CardSubtitleProps = ComponentPropsWithoutRef<'div'> & {
  children: string;
  truncate?: boolean;
};

export type CardMediaProps = Omit<
  ComponentPropsWithoutRef<'div'> & {
    media: MediaContent;
    href?: string;
  },
  'children'
>;

export type CardTagProps = Omit<
  ComponentPropsWithoutRef<'div'> & TagProps,
  'children'
>;
