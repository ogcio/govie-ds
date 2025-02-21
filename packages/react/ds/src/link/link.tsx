import React from 'react';
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from 'react-router';
import { getSizeClass, getVariantAppearanceClass } from '../button/helpers.js';
import {
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../button/types.js';
import { cn } from '../cn.js';
import Anchor, { AnchorProps } from '../primitives/anchor.js';

export const LinkAs = {
  Anchor: 'a',
  Button: 'button',
  ReactRouterLink: 'ReactRouterLink',
};

export type LinkType = (typeof LinkAs)[keyof typeof LinkAs];

export type LinkProps = AnchorProps & {
  as?: LinkType | React.ElementType;
  href?: string;
  noVisited?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  external?: boolean;
  size?: 'sm' | 'md';
  onClick?: React.MouseEventHandler<HTMLElement>;
  dataTestid?: string;
  asButton?: {
    variant?: ButtonVariant;
    appearance?: ButtonAppearance;
    size?: ButtonSize;
  };
} & ReactRouterLinkProps;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    as,
    href,
    className,
    children,
    dataTestid,
    noVisited,
    noUnderline,
    noColor,
    external,
    size,
    onClick,
    asButton,
    ...props
  }) => {
    const buttonVariant =
      asButton &&
      getVariantAppearanceClass({
        disabled: false,
        variant: asButton?.variant,
        appearance: asButton?.appearance,
      });
    const buttonSize = asButton && getSizeClass(asButton?.size);

    const linkClasses = cn(
      {
        'gi-link': !asButton,
        'gi-link-no-underline': !asButton && noUnderline,
        'gi-link-no-visited': !asButton && noVisited,
        'gi-link-inherit': !asButton && noColor,
        'gi-btn': asButton,
        '!gi-inline-block': asButton,
      },
      size ? `gi-link-${size}` : '',
      buttonVariant,
      buttonSize,
      className,
    );

    if (as === LinkAs.ReactRouterLink) {
      return (
        <ReactRouterLink
          {...props}
          data-testid={dataTestid}
          className={linkClasses}
        ></ReactRouterLink>
      );
    }

    const Component = as === LinkAs.Button ? LinkAs.Button : Anchor;

    return (
      <Component
        {...props}
        data-testid={dataTestid}
        className={linkClasses}
        href={href}
        onClick={onClick}
        external={external}
      >
        {children}
      </Component>
    );
  },
);
