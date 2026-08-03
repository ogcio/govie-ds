import { useMetadata } from '@builder.io/mitosis';
import classes from './styles';
import { getSize } from './styles';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h3' } });

export default function H3(props: Props) {
  return (
    <h3
      id={props.id}
      class={classes({ size: getSize(props.size, 'md'), className: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h3>
  );
}
