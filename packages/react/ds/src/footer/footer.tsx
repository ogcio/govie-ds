import { Container } from '../container/container.js';
import { Heading } from '../heading/heading.js';
import footerImage from './logo.png';

type FooterLink = {
  label: string;
  href: string;
};

export type FooterProps = {
  links?: FooterLink[];
  secondaryNavLinks?: {
    hasTwoCols?: boolean;
    heading: string;
    links: FooterLink[];
  }[];
};

function FooterLink({ href, label }: FooterLink) {
  return (
    <a className="gi-underline gi-underline-offset-sm" href={href}>
      {label}
    </a>
  );
}

export function Footer({ links, secondaryNavLinks }: FooterProps) {
  return (
    <footer
      className={`gi-bg-gold-50 gi-border-solid gi-border-t-xs gi-border-gold-500 gi-pt-3xl gi-pb-2xl gi-font-primary`}
      data-module="gieds-footer"
    >
      <Container>
        {secondaryNavLinks && (
          <div className="gi-grid sm:gi-grid-flow-col gi-grid-flow-row gi-gap-2xl">
            {secondaryNavLinks.map((secondaryNav, navIndex) => (
              <div
                className={secondaryNav.hasTwoCols ? `sm:gi-col-span-2` : ``}
              >
                <Heading as="h2" size="lg">
                  {secondaryNav.heading}
                </Heading>
                <ul
                  className={`gi-border-solid gi-border-t gi-border-gold-500 gi-mt-2xl gi-pt-xl ${secondaryNav.hasTwoCols ? `sm:gi-columns-2` : ``} `}
                >
                  {secondaryNav.links.map((link, index) => (
                    <li
                      data-testid={`secondary-${navIndex}-${index}`}
                      className="gi-mb-xl"
                    >
                      <FooterLink
                        key={`secondary-${navIndex}-${index}`}
                        href={link.href}
                        label={link.label}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="gi-flex gi-items-center">
          {links && (
            <ul className="gi-flex gi-gap-lg gi-grow">
              {links.map((link, index) => (
                <li data-testid={`main-link-${index}`}>
                  <FooterLink
                    key={`main-link-${index}`}
                    href={link.href}
                    label={link.label}
                  />
                </li>
              ))}
            </ul>
          )}
          <img
            className="gi-ml-auto"
            width="190"
            height="66"
            src={footerImage}
            alt="GOV IE"
          />
        </div>
      </Container>
    </footer>
  );
}
