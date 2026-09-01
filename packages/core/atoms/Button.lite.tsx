import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { getAppearance, getSize, getVariant } from './Button.styles';
import type { Appearance, ButtonSize, Variant } from './Button.styles';
import type { ValueOf } from './constants';

export type Props = {
  id?: string;
  variant?: ValueOf<typeof Variant>;
  appearance?: ValueOf<typeof Appearance>;
  size?: ValueOf<typeof ButtonSize>;
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

useDefaultProps({
  disabled: undefined,
  ariaChecked: undefined,
  ariaPressed: undefined,
  ariaExpanded: undefined,
  ariaHasPopup: false,
  ariaBusy: false,
});

export default function Button(props: Props) {
  return (
    <button
      ref={props.ref}
      id={props.id}
      class={classes({
        variant: getVariant(props.variant),
        appearance: getAppearance(props.appearance),
        size: getSize(props.size),
        disabled: !!props.disabled,
        className: props.className,
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
      type={props.type}
      form={props.form}
      value={props.value}
      tabIndex={props.tabIndex}
      data-testid={props.dataTestId}
    >
      {props.children}
    </button>
  );
}
