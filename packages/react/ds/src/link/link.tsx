import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef, PropsWithChildren } from 'react';
import { getSizeClass, getVariantAppearanceClass } from '../button/helpers.js';
import {
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../button/types.js';
import { cn } from '../cn.js';
import { Icon, IconId } from '../icon/icon.js';
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
  iconStart?: IconId;
  iconEnd?: IconId;
  disabled?: boolean;
  appearance?: Extract<ButtonAppearance, 'default' | 'light'>;
};

type LinkContainerProps = PropsWithChildren<
  Pick<LinkProps, 'size' | 'iconStart' | 'iconEnd' | 'asChild' | 'asButton'>
>;

const LinkContainer = ({
  size,
  iconStart,
  asChild,
  asButton,
  children,
  iconEnd,
}: LinkContainerProps) => {
  const iconSize = 'sm';
  const showIconStart = iconStart && !asButton && !asChild;
  const showIconEnd = iconEnd && !asButton && !asChild;

  return (
    <>
      {showIconStart && (
        <span
          className="gi-link-icon gi-link-icon-start"
          data-size={size || 'sm'}
        >
          <Icon icon={iconStart} size={iconSize} />
        </span>
      )}
      {showIconEnd || showIconStart ? (
        <span className="gi:pr-5 gi:pl-5">{children}</span>
      ) : (
        children
      )}

      {showIconEnd && (
        <span
          className="gi-link-icon gi-link-icon-end"
          data-size={size || 'sm'}
        >
          <Icon icon={iconEnd} size={iconSize} />
        </span>
      )}
    </>
  );
};

export const Link = forwardRef<HTMLElement, LinkProps>(
  (
    {
      size,
      asChild,
      className,
      children,
      dataTestid,
      noVisited,
      noUnderline,
      noColor,
      external,
      asButton,
      iconStart,
      iconEnd,
      disabled,
      appearance,
      ...props
    },
    ref,
  ) => {
    const buttonVariant =
      asButton &&
      getVariantAppearanceClass({
        disabled: false,
        variant: asButton?.variant,
        appearance: asButton?.appearance,
      });
    const buttonSize = asButton && getSizeClass(asButton?.size);
    const Component = asChild ? Slot : Anchor;

    return (
      <Component
        {...props}
        ref={ref}
        data-testid={dataTestid}
        className={cn(
          {
            'gi-link': !asButton,
            'gi-link-no-underline': !asButton && noUnderline,
            'gi-link-no-visited': !asButton && noVisited,
            'gi-link-inherit': !asButton && noColor,
            'gi-btn': asButton,
            '!gi-inline-flex': asButton,
            'gi-link-disabled': disabled && !asButton && !asChild,
            'gi-link-light':
              appearance === 'light' &&
              !asButton &&
              !asChild &&
              !noColor &&
              !noVisited &&
              !disabled,
            'gi:text-sm': size === 'sm',
            'gi:text-md': size === 'md',
          },
          buttonVariant,
          buttonSize,
          className,
        )}
        data-appearance={appearance}
        external={external}
        href={disabled ? 'javascript:void(0)' : props.href}
      >
        {asChild ? (
          children
        ) : (
          <LinkContainer
            asButton={asButton}
            asChild={asChild}
            iconEnd={iconEnd}
            iconStart={iconStart}
            size={size}
          >
            {children}
          </LinkContainer>
        )}
      </Component>
    );
  },
);

Link.displayName = 'Link';
