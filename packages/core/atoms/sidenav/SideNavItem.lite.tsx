import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes from './SideNavItem.styles';

useMetadata({ angular: { selector: 'gi-side-nav-item' } });

useDefaultProps({
  ariaHidden: undefined,
  ariaCurrent: undefined,
});

export type Props = {
  id?: string;
  children?: any;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  styles?: Record<string, string>;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  ariaHidden?: boolean | 'true' | 'false';
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  tabIndex?: number;
  dataTestId?: string;
};

export default function SideNavItem(props: Props) {
  return (
    <li class="gi-list-none gi-mt-1 gi-relative gi-side-nav-list" aria-hidden={props.ariaHidden}>
      <button
        type="button"
        id={props.id}
        class={classes({
          selected: !!props.selected,
          disabled: !!props.disabled,
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
        {props.children}
      </button>
    </li>
  );
}
