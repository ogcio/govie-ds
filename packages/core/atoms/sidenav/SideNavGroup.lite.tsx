import { Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import GiKeyboardArrowDownIcon from '../icons/KeyboardArrowDown.lite';
import CoreSideNavItemAction from './SideNavItemAction.lite';
import { tv } from 'tailwind-variants';
import { arrowClasses, baseListItemClasses, chevronClasses, rowClasses } from './SideNavItem.styles';

useMetadata({ angular: { selector: 'core-side-nav-group' } });

useDefaultProps({
  ariaHidden: undefined,
});

export type Props = {
  children?: any;
  trigger?: any;
  actions?: any;
  open?: boolean;
  listId?: string;
  ariaHidden?: boolean | 'true' | 'false';
};

export default function SideNavGroup(props: Props) {
  return (
    <li class={baseListItemClasses()} aria-hidden={props.ariaHidden}>
      <div class={rowClasses()}>
        <Slot name="trigger" />
        <CoreSideNavItemAction group={true}>
          <Slot name="actions" />
        </CoreSideNavItemAction>
        <div class={chevronClasses()} aria-hidden="true">
          <GiKeyboardArrowDownIcon className={arrowClasses({ open: !!props.open })} />
        </div>
      </div>
      <ul id={props.listId} class={listClasses({ open: !!props.open })}>
        {props.children}
      </ul>
    </li>
  );
}

const listClasses = tv({
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
