import { variables } from '@govie-ds/tokens';
import { Container } from '../container/container.js';
import { HarpLogo } from './harp-logo.js';
import styles from './header.module.css';

export function Header() {
  return (
    <header
      style={{
        backgroundColor: variables.primitive.color.emerald[800],
        borderBottomWidth: variables.primitive.border.width[400],
        borderColor: variables.primitive.color.gold[500],
      }}
    >
      <Container>
        <div className={styles.header}>
          <HarpLogo />
        </div>
      </Container>
    </header>
  );
}
