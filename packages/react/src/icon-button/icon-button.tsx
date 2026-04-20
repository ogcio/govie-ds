'use client';
import { forwardRef } from 'react';
import { Icon, type IconProps } from '../icon/icon.js';
import GiIconButton, {
  type Props as GiIconButtonProps,
} from '../atoms/IconButton.js';
import clsx from 'clsx';
import { normalizeSize } from '../utils/normalize-size.js';

/** @deprecated Use `'sm' | 'md' | 'lg' | 'xl'` instead. */
type LegacyIconButtonSize = 'small' | 'medium' | 'large' | 'extraLarge';

export type IconButtonSize =
  | LegacyIconButtonSize
  | NonNullable<GiIconButtonProps['size']>;

export type IconButtonProps = Omit<GiIconButtonProps, 'size'> & {
  /**
   * Size of the icon button. Accepts `'sm' | 'md' | 'lg' | 'xl'`.
   * Legacy values `'small' | 'medium' | 'large' | 'extraLarge'` are still accepted but deprecated.
   */
  size?: IconButtonSize;
  /** @deprecated Use children instead. Pass an `<Icon>` as children. */
  icon?: Omit<IconProps, 'size'>;
  /** @deprecated Use dataTestId instead */
  dataTestid?: string;
  /** @deprecated Use dataTestId instead */
  'data-testid'?: string;
  /** @deprecated Use ariaLabel instead */
  'aria-label'?: string;
  /** @deprecated Use ariaLabelledBy instead */
  'aria-labelledby'?: string;
  /** @deprecated Use ariaDescribedBy instead */
  'aria-describedby'?: string;
  /** @deprecated Use ariaPressed instead */
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed';
  /** @deprecated Use ariaExpanded instead */
  'aria-expanded'?: boolean | 'true' | 'false';
  /** @deprecated Use ariaControls instead */
  'aria-controls'?: string;
  /** @deprecated Use ariaHasPopup instead */
  'aria-haspopup'?:
    | boolean
    | 'true'
    | 'false'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog';
  /** @deprecated Use ariaHidden instead */
  'aria-hidden'?: boolean | 'true' | 'false';
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      children,
      variant,
      appearance,
      size = 'md',
      disabled,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      className = '',
      type = 'button',
      tabIndex,
      'data-testid': dataTestIdAttribute,
      'aria-label': ariaLabelAttribute,
      'aria-labelledby': ariaLabelledByAttribute,
      'aria-describedby': ariaDescribedByAttribute,
      'aria-pressed': ariaPressedAttribute,
      'aria-expanded': ariaExpandedAttribute,
      'aria-controls': ariaControlsAttribute,
      'aria-haspopup': ariaHasPopupAttribute,
      'aria-hidden': ariaHiddenAttribute,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaPressed,
      ariaExpanded,
      ariaControls,
      ariaHasPopup,
      ariaHidden,
      dataTestId,
      dataTestid,
      id,
    },
    reference,
  ) => {
    const normalizedSize = normalizeSize(size);
    const iconSize = normalizedSize === 'sm' ? 'sm' : 'md';

    return (
      <GiIconButton
        ref={reference}
        id={id}
        variant={variant}
        appearance={appearance}
        size={normalizedSize}
        disabled={disabled}
        className={clsx(
          className,
          icon &&
            {
              sm: 'gi-p-2',
              md: 'gi-p-3',
              lg: 'gi-p-3',
              xl: 'gi-p-3',
            }[normalizedSize],
        )}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ariaLabel={ariaLabel ?? ariaLabelAttribute}
        ariaLabelledBy={ariaLabelledBy ?? ariaLabelledByAttribute}
        ariaDescribedBy={ariaDescribedBy ?? ariaDescribedByAttribute}
        ariaPressed={
          (ariaPressed ?? ariaPressedAttribute) as boolean | 'mixed' | undefined
        }
        ariaExpanded={
          (ariaExpanded ?? ariaExpandedAttribute) as boolean | undefined
        }
        ariaControls={ariaControls ?? ariaControlsAttribute}
        ariaHasPopup={
          (ariaHasPopup ?? ariaHasPopupAttribute) as
            | 'menu'
            | 'listbox'
            | 'dialog'
            | 'grid'
            | 'tree'
            | boolean
            | undefined
        }
        ariaHidden={(ariaHidden ?? ariaHiddenAttribute) as boolean | undefined}
        type={type}
        tabIndex={tabIndex}
        dataTestId={dataTestId ?? dataTestid ?? dataTestIdAttribute}
      >
        {children ?? (icon ? <Icon size={iconSize} {...icon} /> : undefined)}
      </GiIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';
