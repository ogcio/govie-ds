import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import { listItemClasses } from './BreadcrumbLink.styles';

useMetadata({ angular: { selector: 'core-breadcrumb-item' } });

export type Props = {
  children?: any;
  styles?: Record<string, string>;
  ariaHidden?: boolean;
};

useDefaultProps({
  ariaHidden: undefined,
});

export default function BreadcrumbItem(props: Props) {
  return (
    <li class={listItemClasses()} aria-hidden={props.ariaHidden} style={props.styles}>
      {props.children}
    </li>
  );
}
