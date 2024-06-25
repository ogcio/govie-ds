import { variables } from '@govie-ds/tokens';
import { Container } from '../container/container.js';
import { Text } from '../text/text.js';
import { HarpLogo } from './harp-logo.js';

export function Header({ serviceName }: { serviceName?: string }) {
  return (
    <header
      style={{
        backgroundColor: variables.primitive.color.emerald[800],
        borderBottomWidth: variables.primitive.border.width[400],
        borderColor: variables.primitive.color.gold[500],
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: variables.primitive.space[3],
          }}
        >
          <div
            style={{
              color: 'white',
              padding: `${variables.primitive.space[3]} 0`,
            }}
          >
            <HarpLogo />
          </div>
          {serviceName ? (
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Text size="lg" style={{ color: 'white' }}>
                {serviceName}
              </Text>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
