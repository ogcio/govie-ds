import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef, PropsWithChildren } from 'react';
import {
  CoreButtonProps,
  styles as coreButtonStyles,
} from '../atoms/CoreButton.js';
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
    variant?: CoreButtonProps['variant'];
    appearance?: CoreButtonProps['appearance'];
    size?: CoreButtonProps['size'];
  };
  iconStart?: IconId;
  iconEnd?: IconId;
  disabled?: boolean;
  appearance?: Extract<CoreButtonProps['appearance'], 'default' | 'light'>;
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
        <span className="gi-pr-5 gi-pl-5">{children}</span>
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
    const Component = asChild ? Slot : Anchor;
    const buttonClassName = asButton
      ? coreButtonStyles({
          variant: asButton.variant,
          appearance: asButton.appearance,
          size: asButton.size,
          disabled: !!disabled,
          class: cn('!gi-inline-flex', className),
        })
      : undefined;
    return (
      <Component
        {...props}
        ref={ref}
        data-testid={dataTestid}
        className={
          asButton
            ? buttonClassName
            : cn(
                {
                  'gi-link': true,
                  'gi-link-no-underline': noUnderline,
                  'gi-link-no-visited': noVisited,
                  'gi-link-inherit': noColor,
                  'gi-link-disabled': disabled && !asChild,
                  'gi-link-light':
                    appearance === 'light' &&
                    !asChild &&
                    !noColor &&
                    !noVisited &&
                    !disabled,
                  'gi-text-sm': size === 'sm',
                  'gi-text-md': size === 'md',
                },
                className,
              )
        }
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
