import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h2' } });

export default function H2(props: Props) {
  return (
    <h2
      id={props.id}
      data-testid={props.dataTestId}
      class={styles({ size: getSize(props.size, 'lg'), class: props.className })}
    >
      {props.children}
    </h2>
  );
}
