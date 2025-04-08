'use client';
import React from 'react';
import { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import GovieLogoHarpWithText from '../assets/logos/gov-of-ireland/harp-gold-text-green.js';
import GovieLogoHarp from '../assets/logos/harp/harp-white.js';
import { cn } from '../cn.js';
import { LogoProps } from '../common/types.js';
import { Container } from '../container/container.js';
import { translate as t } from '../i18n/utility.js';
import Anchor from '../primitives/anchor.js';
import { SectionBreak } from '../section-break/section-break.js';

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
      <source srcSet={logo?.imageLarge || svgDataUriDesktop} />
      <img
        className="gi-h-16"
        src={logo?.imageSmall || svgDataUriMobile}
        alt={logo?.alt || t('logo.govieLogo', { defaultValue: 'Gov.ie Logo' })}
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
            aria-label={t('footer.goToHomePage', {
              defaultValue: 'Go to Home Page',
            })}
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
      className={cn('gi-footer', className)}
      data-module="gieds-footer"
      role="contentinfo"
      aria-label={t('footer.footer', { defaultValue: 'Footer' })}
      data-testid={dataTestid}
      {...props}
    >
      <div className="gi-footer-container">
        <Container>
          {primarySlot && (
            <div
              aria-label={t('footer.primarySlot', {
                defaultValue: 'Footer Primary Slot',
              })}
            >
              {primarySlot}
            </div>
          )}

          {primarySlot && secondarySlot && (
            <SectionBreak color="gi-border-gray-100" size="lg" />
          )}

          <div
            className="gi-footer-secondary-slot"
            aria-label={t('footer.secondarySlot', {
              defaultValue: 'Footer Secondary Slot',
            })}
          >
            <div className="gi-footer-logo">{renderLogo()}</div>
            {secondarySlot && (
              <div className="gi-footer-secondary-slot-content">
                {secondarySlot}
              </div>
            )}
          </div>
        </Container>
      </div>

      {utilitySlot && (
        <div
          className="gi-footer-utility"
          aria-label={t('footer.utilityLinks', {
            defaultValue: 'Footer Utility Links',
          })}
        >
          {utilitySlot}
        </div>
      )}
    </footer>
  );
}
