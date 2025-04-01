import { MenuItemAccordion } from '../header/components/header-menu.js';
import { HeaderSearch } from '../header/components/header-search.js';
import { ListItem } from '../list-item/list-item.js';
import { DrawerBody, DrawerFooter } from './drawer.js';

export const HtmlContent = (
  <>
    <DrawerBody>
      <p className="gi-paragraph-md">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
        molestias error accusantium non nobis excepturi doloremque dolorem
        possimus corrupti. Nostrum quisquam est voluptate! Iure suscipit,
        commodi cupiditate sit minima veritatis.
      </p>
    </DrawerBody>
    <DrawerFooter className="gi-flex gi-gap-6 gi-justify-end">
      <>
        <button className="gi-btn gi-btn-secondary gi-btn-secondary-dark gi-btn-regular">
          Cancel
        </button>
        <button className="gi-btn gi-btn-primary gi-btn-regular">
          Primary
        </button>
      </>
    </DrawerFooter>
  </>
);

export const TriggerButton = (
  <button
    data-testid="trigger-button-container"
    className="gi-btn gi-btn-primary gi-btn-regular"
  >
    Open Modal
  </button>
);

export const DrawerMenuExample = () => {
  const navLinks = [
    {
      href: '#',
      label: 'News',
    },
    {
      href: '#',
      label: 'Departments',
    },
    {
      href: '#',
      label: 'Services',
    },
  ];
  const tools = [
    {
      label: 'Search',
      action: 'search_page',
    },
  ];
  const languages = [
    {
      href: '#',
      label: 'English',
    },
    {
      href: '#',
      label: 'Gaeilge',
    },
  ];
  const searchProps = {};

  type LinkType = {
    href?: string;
    label: string;
    action?: string;
    external?: boolean;
    slot?: React.ReactNode;
    keepOnMobile?: boolean;
  };

  return (
    <ul>
      {navLinks?.map((link: LinkType, index: number) => (
        <li key={`navLink-${link.label}-${index}`}>
          <ListItem
            href={link.href}
            label={link.label}
            external={link.external}
          />
        </li>
      ))}
      {tools?.map(
        (
          { href, label, slot, keepOnMobile, external }: LinkType,
          index: number,
        ) => {
          if (slot && !keepOnMobile) {
            return null;
          }
          return (
            <li key={`toolItems-${label}-${index}`}>
              {slot ? (
                <MenuItemAccordion index={index} item={{ label, slot }} />
              ) : (
                <ListItem href={href} label={label} external={external} />
              )}
            </li>
          );
        },
      )}
      {languages?.map((link: LinkType, index: number) => (
        <li key={`secondary-${link.label}-${index}`}>
          <ListItem href={link.href} label={link.label} bold={false} />
        </li>
      ))}
      {searchProps && (
        <li className="gi-mt-8 sm:gi-hidden">
          <HeaderSearch {...searchProps} />
        </li>
      )}
    </ul>
  );
};
