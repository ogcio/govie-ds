'use client';
import React, { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  LogoGoldGreen as GovieLogoHarpWithText,
  LogoHarpWhite as GovieLogoHarp,
} from '../assets/logos/index.js';
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
      className={cn('gi-bg-color-surface-system-neutral-layer1', className)}
      data-module="gieds-footer"
      role="contentinfo"
      aria-label={t('footer.footer', { defaultValue: 'Footer' })}
      data-testid={dataTestid}
      {...props}
    >
      <div className="gi-py-10">
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
            <SectionBreak
              color="gi-border-color-border-system-neutral-subtle"
              size="lg"
            />
          )}

          <div
            className="gi-flex gi-flex-row-reverse gi-flex-wrap-reverse gi-justify-between gi-justify-items-stretch"
            aria-label={t('footer.secondarySlot', {
              defaultValue: 'Footer Secondary Slot',
            })}
          >
            <div className="gi-w-fit gi-mt-8 md:gi-mt-0 lg:gi-ml-auto lg:gi-flex-none gi-rounded-sm gi-focus-state-outline gi-focus-within-state-outline gi-focus-visible-state-outline">{renderLogo()}</div>
            {secondarySlot && (
              <div className="gi-grow md:gi-max-w-[calc(100%_-_var(--gieds-space-80))]">
                {secondarySlot}
              </div>
            )}
          </div>
        </Container>
      </div>

      {utilitySlot && (
        <div
          className="gi-py-4 gi-px-8 gi-bg-color-surface-system-neutral-layer2"
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
