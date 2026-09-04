import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import GiDivider from '../Divider.lite';
import { getVisibility } from './HeaderNavItem.styles';
import type { VisibleValue } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'gi-header-nav-item-separator' } });

useDefaultProps({
  visible: true,
});

export type Props = {
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function HeaderNavItemSeparator(props: Props) {
  return (
    <li role="none" aria-hidden={true} class={listClasses({ className: getVisibility(props.visible) })}>
      <GiDivider
        orientation="vertical"
        id={props.id}
        dataTestId={props.dataTestId}
        styles={props.styles}
        className={classes({ className: props.className })}
      />
    </li>
  );
}

const listClasses = tv({
  base: 'gi-h-8',
});

// !important is needed for styles to resolve correctly given Tailwind's class-merge limitations.
const classes = tv({
  base: 'gi-header-nav-item-separator !gi-border-[currentColor] gi-mx-2',
});
