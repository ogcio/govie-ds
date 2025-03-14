'use client';
import { ReactNode } from 'react';
import GovieLogoHarpWithText from '../assets/logos/gov-of-ireland/harp-gold-text-green.js';
import GovieLogoHarp from '../assets/logos/harp/harp-white.js';
import { SectionBreak } from '../section-break/section-break.js';
import Anchor from '../primitives/anchor.js';
import { LogoProps } from '../common/types.js';
import { renderToStaticMarkup } from 'react-dom/server';

export type FooterProps = {
  primarySlot?: ReactNode;
  secondarySlot?: ReactNode;
  utilitySlot?: ReactNode;
  logo?: LogoProps;
  className?: string;
  dataTestid?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function getLogo({ logo }: FooterProps) {
  const svgMobileString = btoa(renderToStaticMarkup(<GovieLogoHarp />));
  const svgDataUriMobile = `data:image/svg+xml;base64,${svgMobileString}`;
  const svgDesktopString = btoa(
    renderToStaticMarkup(<GovieLogoHarpWithText />),
  );
  const svgDataUriDesktop = `data:image/svg+xml;base64,${svgDesktopString}`;

  return (
    <picture>
      <source
        srcSet={logo?.imageLarge || svgDataUriDesktop}
        media="(min-width: 640px)"
      />
      <img
        className={'gi-h-10 sm:gi-h-14'}
        src={logo?.imageSmall || svgDataUriMobile}
        alt={logo?.alt || 'Gov.ie logo'}
      />
    </picture>
  );
}

export function Footer({
  primarySlot,
  secondarySlot,
  utilitySlot,
  logo,
  className = '',
  dataTestid,
  ...props
}: FooterProps) {
  const renderLogo = () => {
    return (
      <>
        {logo?.href && (
          <Anchor
            href={logo.href}
            aria-label="Go to the home page"
            data-testid={`logo-link`}
            external={logo.external}
          >
            {getLogo({ logo })}
          </Anchor>
        )}
        {!logo?.href && getLogo({ logo })}
      </>
    );
  };
  return (
    <footer
      className={`gi-footer ${className}`}
      data-module="gieds-footer"
      role="contentinfo"
      aria-label="Footer"
      data-testid={dataTestid}
      {...props}
    >
      <div className="gi-footer-container">
        {primarySlot && (
          <div
            className="gi-footer-primary-nav"
            aria-label="Primary footer navigation"
          >
            {primarySlot}
          </div>
        )}

        <SectionBreak color="gi-border-gray-100" size="lg" />

        {secondarySlot && (
          <div
            className="gi-footer-secondary-nav"
            aria-label="Secondary footer navigation"
          >
            <div className="gi-footer-secondary-content">{secondarySlot}</div>
            <div className="gi-footer-logo">{renderLogo()}</div>
          </div>
        )}

        {!secondarySlot && <div className="gi-footer-logo">{renderLogo()}</div>}
      </div>
      {utilitySlot && (
        <div className="gi-footer-utility" aria-label="Utility links">
          {utilitySlot}
        </div>
      )}
    </footer>
  );
}
