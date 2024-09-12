import { Container } from '../container/container.js';
import { Text } from '../text/text.js';
import GovieLogo from '../../assets/logos/logo.js'

export type HeaderProps = {
  serviceName?: string;
  homeHref?: string;
  homeAriaLabel?: string;
  serviceHref?: string;
};

export function Header({
  serviceName,
  homeHref,
  homeAriaLabel,
  serviceHref,
}: HeaderProps) {
  return (
    <header className={`gi-bg-emerald-800 gi-border-gold-500 gi-font-primary`}>
      <Container>
        <div className={`gi-flex gi-items-center gi-gap-3`}>
          <div className={`gi-text-white gi-py-3`}>
            {homeHref ? (
              <a
                href={homeHref}
                aria-label={homeAriaLabel}
                className={`
                  gi-block
                  focus:gi-outline
                  focus:gi-outline-transparent
                  focus:gi-bg-yellow-400
                  focus:gi-outline-[3px]
                  focus:gi-shadow-[0_-2px_var(--gieds-color-yellow-400),0_4px_var(--gieds-color-gray-900)]  
                `}
              >
                <GovieLogo />
              </a>
            ) : (
              <GovieLogo />
            )}
          </div>
          {serviceName ? (
            <div className={`gi-flex gi-grow gi-justify-center gi-text-center`}>
              {serviceHref ? (
                <Text as="span" size="lg" className={`gi-text-white`}>
                  <a
                    className={`
                      gi-decoration-[max(1px,0.0625rem)]
                      gi-underline-offset-[0.1em]
                      hover:gi-underline
                      hover:gi-decoration-skip-ink-none
                      hover:gi-decoration-[max(3px,0.1875rem,0.12em)]
                      focus:gi-outline
                      focus:gi-outline-transparent
                      focus:gi-outline-[3px]
                      focus:gi-no-underline
                      focus:gi-bg-yellow-400                      
                      focus:gi-shadow-[0_-2px_var(--gieds-color-yellow-400),0_4px_var(--gieds-color-gray-900)]
                    `}
                    href={serviceHref}
                  >
                    {serviceName}
                  </a>
                </Text>
              ) : (
                <Text as="span" size="lg" className={`gi-text-white`}>
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
