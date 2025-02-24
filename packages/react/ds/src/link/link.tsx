import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { getSizeClass, getVariantAppearanceClass } from '../button/helpers.js';
import {
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../button/types.js';
import { cn } from '../cn.js';
import Anchor, { AnchorProps } from '../primitives/anchor.js';

export type LinkProps = AnchorProps & {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  asChild?: boolean;
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

export const Link: React.FC<LinkProps> = ({
  asChild,
  className,
  children,
  dataTestid,
  noVisited,
  noUnderline,
  noColor,
  external,
  size,
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
      '!gi-inline-flex': asButton,
    },
    size ? `gi-link-${size}` : '',
    buttonVariant,
    buttonSize,
    className,
  );

  const Component = asChild ? Slot : Anchor;

  return (
    <Component
      {...props}
      data-testid={dataTestid}
      className={linkClasses}
      external={external}
    >
      {children}
    </Component>
  );
};
