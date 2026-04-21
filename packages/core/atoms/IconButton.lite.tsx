import { tv } from 'tailwind-variants';
import { useMetadata } from '@builder.io/mitosis';
import { Variant, Appearance, Size } from './utilities';
import { buttonBaseStyles } from './Button.lite';

export const IconButtonSize = {
  SM: Size.SM,
  MD: Size.MD,
  LG: Size.LG,
  XL: Size.XL,
} as const;

export type Props = {
  id?: string;
  variant?: (typeof Variant)[keyof typeof Variant];
  appearance?: (typeof Appearance)[keyof typeof Appearance];
  size?: (typeof IconButtonSize)[keyof typeof IconButtonSize];
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
  ariaExpanded?: boolean;
  ariaPressed?: boolean | 'mixed';
  ariaHasPopup?: 'menu' | 'listbox' | 'dialog' | 'grid' | 'tree' | boolean;
  ariaControls?: string;
  ariaBusy?: boolean;
  role?: string;

  type?: 'button' | 'submit' | 'reset';
  form?: string;
  tabIndex?: number;
  dataTestId?: string;
  ref?: any;
};

useMetadata({ angular: { selector: 'gi-icon-button' } });

export default function IconButton(props: Props) {
  return (
    <button
      ref={props.ref}
      id={props.id}
      class={iconButtonStyles({
        variant: getVariant(props.variant),
        appearance: getAppearance(props.appearance),
        size: getSize(props.size),
        disabled: !!props.disabled,
        class: props.className,
      })}
      disabled={props.disabled || undefined}
      onClick={(event) => props.onClick && props.onClick(event)}
      onFocus={(event) => props.onFocus && props.onFocus(event)}
      onBlur={(event) => props.onBlur && props.onBlur(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-expanded={props.ariaExpanded}
      aria-pressed={props.ariaPressed}
      aria-haspopup={props.ariaHasPopup}
      aria-controls={props.ariaControls}
      aria-busy={props.ariaBusy}
      role={props.role}
      type={props.type ?? 'button'}
      form={props.form}
      tabIndex={props.tabIndex}
      data-testid={props.dataTestId}
    >
      {props.children}
    </button>
  );
}

export const iconButtonStyles = tv({
  extend: buttonBaseStyles,
  base: ['gi-justify-center'],
  variants: {
    size: {
      sm: 'gi-h-8 gi-w-8',
      md: 'gi-h-10 gi-w-10',
      lg: 'gi-h-12 gi-w-12',
      xl: 'gi-h-14 gi-w-14',
    },
  },
  defaultVariants: {
    size: IconButtonSize.MD,
  },
});

const getVariant = (x: Props['variant'] = Variant.PRIMARY) =>
  Object.values(Variant).includes(x) ? x : Variant.PRIMARY;
const getAppearance = (x: Props['appearance']) =>
  x === Appearance.LIGHT || x === Appearance.DARK ? x : Appearance.DEFAULT;
const getSize = (x: Props['size'] = IconButtonSize.MD) =>
  Object.values(IconButtonSize).includes(x) ? x : IconButtonSize.MD;
