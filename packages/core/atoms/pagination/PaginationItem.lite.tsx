import { useDefaultProps, useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'core-pagination-item' } });

export type Props = {
  children?: any;
  styles?: Record<string, string>;
  ariaHidden?: boolean;
};

useDefaultProps({
  ariaHidden: undefined,
});

export default function PaginationItem(props: Props) {
  return (
    <li aria-hidden={props.ariaHidden} style={props.styles}>
      {props.children}
    </li>
  );
}
