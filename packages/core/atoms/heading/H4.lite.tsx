import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'gi-h4' } });

export default function H4(props: Props) {
  return (
    <h4
      id={props.id}
      class={styles({ size: getSize(props.size, 'sm'), class: props.className })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </h4>
  );
}
