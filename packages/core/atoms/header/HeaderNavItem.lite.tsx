import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { getVisibility } from './HeaderNavItem.styles';
import type { VisibleValue } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'core-header-nav-item' } });

useDefaultProps({
  visible: true,
});

export type Props = {
  children?: any;
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
  className?: string;
  styles?: Record<string, string>;
};

export default function HeaderNavItem(props: Props) {
  return (
    <li class={classes({ className: [getVisibility(props.visible), props.className] })} style={props.styles}>
      {props.children}
    </li>
  );
}

const classes = tv({});
