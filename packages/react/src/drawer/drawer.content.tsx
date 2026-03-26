import { MenuItemAccordion } from '../header/components/header-menu.js';
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
  const secondaryItems = [
    { href: '#', label: 'Secondary item' },
    { href: '#', label: 'Secondary item' },
  ];

  const tools = [
    {
      label: 'Primary item',
      slot: <div>Slot primary item</div>,
    },
    {
      label: 'Primary item',
      slot: <div>Slot primary item</div>,
    },
    {
      label: 'Primary item',
      slot: <div>Slot primary item</div>,
    },
  ];

  const MenuHeading = ({ children }: any) => (
    <li className="gi-py-4 gi-text-sm gi-font-bold gi-text-brand-neutral-600">
      {children}
    </li>
  );

  return (
    <ul>
      <MenuHeading>Primary items</MenuHeading>
      {tools?.map(({ label, slot }: any, index: number) => {
        return (
          <li key={`toolItems-${label}-${index}`}>
            <MenuItemAccordion index={index} item={{ label, slot }} />
          </li>
        );
      })}

      <MenuHeading>Secondary items</MenuHeading>
      {secondaryItems?.map((link: any, index: number) => (
        <li key={`navLink-${link.label}-${index}`}>
          <ListItem
            href={link.href}
            label={link.label}
            external={link.external}
          />
        </li>
      ))}
    </ul>
  );
};
