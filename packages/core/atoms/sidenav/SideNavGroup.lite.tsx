import { Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses, arrowClasses } from './SideNavItem.styles';
import GiKeyboardArrowDownIcon from '../icons/KeyboardArrowDown.lite';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-side-nav-group' } });

useDefaultProps({
  ariaHidden: undefined,
  ariaCurrent: undefined,
});

export type Props = {
  id?: string;
  children: any;
  open?: boolean;
  actions?: any;
  selected?: boolean;
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
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  tabIndex?: number;
  dataTestId?: string;
};

export default function SideNavGroup(props: Props) {
  return (
    <li class="gi-list-none gi-mt-1 gi-relative gi-side-nav-list" aria-hidden={props.ariaHidden}>
      <div class="gi-relative">
        <button
          type="button"
          id={props.id}
          class={classes({
            selected: !!props.selected,
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
          aria-current={props.ariaCurrent}
          aria-label={props.ariaLabel}
          tabIndex={props.ariaHidden ? -1 : props.tabIndex}
          data-testid={props.dataTestId}
        >
          <Slot name="label" />
        </button>
        <div class={actionClasses({ expandable: true })}>
          <Slot name="actions" />
        </div>
        <GiKeyboardArrowDownIcon className={arrowClasses({ open: !!props.open })} />
      </div>
      <ul aria-expanded={!!props.open} class={contentClasses({ open: !!props.open })}>
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
