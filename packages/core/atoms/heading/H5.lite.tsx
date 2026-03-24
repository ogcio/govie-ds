import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h5' } });

export default function H5(props: Props) {
  return (
    <h5
      id={props.id}
      class={styles({ size: getSize(props.size, 'xs'), class: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h5>
  );
}
