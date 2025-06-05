import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ButtonProps } from '../button/types.js';
import { IconProps } from '../icon/icon.js';
import { LinkProps } from '../link/link.js';
import { TagProps } from '../tag/tag.js';
import {
  CardFooter,
  CardContainer,
  CardBody,
  CardMedia,
  CardHeader,
} from './card-next.js';

type CardNextChild =
  | ReactElement<typeof CardMedia>
  | ReactElement<typeof CardContainer>
  | undefined
  | null;
type CardContainerChild =
  | ReactElement<typeof CardHeader>
  | ReactElement<typeof CardBody>
  | ReactElement<typeof CardFooter>
  | undefined;
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
  /** @deprecated Use <CardFooter> with a n action component (e.g: Button, Link) instead */
  action?: Action;
  /** @deprecated Use <CardBody> instead */
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
export type CardBodyProps = PropsWithChildren;
export type CardFooterProps = PropsWithChildren;
export type CardNextProps = {
  children: CardNextChild | CardNextChild[];
  inset?: InsetProps;
  type?: TypeProps;
  dataTestid?: string;
};
export type CardHeaderProps = {
  children: ReactNode;
  subTitle?: string;
  tag?: TagProps;
};
export type CardMediaProps = {
  media: MediaContent;
  href?: string;
};
