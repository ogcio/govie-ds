import { useMetadata } from '@builder.io/mitosis';
import classes from './styles';
import { getSize } from './styles';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h4' } });

export default function H4(props: Props) {
  return (
    <h4
      id={props.id}
      class={classes({ size: getSize(props.size, 'sm'), className: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h4>
  );
}
