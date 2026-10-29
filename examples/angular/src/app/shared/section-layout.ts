import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiContainer, GiGrid } from '@ogcio/design-system-angular';
import { SideNav } from '@ogcio/design-system-angular/preview';

@Component({
  selector: 'app-section-layout',
  imports: [RouterOutlet, GiContainer, GiGrid, SideNav],
  template: `
    <gi-container class="py-8 lg:py-12">
      <gi-grid container [columns]="{ base: 4, md: 8, lg: 12 }" [gap]="8">
        <gi-grid [size]="{ base: 4, md: 8, lg: 9 }">
          <router-outlet />
        </gi-grid>
        <gi-grid [size]="{ base: 4, md: 8, lg: 3 }" class="lg:order-first">
          <gi-side-nav [ariaLabel]="heading() + ' pages'">
            <ng-content />
          </gi-side-nav>
        </gi-grid>
      </gi-grid>
    </gi-container>
  `,
})
export class SectionLayout {
  readonly heading = input.required<string>();
  readonly url = input.required<string>();
}
