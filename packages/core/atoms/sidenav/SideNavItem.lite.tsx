import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import { listItemClasses } from './SideNavItem.styles';
import { isAriaHidden } from '../utilities';

useMetadata({ angular: { selector: 'core-side-nav-item' } });

useDefaultProps({
  ariaHidden: undefined,
});

export type Props = {
  children?: any;
  ariaHidden?: boolean | 'true' | 'false';
};

export default function SideNavItem(props: Props) {
  return (
    <li class={listItemClasses()} aria-hidden={isAriaHidden(props.ariaHidden)}>
      {props.children}
    </li>
  );
}
