import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h3' } });

export default function H3(props: Props) {
  return (
    <h3
      id={props.id}
      data-testid={props.dataTestId}
      class={styles({ size: getSize(props.size, 'md'), class: props.className })}
    >
      {props.children}
    </h3>
  );
}
