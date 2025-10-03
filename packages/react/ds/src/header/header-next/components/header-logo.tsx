'use client';
import { renderToStaticMarkup } from 'react-dom/server';
import GovieLogoHarpBlackWithText from '../../../assets/logos/gov-of-ireland/harp-black.js';
import GovieLogoHarpWithText from '../../../assets/logos/gov-of-ireland/harp-white.js';
import GovieLogoHarpBlack from '../../../assets/logos/harp/harp-black.js';
import GovieLogoHarp from '../../../assets/logos/harp/harp-white.js';
import { LogoProps } from '../../../common/types.js';
import { translate as t } from '../../../i18n/utility.js';
import Anchor from '../../../primitives/anchor.js';
import { HeaderLogoProps } from '../../types.js';
import { headerLogoVariants } from '../../variants.js';
import { useHeaderContext } from '../header-context.js';

export const HeaderLogo = ({ children }: HeaderLogoProps) => {
  return children;
};

Object.defineProperty(HeaderLogo, 'componentType', {
  value: 'HeaderLogo',
  writable: false,
  enumerable: false,
});

function getLogo({ logo, variant = 'default' }: any) {
  const logoIcon = {
    harp: {
      default: <GovieLogoHarp />,
      light: <GovieLogoHarpBlack />,
    },
    withText: {
      default: <GovieLogoHarpWithText />,
      light: <GovieLogoHarpBlackWithText />,
    },
  } as any;
  const svgMobileString = btoa(renderToStaticMarkup(logoIcon.harp[variant]));
  const svgDataUriMobile = `data:image/svg+xml;base64,${svgMobileString}`;

  const svgDesktopString = btoa(
    renderToStaticMarkup(logoIcon.withText[variant]),
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
        alt={logo?.alt || t('logo.govieLogo', { defaultValue: 'Gov.ie logo' })}
      />
    </picture>
  );
}

export const HeaderGovieLogoHarp = (logo: LogoProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderGovieLogoHarp must be used within a HeaderLogo');
  }

  return (
    <div className={headerLogoVariants({ appearance: context?.variant })}>
      {logo?.href && (
        <Anchor
          href={logo.href}
          aria-label={t('header.goToHomePage', {
            defaultValue: 'Go to Home Page',
          })}
          data-testid={`logo-link`}
          external={logo.external}
        >
          {getLogo({ logo, variant: context.variant })}
        </Anchor>
      )}
      {!logo?.href && getLogo({ logo, variant: context.variant })}
    </div>
  );
};
