import { variables } from '@govie-ds/tokens';
import { Container } from '../container/container.js';
import { Text } from '../text/text.js';
import { HarpLogo } from './harp-logo.js';
import { HeaderLink } from './header-link.js';

export type HeaderProps = {
  serviceName?: string;
  homeHref?: string;
  serviceHref?: string;
};

export function Header({ serviceName, homeHref, serviceHref }: HeaderProps) {
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
              {serviceHref ? (
                <Text size="lg" style={{ color: 'white' }}>
                  <HeaderLink href={serviceHref}>{serviceName}</HeaderLink>
                </Text>
              ) : (
                <Text size="lg" style={{ color: 'white' }}>
                  {serviceName}
                </Text>
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
