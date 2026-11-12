import { useMetadata } from '@builder.io/mitosis';
import { actionClasses } from './SideNavItem.styles';

useMetadata({ angular: { selector: 'core-side-nav-item-action' } });

export type Props = {
  children?: any;
  className?: string;
  styles?: Record<string, string>;
};

export default function SideNavItemAction(props: Props) {
  return (
    <div class={actionClasses({ className: props.className })} style={props.styles}>
      {props.children}
    </div>
  );
}
