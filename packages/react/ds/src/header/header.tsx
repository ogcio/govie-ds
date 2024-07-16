import { variables } from '@govie-ds/tokens';
import { Container } from '../container/container.js';
import { Text } from '../text/text.js';
import { GovIrelandLogo } from './gov-ireland-logo.js';
import linkStyles from './header.module.css';

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
        // borderBottomWidth: variables.primitive.border.width[400], // TODO: semantic vars
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
            {homeHref ? (
              <a className={linkStyles.homeLink} href={homeHref}>
                <GovIrelandLogo />
              </a>
            ) : (
              <GovIrelandLogo />
            )}
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
                  <a className={linkStyles.link} href={serviceHref}>
                    {serviceName}
                  </a>
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
