import { useMetadata } from '@builder.io/mitosis';
import styles from './styles';
import { getSize } from './utils';
import type { Props } from './types';

useMetadata({ angular: { selector: 'core-h6' } });

export default function CoreH6(props: Props) {
  return (
    <h6
      id={props.id}
      data-testid={props.dataTestId}
      class={styles({ size: getSize(props.size, '2xs'), class: props.className })}
    >
      {props.children}
    </h6>
  );
}
