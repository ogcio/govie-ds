import { Component } from '@angular/core';
import { SectionLayout } from '../../shared/section-layout';
import { SideNavLink } from '../../shared/side-nav-link';

@Component({
  selector: 'app-design-system-layout',
  imports: [SectionLayout, SideNavLink],
  template: `
    <app-section-layout heading="Design System" url="/design-system">
      <li appSideNavLink to="/design-system">Design System</li>
      <li appSideNavLink to="/design-system/principles">Principles</li>
      <li appSideNavLink to="/design-system/benefits">Benefits</li>
      <li appSideNavLink to="/design-system/frameworks">Tools and frameworks</li>
      <li appSideNavLink to="/design-system/adoption">Adoption</li>
    </app-section-layout>
  `,
})
export class DesignSystemLayout {}
