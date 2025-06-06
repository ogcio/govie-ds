import { ReactElement } from 'react';
import { Button } from '../button/button.js';
import { ButtonProps } from '../button/types.js';
import { IconProps } from '../icon/icon.js';
import { Link, LinkProps } from '../link/link.js';
import { TagProps } from '../tag/tag.js';
import {
  CardAction,
  CardContainer,
  CardDescription,
  CardMedia,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardTag,
} from './card-next.js';

type CardNextChild =
  | ReactElement<typeof CardMedia>
  | ReactElement<typeof CardContainer>
  | ReactElement
  | undefined
  | null;
type CardContainerChild =
  | ReactElement<typeof CardHeader>
  | ReactElement<typeof CardDescription>
  | ReactElement<typeof CardAction>
  | undefined;
type CardHeaderChild =
  | ReactElement<typeof CardTitle>
  | ReactElement<typeof CardSubtitle>
  | ReactElement<typeof CardTag>
  | undefined;
type CardActionChild = ReactElement<typeof Button> | ReactElement<typeof Link>;
type CardTitleChild = ReactElement<typeof Link> | string;

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

export type CardProps = {
  type?: TypeProps;
  inset?: InsetProps;
  children?: CardNextChild | CardNextChild[] | null;
  dataTestid?: string;

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

export type CardContainerProps = {
  children: CardContainerChild | CardContainerChild[];
  inset?: InsetProps;
};
export type CardDescriptionProps = {
  children?: string;
};
export type CardActionProps = {
  children: CardActionChild | CardActionChild[];
};
export type CardNextProps = {
  children: CardNextChild | CardNextChild[];
  inset?: InsetProps;
  type?: TypeProps;
  dataTestid?: string;
};
export type CardHeaderProps = {
  children: CardHeaderChild | CardHeaderChild[];
};
export type CardTitleProps = {
  children: CardTitleChild;
};

export type CardSubtitleProps = {
  children?: string;
};

export type CardMediaProps = {
  media: MediaContent;
  href?: string;
};
