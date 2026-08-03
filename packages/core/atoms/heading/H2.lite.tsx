import { useMetadata } from '@builder.io/mitosis';
import classes from './styles';
import { getSize } from './styles';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h2' } });

export default function H2(props: Props) {
  return (
    <h2
      id={props.id}
      class={classes({ size: getSize(props.size, 'lg'), className: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h2>
  );
}
