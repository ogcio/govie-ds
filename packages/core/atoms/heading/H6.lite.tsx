import { useMetadata } from '@builder.io/mitosis';
import classes from './styles';
import { getSize } from './styles';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h6' } });

export default function H6(props: Props) {
  return (
    <h6
      id={props.id}
      class={classes({ size: getSize(props.size, '2xs'), className: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h6>
  );
}
