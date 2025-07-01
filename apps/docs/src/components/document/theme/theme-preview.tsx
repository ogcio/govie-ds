import { ColorsMapProps, resolveCssVariables } from '@/lib/theme-utils';
import {
  Alert,
  Button,
  Header,
  Link,
  Paragraph,
  SideNav,
  SideNavItem,
  Tag,
} from '@ogcio/design-system-react';
import React from 'react';

export const ThemePreview = ({ colors }: ColorsMapProps) => {
  return (
    <div
      style={resolveCssVariables(colors)}
      className="p-4 border rounded shadow"
    >
      <div className="flex flex-col gap-8">
        <Header
          title="Example"
          secondaryLinks={[
            {
              href: '#',
              label: 'English',
            },
            {
              href: '#',
              label: 'Gaeilge',
            },
          ]}
          items={[
            {
              itemType: 'link',
              label: 'Link 1',
            },
            {
              itemType: 'link',
              label: 'Link 2',
            },
            {
              itemType: 'link',
              label: 'Link 3',
            },
          ]}
        />
        <div className="flex gap-4">
          <Button className="w-fit" variant="primary">
            Primary
          </Button>
          <Button className="w-fit" variant="secondary">
            Secondary
          </Button>
          <Button className="w-fit" variant="flat">
            Flat
          </Button>
        </div>
        <div className="flex gap-4">
          <SideNav value="item-1">
            <SideNavItem value="item-1" label="Overview" primary />
            <SideNavItem value="item-2" label="Reports" primary />
            <SideNavItem value="item-3" label="Settings" primary />
          </SideNav>
        </div>
      </div>
    </div>
  );
};
