import { Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses, arrowClasses, rowClasses, trailingClasses } from './SideNavItem.styles';
import GiKeyboardArrowDownIcon from '../icons/KeyboardArrowDown.lite';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-side-nav-group' } });

useDefaultProps({
  ariaHidden: undefined,
});

export type Props = {
  id?: string;
  children: any;
  open?: boolean;
  actions?: any;
  label?: any;
  disabled?: boolean;
  className?: string;
  styles?: Record<string, string>;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  ariaHidden?: boolean;
  ariaLabel?: string;
  ariaControls?: string;
  tabIndex?: number;
  dataTestId?: string;
};

export default function SideNavGroup(props: Props) {
  return (
    <li class="gi-list-none gi-mt-1 gi-side-nav-list" aria-hidden={props.ariaHidden}>
      <div class={rowClasses()}>
        <button
          type="button"
          id={props.id}
          class={classes({
            disabled: !!props.disabled,
            expandable: true,
            className: props.className,
          })}
          style={props.styles}
          disabled={props.disabled || undefined}
          onClick={(event) => props.onClick && props.onClick(event)}
          onFocus={(event) => props.onFocus && props.onFocus(event)}
          onBlur={(event) => props.onBlur && props.onBlur(event)}
          onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
          onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
          aria-label={props.ariaLabel}
          aria-expanded={!!props.open}
          aria-controls={props.ariaControls}
          tabIndex={props.ariaHidden ? -1 : props.tabIndex}
          data-testid={props.dataTestId}
        >
          <Slot name="label" />
        </button>
        <div class={trailingClasses()}>
          <div class={actionClasses({ overlay: false })}>
            <Slot name="actions" />
          </div>
          <GiKeyboardArrowDownIcon className={arrowClasses({ open: !!props.open })} />
        </div>
      </div>
      <ul id={props.ariaControls} class={contentClasses({ open: !!props.open })}>
        {props.children}
      </ul>
    </li>
  );
}

const contentClasses = tv({
  base: 'gi-side-nav-group',
  variants: {
    open: {
      true: 'gi-block',
      false: 'gi-hidden',
    },
  },
  defaultVariants: {
    open: false,
  },
});
