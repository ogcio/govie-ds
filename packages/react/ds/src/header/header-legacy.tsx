'use client';
import { useEffect, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import {
  LogoBlack as GovieLogoHarpBlackWithText,
  LogoWhite as GovieLogoHarpWithText,
  LogoHarpBlack as GovieLogoHarpBlack,
  LogoHarpWhite as GovieLogoHarp,
} from '../atoms/icons/logos';
import { cn } from '../cn.js';
import { Container } from '../container/container.js';
import { translate as t } from '../i18n/utility.js';
import { Icon } from '../icon/icon.js';
import Anchor from '../primitives/anchor.js';
import { MobileHeaderMenuItems } from './components/header-menu.js';
import { SlotContainer, SlotItemAction } from './components/header-slot.js';
import { attachEventsToItemActionTriggers } from './helper.js';
import {
  HeaderAppearance,
  HeaderItem,
  HeaderProps,
  SecondaryLink,
} from './types.js';
import {
  headerMenuVariants,
  headerToolItemVariants,
  headerVariants,
  headerSecondaryLinksVariants,
  headerSecondaryLinkItemVariants,
  headerSecondaryLinkSlotItemVariants,
  headerTitleVariants,
  headerDividerVariants,
  headerLogoVariants,
} from './variants.js';

function getLogo({ logo, appearance = 'default' }: HeaderProps) {
  const logoIcon = {
    harp: {
      default: <GovieLogoHarp />,
      light: <GovieLogoHarpBlack />,
    },
    withText: {
      default: <GovieLogoHarpWithText />,
      light: <GovieLogoHarpBlackWithText />,
    },
  };
  const svgMobileString = btoa(renderToStaticMarkup(logoIcon.harp[appearance]));
  const svgDataUriMobile = `data:image/svg+xml;base64,${svgMobileString}`;

  const svgDesktopString = btoa(
    renderToStaticMarkup(logoIcon.withText[appearance]),
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

const buildDefaultMobileMenu = (
  mobileMenuLabel: string,
  items: HeaderItem[],
  secondaryLinks: HeaderProps['secondaryLinks'],
) => {
  const mobileMenu: HeaderItem = {
    label: mobileMenuLabel,
    icon: 'menu',
    itemType: 'slot',
    component: (
      <MobileHeaderMenuItems items={items} secondaryLinks={secondaryLinks} />
    ),
    slotAppearance: 'drawer',
    showItemMode: 'mobile-only',
  };

  return [mobileMenu, ...items];
};

const SecondaryLinkItem = ({
  href,
  label,
  slot,
  index,
  appearance = 'default',
}: { index: number; appearance: HeaderAppearance } & SecondaryLink) => (
  <li>
    {href ? (
      <Anchor
        aria-label={label}
        data-testid={`secondary-link-desktop-${index}`}
        href={href}
        className={headerSecondaryLinkItemVariants({ appearance })}
      >
        {label}
      </Anchor>
    ) : (
      <div
        className={headerSecondaryLinkSlotItemVariants({ appearance })}
        data-appearance={appearance}
      >
        {slot}
      </div>
    )}
  </li>
);

const SecondaryLinks: React.FC<{
  links?: HeaderProps['secondaryLinks'];
  appearance: HeaderAppearance;
}> = ({ links, appearance }) => {
  return (
    <ul>
      {links?.map((link, index) => (
        <SecondaryLinkItem
          {...link}
          index={index}
          key={`secondary-${link.label}-${index}`}
          appearance={appearance}
        />
      ))}
    </ul>
  );
};

export function HeaderLegacy({
  title,
  items,
  logo,
  secondaryLinks,
  fullWidth = false,
  addDefaultMobileMenu,
  mobileMenuLabel,
  showMenuLabel = true,
  showTitleOnMobile,
  dataTestid,
  appearance = 'default',
  ...props
}: HeaderProps) {
  useEffect(() => {
    attachEventsToItemActionTriggers();
  }, []);

  const ItemTypeComponent = ({
    item,
    index,
  }: {
    item: HeaderItem;
    index: number;
  }) => {
    switch (item.itemType) {
      case 'slot': {
        return (
          <SlotItemAction index={index} item={item} appearance={appearance} />
        );
      }
      case 'link': {
        return (
          <Anchor
            className={headerToolItemVariants({ appearance })}
            href={item.href}
            onClick={item.onClick}
            aria-label={item.label || `link ${index}`}
            data-testid={`item-link-${index}`}
            external={item.external}
          >
            {item.label && item.label}
            {item.icon && <Icon icon={item.icon} />}
          </Anchor>
        );
      }
      case 'custom-link': {
        return (
          <Anchor asChild className={headerToolItemVariants({ appearance })}>
            {item.component}
          </Anchor>
        );
      }
      default: {
        // Divider
        return <div className={headerDividerVariants({ appearance })}></div>;
      }
    }
  };

  const headerMenuLabel = showMenuLabel
    ? mobileMenuLabel || t('header.menu', { defaultValue: 'Menu' })
    : '';

  const finalItems = useMemo(() => {
    const newItems = items || [];
    return addDefaultMobileMenu
      ? buildDefaultMobileMenu(headerMenuLabel, newItems, secondaryLinks || [])
      : newItems;
  }, [addDefaultMobileMenu]);

  return (
    <header
      id="GovieHeader"
      aria-label={t('header.siteHeader', { defaultValue: 'Site Header' })}
      className={headerVariants({ appearance })}
      data-testid={dataTestid}
      {...props}
    >
      <Container
        id="HeaderContainer"
        className="gi-order-2"
        fullWidth={fullWidth}
      >
        <div className={headerMenuVariants({ appearance })}>
          <div className={headerLogoVariants({ appearance })}>
            {logo?.href && (
              <Anchor
                href={logo.href}
                aria-label={t('header.goToHomePage', {
                  defaultValue: 'Go to Home Page',
                })}
                data-testid={`logo-link`}
                external={logo.external}
              >
                {getLogo({ logo, appearance })}
              </Anchor>
            )}
            {!logo?.href && getLogo({ logo, appearance })}
          </div>
          <div
            className={cn(headerTitleVariants({ appearance }), {
              'gi-hidden': !showTitleOnMobile,
            })}
          >
            {title}
          </div>
          <div className="gi-flex gi-items-center gi-gap-2 md:gi-gap-4 gi-flex-none">
            {finalItems?.map((item, index) => {
              const { label, showItemMode = 'desktop-only' } = item;
              return (
                <div
                  aria-label={item.ariaLabel}
                  data-testid={`header-item-${index}`}
                  className={cn({
                    'gi-block': showItemMode === 'always',
                    'gi-block lg:gi-hidden': showItemMode === 'mobile-only',
                    'gi-hidden lg:gi-block': showItemMode === 'desktop-only',
                  })}
                  key={`item-${label}-${index}`}
                >
                  <ItemTypeComponent item={item} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {secondaryLinks && (
        <div className={headerSecondaryLinksVariants({ appearance })}>
          <Container
            className="gi-flex gi-justify-end gi-items-center"
            fullWidth={fullWidth}
          >
            {secondaryLinks && (
              <SecondaryLinks links={secondaryLinks} appearance={appearance} />
            )}
          </Container>
        </div>
      )}

      {finalItems?.map(({ itemType, component, slotAppearance }, index) => {
        if (itemType === 'slot') {
          const renderOnlyForDropdown =
            component && slotAppearance !== 'drawer';

          if (renderOnlyForDropdown) {
            return (
              <SlotContainer
                key={`slot-container-${index}`}
                slot={component}
                index={index}
                appearance={appearance}
              />
            );
          }
          return null;
        }
      })}
    </header>
  );
}
