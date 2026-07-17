import { useMetadata } from '@builder.io/mitosis';
import { getVisibility, classes } from './HeaderNavItem.styles';
import type { VisibleValue } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'gi-header-nav-item' } });

export type Props = {
  children: any;
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
  onClick?: (event: any) => void;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  dataTestId?: string;
};

export default function HeaderNavItem(props: Props) {
  return (
    <li class={getVisibility(props.visible)}>
      <button
        type="button"
        id={props.id}
        class={classes({ className: ['gi-header-nav-item', props.className] })}
        style={props.styles}
        aria-label={props.ariaLabel}
        aria-expanded={props.ariaExpanded}
        aria-controls={props.ariaControls}
        data-testid={props.dataTestId}
        onClick={(event) => props.onClick && props.onClick(event)}
      >
        {props.children}
      </button>
    </li>
  );
}
