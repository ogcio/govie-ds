import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GiSideNavItemDirective, GiSideNavLinkDirective } from '@ogcio/design-system-angular/preview';

@Component({
  selector: 'li[appSideNavLink]',
  imports: [RouterLink, RouterLinkActive, GiSideNavLinkDirective],
  hostDirectives: [GiSideNavItemDirective],
  template: `
    <a
      giSideNavLink
      [routerLink]="to()"
      routerLinkActive
      [routerLinkActiveOptions]="{ exact: true }"
      ariaCurrentWhenActive="page"
      #rla="routerLinkActive"
      [selected]="rla.isActive"
    >
      <ng-content />
    </a>
  `,
})
export class SideNavLink {
  readonly to = input.required<string>();
}
