import { Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses } from './SideNavItem.styles';

useMetadata({ angular: { selector: 'gi-side-nav-item' } });

useDefaultProps({
  selected: false,
  disabled: undefined,
  ariaHidden: undefined,
  ariaCurrent: undefined,
});

export type Props = {
  id?: string;
  children?: any;
  selected?: boolean;
  actions?: any;
  disabled?: boolean;
  className?: string;
  styles?: Record<string, string>;
  onClick?: (event: any) => void;
  ariaHidden?: boolean | 'true' | 'false';
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  ariaControls?: string;
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
        disabled={props.disabled || undefined}
        style={props.styles}
        onClick={(event) => props.onClick && props.onClick(event)}
        aria-current={props.ariaCurrent}
        aria-label={props.ariaLabel}
        aria-controls={props.ariaControls}
        tabIndex={props.ariaHidden ? -1 : props.tabIndex}
        data-testid={props.dataTestId}
      >
        {props.children}
      </button>
      <div class={actionClasses()}>
        <Slot name="actions" />
      </div>
    </li>
  );
}
