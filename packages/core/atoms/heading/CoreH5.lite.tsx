import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'core-h5' } });

export default function CoreH5(props: Props) {
  return (
    <h5
      id={props.id}
      data-testid={props.dataTestId}
      class={styles({ size: getSize(props.size, 'xs'), class: props.className })}
    >
      {props.children}
    </h5>
  );
}
