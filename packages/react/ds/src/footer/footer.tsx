import GovieLogoHarpWithText from '../assets/logos/gov-of-ireland/harp-gold-text-green.js';
import { Container } from '../container/container.js';
import Anchor from '../primitives/anchor.js';
import { SectionBreak } from '../section-break/section-break.js';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterProps = {
  links?: FooterLink[];
  secondaryNavLinks?: {
    heading: string;
    links: FooterLink[];
  }[];
  utilityLinks?: FooterLink[];
  dataTestid?: string;
};

export function Footer({
  links,
  secondaryNavLinks,
  utilityLinks,
  dataTestid,
}: FooterProps) {
  return (
    <footer
      className="gi-footer"
      data-module="gieds-footer"
      role="contentinfo"
      aria-label="Footer"
      data-testid={dataTestid}
    >
      <div className="gi-footer-container">
        {secondaryNavLinks && (
          <div className="footer-secondary-nav-links">
            {secondaryNavLinks.map((secondaryNav, navIndex) => (
              <div key={`div-${navIndex}-${navIndex}`}>
                <div className="gi-heading-md" id={`secondary-nav-${navIndex}`}>
                  {secondaryNav.heading}
                </div>
                <SectionBreak color="gi-border-gray-100" size="md" />
                <ul aria-labelledby={`secondary-nav-${navIndex}`}>
                  {secondaryNav.links.map((link, index) => (
                    <li
                      data-testid={`secondary-${navIndex}-${index}`}
                      key={`secondary-${navIndex}-${index}`}
                    >
                      <Anchor
                        aria-label={link.label}
                        href={link.href}
                        external={link.external}
                      >
                        {link.label}
                      </Anchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <SectionBreak color="gi-border-gray-100" size="md" />
        <div className="footer-primary-nav-links">
          {links && (
            <ul>
              {links.map((link, index) => (
                <li
                  data-testid={`main-link-${index}`}
                  key={`main-link-${index}`}
                >
                  <Anchor
                    href={link.href}
                    external={link.external}
                    aria-label={link.label}
                  >
                    {link.label}
                  </Anchor>
                </li>
              ))}
            </ul>
          )}
          <div className="logo-container">
            <GovieLogoHarpWithText />
          </div>
        </div>
      </div>
      {utilityLinks && (
        <div className="gi-footer-utility-links">
          <ul>
            {utilityLinks.map((link, index) => (
              <li data-testid={`main-link-${index}`} key={`main-link-${index}`}>
                <Anchor
                  href={link.href}
                  external={link.external}
                  aria-label={link.label}
                >
                  {link.label}
                </Anchor>
              </li>
            ))}
            {/* TODO update with translation */}
            <span>Government of Ireland Design System</span>
          </ul>
        </div>
      )}
    </footer>
  );
}
