import { resolveCssVariables } from '@/lib/theme-utils';
import {
  Alert,
  Button,
  Header,
  Link,
  Paragraph,
  SideNav,
  SideNavItem,
  Tag,
} from '@govie-ds/react';
import React, { useEffect, useRef, useState } from 'react';

type ThemePreviewProps = {
  colors: Record<string, Record<string | number, string>>;
};

export const ThemePreview: React.FC<ThemePreviewProps> = ({ colors }) => {
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
          <Tag type="info" text="Info" />
          <Tag type="success" text="Success" />
          <Tag type="warning" text="Warning" />
          <Tag type="error" text="Error" />
          <Tag type="default" text="Default" />
        </div>
        <div className="flex gap-4">
          <Link href="#">Link</Link>
        </div>
        <div className="flex gap-4">
          <SideNav value="item-1">
            <SideNavItem value="item-1" label="Overview" primary />
            <SideNavItem value="item-2" label="Reports" primary />
            <SideNavItem value="item-3" label="Settings" primary />
          </SideNav>
        </div>
        <div className="flex gap-4">
          <Alert title="Info">
            <Paragraph>This is a info Alert</Paragraph>
          </Alert>
          <Alert title="Success" variant="success">
            <Paragraph>This is a success Alert</Paragraph>
          </Alert>
          <Alert title="Warning" variant="warning">
            <Paragraph>This is a warning Alert</Paragraph>
          </Alert>
          <Alert title="Error" variant="danger">
            <Paragraph>This is an error Alert</Paragraph>
          </Alert>
        </div>
      </div>
    </div>
  );
};
