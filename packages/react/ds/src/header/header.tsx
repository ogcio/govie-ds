import { variables } from '@govie-ds/tokens';
import styles from './header.module.css';

export function Header() {
  return (
    <div>
      <h1
        className={styles.header}
        style={{
          fontFamily: variables.primitive.font.family.primary,
        }}
      >
        Header
      </h1>
    </div>
  );
}
