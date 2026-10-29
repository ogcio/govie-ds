import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationSkipped, Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  GiContainer,
  GiHeader,
  GiHeaderLogo,
  GiHeaderNav,
  GiHeaderNavButtonDirective,
  GiHeaderNavItemDirective,
  GiHeaderNavLinkDirective,
  GiHeaderSection,
  GiHeaderTitle,
  GiLinkDirective,
} from '@ogcio/design-system-angular';
import { LogoHarpWhite, LogoWhite } from '@ogcio/design-system-angular/logos';
import { GiSideNavItemDirective, GiSideNavLinkDirective, SideNav } from '@ogcio/design-system-angular/preview';
import { CloseIcon, MenuIcon } from '@ogcio/design-system-angular/icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-site-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    GiContainer,
    GiLinkDirective,
    GiHeader,
    GiHeaderSection,
    GiHeaderLogo,
    GiHeaderTitle,
    GiHeaderNav,
    GiHeaderNavItemDirective,
    GiHeaderNavLinkDirective,
    GiHeaderNavButtonDirective,
    SideNav,
    GiSideNavItemDirective,
    GiSideNavLinkDirective,
    LogoWhite,
    LogoHarpWhite,
    MenuIcon,
    CloseIcon,
  ],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly navigation = [
    { label: 'Services', url: '/services' },
    { label: 'Design System', url: '/design-system' },
    { label: 'News', url: '/news' },
    { label: 'About us', url: '/about' },
    { label: 'Contact', url: '/contact' },
  ];
  protected readonly menuOpen = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd || event instanceof NavigationSkipped),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
