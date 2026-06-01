import _ from 'lodash';
import { Slot } from '@radix-ui/react-slot';
import type { PropsWithChildren } from 'react';
import React, { forwardRef } from 'react';
import LinkNext, { type Props as LinkNextProps, Appearance, Underline, Visited } from '@/atoms/Link';
import { getSizeClass, getVariantAppearanceClass } from '@/button/helpers';
import type { ButtonAppearance, ButtonSize, ButtonVariant } from '@/button/types';
import { cn } from '@/cn';
import type { IconId } from '@/icon/icon';
import { Icon } from '@/icon/icon';
import type { AnchorProps } from '@/primitives/anchor';
import Anchor from '@/primitives/anchor';

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

type LinkContainerProps = PropsWithChildren<Pick<LinkProps, 'size' | 'iconStart' | 'iconEnd' | 'asChild' | 'asButton'>>;

const LinkContainer = ({ size, iconStart, asChild, asButton, children, iconEnd }: LinkContainerProps) => {
  const iconSize = 'sm';
  const showIconStart = iconStart && !asButton && !asChild;
  const showIconEnd = iconEnd && !asButton && !asChild;

  return (
    <>
      {showIconStart && (
        <span className="gi-link-icon gi-link-icon-start" data-size={size || 'sm'}>
          <Icon icon={iconStart} size={iconSize} />
        </span>
      )}
      {showIconEnd || showIconStart ? <span className="gi-pr-5 gi-pl-5">{children}</span> : children}

      {showIconEnd && (
        <span className="gi-link-icon gi-link-icon-end" data-size={size || 'sm'}>
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
    const useLinkNext = !_.some({
      asChild,
      asButton,
      iconStart,
      iconEnd,
      disabled,
      size,
    });

    if (useLinkNext && props.href) {
      return (
        <LinkNext
          href={props.href}
          external={external}
          variant="inline"
          underline={noUnderline ? Underline.HOVER : Underline.ALWAYS}
          appearance={noColor ? Appearance.INHERIT : appearance === 'light' ? Appearance.LIGHT : undefined}
          visited={noVisited ? Visited.NONE : undefined}
          className={className}
          dataTestId={dataTestid}
          id={props.id}
          target={props.target as LinkNextProps['target']}
          rel={props.rel}
          download={props.download}
          ariaCurrent={props['aria-current']}
          ariaLabel={props['aria-label']}
          ariaLabelledBy={props['aria-labelledby']}
          ariaDescribedBy={props['aria-describedby']}
          ariaHidden={props['aria-hidden']}
          tabIndex={props.tabIndex}
          lang={props.lang}
          onClick={props.onClick}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
        >
          {children}
        </LinkNext>
      );
    }

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
            'gi-link-light': appearance === 'light' && !asButton && !asChild && !noColor && !noVisited && !disabled,
            'gi-text-sm': size === 'sm',
            'gi-text-md': size === 'md',
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
          <LinkContainer asButton={asButton} asChild={asChild} iconEnd={iconEnd} iconStart={iconStart} size={size}>
            {children}
          </LinkContainer>
        )}
      </Component>
    );
  },
);

Link.displayName = 'Link';
