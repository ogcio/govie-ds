import { useMetadata } from '@builder.io/mitosis';
import classes from './styles';
import { getSize } from './styles';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h5' } });

export default function H5(props: Props) {
  return (
    <h5
      id={props.id}
      class={classes({ size: getSize(props.size, 'xs'), className: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h5>
  );
}
