import { useMetadata } from '@builder.io/mitosis';
import classes from './styles';
import { getSize } from './styles';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h1' } });

export default function H1(props: Props) {
  return (
    <h1
      id={props.id}
      class={classes({ size: getSize(props.size, 'xl'), className: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h1>
  );
}
