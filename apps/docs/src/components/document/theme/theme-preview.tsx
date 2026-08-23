import { ColorsMapProps, resolveCssVariables } from '@/lib/theme-utils';
import { Button, SideNav, SideNavItem } from '@ogcio/design-system-react';
import { LogoWhite } from '@ogcio/design-system-react/logos';
import {
  Header,
  HeaderSection,
  HeaderNav,
  HeaderLogo,
  HeaderTitle,
  HeaderNavItem,
  HeaderNavItemLink,
} from '@ogcio/design-system-react/next';

export const ThemePreview = ({ colors }: ColorsMapProps) => {
  return (
    <div
      style={resolveCssVariables(colors)}
      className="p-4 border rounded shadow"
    >
      <div className="flex flex-col gap-8">
        <Header>
          <HeaderSection variant="utility">
            <HeaderNav ariaLabel="Utilities">
              <HeaderNavItem>English</HeaderNavItem>
              <HeaderNavItem>Gaeilge</HeaderNavItem>
            </HeaderNav>
          </HeaderSection>
          <HeaderSection>
            <HeaderLogo>
              <LogoWhite />
            </HeaderLogo>
            <HeaderTitle>Example</HeaderTitle>
            <HeaderNav ariaLabel="Primary">
              <HeaderNavItemLink href="#">Link 1</HeaderNavItemLink>
              <HeaderNavItemLink href="#">Link 2</HeaderNavItemLink>
              <HeaderNavItemLink href="#">Link 3</HeaderNavItemLink>
            </HeaderNav>
          </HeaderSection>
        </Header>
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
