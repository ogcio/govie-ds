import GovieLogo from '../assets/logos/logo-harp-gov.js';
import { Container } from '../container/container.js';
import { SectionBreak } from '../section-break/section-break.js';

type FooterLink = {
  label: string;
  href: string;
};

export type FooterProps = {
  links?: FooterLink[];
  secondaryNavLinks?: {
    heading: string;
    links: FooterLink[];
  }[];
};

export function Footer({ links, secondaryNavLinks }: FooterProps) {
  return (
    <footer className="gi-footer" data-module="gieds-footer">
      <Container>
        {secondaryNavLinks && (
          <div className="footer-secondary-nav-links">
            {secondaryNavLinks.map((secondaryNav, navIndex) => (
              <div key={`div-${navIndex}-${navIndex}`}>
                <div className="gi-heading-md">{secondaryNav.heading}</div>
                <SectionBreak size="md" />
                <ul>
                  {secondaryNav.links.map((link, index) => (
                    <li
                      data-testid={`secondary-${navIndex}-${index}`}
                      key={`secondary-${navIndex}-${index}`}
                    >
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="footer-primary-nav-links">
          {links && (
            <ul>
              {links.map((link, index) => (
                <li
                  data-testid={`main-link-${index}`}
                  key={`main-link-${index}`}
                >
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
          <div className="logo-container">
            <GovieLogo />
          </div>
        </div>
      </Container>
    </footer>
  );
}
