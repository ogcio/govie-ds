import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h1' } });

export default function H1(props: Props) {
  return (
    <h1
      id={props.id}
      class={styles({ size: getSize(props.size, 'xl'), class: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h1>
  );
}
