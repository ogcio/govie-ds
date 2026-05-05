import { useMetadata } from '@builder.io/mitosis';
import type { LayoutBaseProps } from './constants';

useMetadata({ angular: { selector: 'gi-box' } });

export type Props = LayoutBaseProps;

export default function Box(props: Props) {
  return (
    <div
      id={props.id}
      class={props.className}
      role={props.role}
      aria-label={props.role ? props.ariaLabel : undefined}
      aria-labelledby={props.role ? props.ariaLabelledBy : undefined}
      style={props.styles}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}
