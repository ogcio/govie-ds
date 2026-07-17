import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import GiDivider from '../Divider.lite';
import { getVisibility } from './HeaderNavItem.styles';
import type { VisibleValue } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'gi-header-nav-item-separator' } });

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
    <li role="none" class={classes({ className: getVisibility(props.visible) })}>
      <GiDivider
        orientation="vertical"
        id={props.id}
        dataTestId={props.dataTestId}
        styles={props.styles}
        className={dividerClasses({ className: props.className })}
      />
    </li>
  );
}

const classes = tv({
  base: 'gi-mx-2 gi-h-8 gi-items-stretch',
});

const dividerClasses = tv({
  base: 'gi-header-nav-item-separator !gi-border-[currentColor]' /* `!important` needed for styles to resolve correctly given Tailwind's class-merge limitations. */,
});
