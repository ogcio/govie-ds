import type { ElementRef } from '@angular/core';
import { Component, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { GiLinkDirective } from '@ogcio/design-system-angular';
import { filter, skip } from 'rxjs';
import { SiteFooter } from './shared/site-footer';
import { SiteHeader } from './shared/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, GiLinkDirective, SiteHeader, SiteFooter],
  template: `
    <a
      giLink
      [routerLink]="[]"
      fragment="main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:p-2 focus:bg-color-surface-system-neutral-default"
    >
      Skip to main content
    </a>
    <div class="flex min-h-screen flex-col">
      <app-site-header />
      <main #main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
        <router-outlet />
      </main>
      <app-site-footer />
    </div>
  `,
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    const router = inject(Router);
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        skip(1),
        filter((event) => !router.parseUrl(event.urlAfterRedirects).fragment),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.main().nativeElement.focus({ preventScroll: true }));
  }
}
