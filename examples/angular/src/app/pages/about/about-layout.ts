import { Component } from '@angular/core';
import { SectionLayout } from '../../shared/section-layout';
import { SideNavLink } from '../../shared/side-nav-link';

@Component({
  selector: 'app-about-layout',
  imports: [SectionLayout, SideNavLink],
  template: `
    <app-section-layout heading="About us" url="/about">
      <li appSideNavLink to="/about">About us</li>
      <li appSideNavLink to="/about/strategy">Strategy</li>
      <li appSideNavLink to="/about/structure">Structure</li>
    </app-section-layout>
  `,
})
export class AboutLayout {}
