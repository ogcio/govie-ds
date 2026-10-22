import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
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
};

export default function HeaderNavItem(props: Props) {
  return <li class={getVisibility(props.visible)}>{props.children}</li>;
}
