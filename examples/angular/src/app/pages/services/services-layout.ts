import { Component } from '@angular/core';
import { SectionLayout } from '../../shared/section-layout';
import { SideNavLink } from '../../shared/side-nav-link';

@Component({
  selector: 'app-services-layout',
  imports: [SectionLayout, SideNavLink],
  template: `
    <app-section-layout heading="Services" url="/services">
      <li appSideNavLink to="/services">Services</li>
      <li appSideNavLink to="/services/onboarding">Onboarding</li>
      <li appSideNavLink to="/services/design-review">Design reviews</li>
      <li appSideNavLink to="/services/accessibility-audit">Accessibility audits</li>
      <li appSideNavLink to="/services/training">Training</li>
      <li appSideNavLink to="/services/support">Support</li>
    </app-section-layout>
  `,
})
export class ServicesLayout {}
