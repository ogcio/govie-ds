import { tv } from 'tailwind-variants';
import { useMetadata } from '@builder.io/mitosis';
import { Variant, Appearance } from './constants';
import { buttonBaseStyles, ButtonSize, buttonSizeVariants, getSize } from './Button.lite';
import { getVariant, getAppearance } from './utilities';

useMetadata({ angular: { selector: 'gi-link-button' } });

export type Props = {
  id?: string;
  href: string;
  children: any;
  variant?: (typeof Variant)[keyof typeof Variant];
  appearance?: (typeof Appearance)[keyof typeof Appearance];
  size?: (typeof ButtonSize)[keyof typeof ButtonSize];
  disabled?: boolean;
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  className?: string;

  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  tabIndex?: number;
  lang?: string;

  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;

  ref?: any;
  dataTestId?: string;
};

export default function LinkButton(props: Props) {
  return (
    <a
      id={props.id}
      href={props.disabled ? undefined : props.href}
      ref={props.ref}
      class={linkButtonStyles({
        variant: getVariant(props.variant),
        appearance: getAppearance(props.appearance),
        size: getSize(props.size),
        disabled: !!props.disabled,
        class: props.className,
      })}
      role={props.disabled ? 'link' : undefined}
      target={props.target ?? (props.external ? '_blank' : undefined)}
      rel={props.rel ?? (props.external ? 'noreferrer noopener' : undefined)}
      aria-current={props.ariaCurrent}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-disabled={props.disabled || undefined}
      tabIndex={props.disabled ? -1 : props.tabIndex}
      lang={props.lang}
      onClick={(event) => (props.disabled ? event.preventDefault() : props.onClick && props.onClick(event))}
      onFocus={(event) => props.onFocus && props.onFocus(event)}
      onBlur={(event) => props.onBlur && props.onBlur(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      data-testid={props.dataTestId}
    >
      {props.children}
    </a>
  );
}

export const linkButtonStyles = tv({
  extend: buttonBaseStyles,
  base: ['gi-gap-2', 'gi-no-underline', 'hover:gi-no-underline', 'aria-[disabled=true]:gi-pointer-events-none'],
  variants: {
    size: buttonSizeVariants,
  },
  compoundVariants: [
    {
      disabled: false,
      class: [
        'focus:gi-outline',
        'focus:gi-outline-sm',
        'focus:gi-outline-color-shadow-intent-focus-default',
        'focus:gi-outline-offset-0',
        'focus:gi-border-color-border-intent-focus-default',
      ],
    },
    {
      variant: Variant.PRIMARY,
      disabled: false,
      class: ['focus:gi-shadow-color-border-intent-focus-light', 'focus:gi-shadow-[inset_0_0_0_2px]'],
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.DEFAULT,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-primary-fill-hover',
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.LIGHT,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-light-fill-hover',
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.DARK,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-dark-fill-hover',
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.DEFAULT,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-primary-outline-hover',
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.LIGHT,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-dark-fill-hover',
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.DARK,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-light-fill-hover',
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.DEFAULT,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-primary-outline-hover',
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.LIGHT,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-dark-fill-hover',
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.DARK,
      disabled: false,
      class: 'focus:gi-bg-color-surface-tone-light-fill-hover',
    },
  ],
  defaultVariants: {
    size: ButtonSize.MD,
  },
});
