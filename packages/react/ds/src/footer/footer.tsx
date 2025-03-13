import GovieLogoHarpWithText from '../assets/logos/gov-of-ireland/harp-gold-text-green.js';
import { SectionBreak } from '../section-break/section-break.js';
import { ReactNode } from 'react';

export type FooterProps = {
  primarySlot?: ReactNode;
  secondarySlot?: ReactNode;
  utilitySlot?: ReactNode;
  dataTestid?: string;
  logoComponent?: ReactNode;
  className?: string;
};

export function Footer({
  primarySlot,
  secondarySlot,
  utilitySlot,
  dataTestid = 'govie-footer',
  logoComponent = <GovieLogoHarpWithText />,
  className = '',
}: FooterProps) {
  return (
    <footer
      className={`gi-footer ${className}`}
      data-module="gieds-footer"
      role="contentinfo"
      aria-label="Footer"
      data-testid={dataTestid}
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
            <div className="gi-footer-logo" aria-label="Government of Ireland">
              {logoComponent}
            </div>
          </div>
        )}

        {!secondarySlot && (
          <div className="gi-footer-logo" aria-label="Government of Ireland">
            {logoComponent}
          </div>
        )}
      </div>
      {utilitySlot && (
        <div className="gi-footer-utility" aria-label="Utility links">
          {utilitySlot}
        </div>
      )}
    </footer>
  );
}
