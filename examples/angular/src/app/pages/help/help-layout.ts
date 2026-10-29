import { Component } from '@angular/core';
import { SectionLayout } from '../../shared/section-layout';
import { SideNavLink } from '../../shared/side-nav-link';

@Component({
  selector: 'app-help-layout',
  imports: [SectionLayout, SideNavLink],
  template: `
    <app-section-layout heading="Help" url="/help">
      <li appSideNavLink to="/help">Help</li>
      <li appSideNavLink to="/help/accessibility">Accessibility statement</li>
      <li appSideNavLink to="/help/privacy">Privacy notice</li>
      <li appSideNavLink to="/help/cookies">Cookies</li>
    </app-section-layout>
  `,
})
export class HelpLayout {}
