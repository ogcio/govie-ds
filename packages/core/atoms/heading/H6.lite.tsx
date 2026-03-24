import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h6' } });

export default function H6(props: Props) {
  return (
    <h6
      id={props.id}
      class={styles({ size: getSize(props.size, '2xs'), class: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h6>
  );
}
