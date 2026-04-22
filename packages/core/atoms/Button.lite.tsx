import { tv } from 'tailwind-variants';
import { useMetadata } from '@builder.io/mitosis';
import { Variant, Appearance, Size } from './utilities';

export const ButtonSize = {
  SM: Size.SM,
  MD: Size.MD,
  LG: Size.LG,
} as const;

export type Props = {
  id?: string;
  variant?: (typeof Variant)[keyof typeof Variant];
  appearance?: (typeof Appearance)[keyof typeof Appearance];
  size?: (typeof ButtonSize)[keyof typeof ButtonSize];
  children?: any;
  disabled?: boolean;
  className?: string;

  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;

  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaChecked?: boolean;
  ariaPressed?: boolean | 'mixed';
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaHasPopup?: 'menu' | 'listbox' | 'dialog' | 'grid' | 'tree' | boolean;
  ariaBusy?: boolean;
  role?: string;

  type?: 'button' | 'submit' | 'reset';
  form?: string;
  value?: string;
  tabIndex?: number;
  dataTestId?: string;
  ref?: any;
};

useMetadata({ angular: { selector: 'gi-button' } });

export default function Button(props: Props) {
  return (
    <button
      ref={props.ref}
      id={props.id}
      class={styles({
        variant: getVariant(props.variant),
        appearance: getAppearance(props.appearance),
        size: getSize(props.size),
        disabled: !!props.disabled,
        class: props.className,
      })}
      data-size={getSize(props.size)}
      disabled={props.disabled || undefined}
      onClick={(event) => props.onClick && props.onClick(event)}
      onFocus={(event) => props.onFocus && props.onFocus(event)}
      onBlur={(event) => props.onBlur && props.onBlur(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-checked={props.ariaChecked}
      aria-pressed={props.ariaPressed}
      aria-expanded={props.ariaExpanded}
      aria-controls={props.ariaControls}
      aria-haspopup={props.ariaHasPopup}
      aria-busy={props.ariaBusy}
      role={props.role}
      type={props.type ?? 'button'}
      form={props.form}
      value={props.value}
      tabIndex={props.tabIndex}
      data-testid={props.dataTestId}
    >
      {props.children}
    </button>
  );
}

export const buttonBaseStyles = tv({
  base: [
    'gi-font-primary',
    'gi-border-solid',
    'gi-border-sm',
    'gi-flex',
    'gi-rounded-sm',
    'gi-items-center',
    'disabled:gi-cursor-not-allowed',
    'disabled:gi-pointer-events-none',
    'enabled:focus:gi-outline',
    'enabled:focus:gi-outline-sm',
    'enabled:focus:gi-outline-color-shadow-intent-focus-default',
    'enabled:focus:gi-outline-offset-0',
    'enabled:focus:gi-border-solid',
    'enabled:focus:gi-border-color-border-intent-focus-default',
    'enabled:focus:gi-border-sm',
    'enabled:focus:gi-rounded-sm',
  ],
  variants: {
    variant: {
      primary: [
        'gi-border-transparent',
        'enabled:focus:gi-shadow-color-border-intent-focus-light',
        'enabled:focus:gi-shadow-[inset_0_0_0_2px]',
      ],
      secondary: [],
      flat: ['gi-border-base-transparent'],
    },
    appearance: {
      default: '',
      light: '',
      dark: '',
    },
    disabled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.DEFAULT,
      disabled: false,
      class: [
        'gi-text-color-text-tone-primary-fill-default',
        'gi-bg-color-surface-tone-primary-fill-default',
        'gi-stroke-color-text-tone-primary-fill-default',
        'hover:gi-bg-color-surface-tone-primary-fill-hover',
        'enabled:focus:gi-bg-color-surface-tone-primary-fill-hover',
      ],
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.LIGHT,
      disabled: false,
      class: [
        'gi-text-color-text-tone-light-fill-default',
        'gi-stroke-color-text-tone-light-fill-default',
        'gi-bg-color-surface-tone-light-fill-default',
        'hover:gi-bg-color-surface-tone-light-fill-hover',
        'enabled:focus:gi-bg-color-surface-tone-light-fill-hover',
      ],
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.DARK,
      disabled: false,
      class: [
        'gi-text-color-text-tone-dark-fill-default',
        'gi-stroke-color-text-tone-dark-fill-default',
        'gi-bg-color-surface-tone-dark-fill-default',
        'hover:gi-bg-color-surface-tone-dark-fill-hover',
        'enabled:focus:gi-bg-color-surface-tone-dark-fill-hover',
      ],
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.DEFAULT,
      disabled: true,
      class: [
        'gi-bg-color-surface-tone-primary-fill-disabled',
        'gi-text-color-text-tone-primary-fill-disabled',
        'gi-stroke-color-text-tone-primary-fill-disabled',
      ],
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.LIGHT,
      disabled: true,
      class: [
        'gi-bg-color-surface-tone-light-fill-disabled',
        'gi-text-color-text-tone-light-fill-disabled',
        'gi-stroke-color-text-tone-light-fill-disabled',
      ],
    },
    {
      variant: Variant.PRIMARY,
      appearance: Appearance.DARK,
      disabled: true,
      class: [
        'gi-bg-color-surface-tone-dark-fill-disabled',
        'gi-text-color-text-tone-dark-fill-disabled',
        'gi-stroke-color-text-tone-dark-fill-disabled',
      ],
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.DEFAULT,
      disabled: false,
      class: [
        'gi-border-color-border-tone-primary-outline-default',
        'gi-text-color-text-tone-primary-outline-default',
        'gi-stroke-color-text-tone-primary-outline-default',
        'hover:gi-bg-color-surface-tone-primary-outline-hover',
        'enabled:focus:gi-bg-color-surface-tone-primary-outline-hover',
      ],
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.LIGHT,
      disabled: false,
      class: [
        'gi-text-color-text-tone-light-outline-default',
        'gi-stroke-color-text-tone-light-outline-default',
        'gi-border-color-border-tone-light-outline-default',
        'gi-bg-base-transparent',
        'hover:gi-bg-color-surface-tone-light-outline-hover',
        'enabled:focus:gi-bg-color-surface-tone-dark-fill-hover',
      ],
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.DARK,
      disabled: false,
      class: [
        'gi-border-color-border-tone-dark-outline-default',
        'gi-bg-color-surface-tone-dark-outline-default',
        'hover:gi-bg-color-surface-tone-dark-outline-hover',
        'enabled:focus:gi-bg-color-surface-tone-light-fill-hover',
      ],
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.DEFAULT,
      disabled: true,
      class: [
        'gi-border-color-border-tone-primary-outline-disabled',
        'gi-bg-color-surface-tone-primary-outline-disabled',
        'gi-text-color-text-tone-primary-outline-disabled',
        'gi-stroke-color-text-tone-primary-outline-disabled',
      ],
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.LIGHT,
      disabled: true,
      class: [
        'gi-bg-color-surface-tone-light-outline-disabled',
        'gi-border-color-border-tone-light-outline-disabled',
        'gi-text-color-text-tone-light-outline-disabled',
        'gi-stroke-color-text-tone-light-outline-disabled',
      ],
    },
    {
      variant: Variant.SECONDARY,
      appearance: Appearance.DARK,
      disabled: true,
      class: [
        'gi-border-color-border-tone-dark-outline-disabled',
        'gi-bg-color-surface-tone-dark-fill-disabled',
        'gi-text-color-text-tone-dark-outline-disabled',
        'gi-stroke-color-text-tone-dark-outline-disabled',
      ],
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.DEFAULT,
      disabled: false,
      class: [
        'gi-text-color-text-tone-primary-flat-default',
        'gi-stroke-color-text-tone-primary-flat-default',
        'gi-bg-base-transparent',
        'hover:gi-bg-color-surface-tone-primary-flat-hover',
        'enabled:focus:gi-bg-color-surface-tone-primary-outline-hover',
      ],
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.LIGHT,
      disabled: false,
      class: [
        'gi-bg-color-surface-tone-light-flat-default',
        'gi-text-color-text-tone-light-flat-default',
        'gi-stroke-color-text-tone-light-flat-default',
        'hover:gi-bg-color-surface-tone-light-flat-hover',
        'enabled:focus:gi-bg-color-surface-tone-dark-fill-hover',
      ],
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.DARK,
      disabled: false,
      class: [
        'gi-text-color-text-tone-dark-flat-default',
        'gi-stroke-color-text-tone-dark-flat-default',
        'hover:gi-bg-color-surface-tone-dark-flat-hover',
        'enabled:focus:gi-bg-color-surface-tone-light-fill-hover',
      ],
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.DEFAULT,
      disabled: true,
      class: [
        'gi-text-color-text-tone-primary-flat-disabled',
        'gi-stroke-color-text-tone-primary-flat-disabled',
        'gi-bg-color-surface-tone-primary-flat-disabled',
      ],
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.LIGHT,
      disabled: true,
      class: [
        'gi-bg-color-surface-tone-light-flat-disabled',
        'gi-text-color-text-tone-light-flat-disabled',
        'gi-stroke-color-text-tone-light-flat-disabled',
      ],
    },
    {
      variant: Variant.FLAT,
      appearance: Appearance.DARK,
      disabled: true,
      class: [
        'gi-bg-color-surface-tone-dark-flat-disabled',
        'gi-text-color-text-tone-dark-flat-disabled',
        'gi-stroke-color-text-tone-dark-flat-disabled',
      ],
    },
  ],
  defaultVariants: {
    variant: Variant.PRIMARY,
    appearance: Appearance.DEFAULT,
    disabled: false,
  },
});

export const styles = tv({
  extend: buttonBaseStyles,
  base: ['gi-gap-2'],
  variants: {
    size: {
      sm: 'gi-h-8 gi-px-2 gi-py-1.5 gi-text-xs',
      md: 'gi-h-10 gi-px-3 gi-py-2 gi-text-sm',
      lg: 'gi-h-12 gi-px-4 gi-py-3 gi-text-2md',
    },
  },
  defaultVariants: {
    size: ButtonSize.MD,
  },
});

const getVariant = (x: Props['variant'] = Variant.PRIMARY) =>
  Object.values(Variant).includes(x) ? x : Variant.PRIMARY;
const getAppearance = (x: Props['appearance']) =>
  x === Appearance.LIGHT || x === Appearance.DARK ? x : Appearance.DEFAULT;
const getSize = (x: Props['size'] = ButtonSize.MD) => (Object.values(ButtonSize).includes(x) ? x : ButtonSize.MD);
