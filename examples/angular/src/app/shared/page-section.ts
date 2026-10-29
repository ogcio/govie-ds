import { Component, input } from '@angular/core';
import { GiH2Directive, GiStackDirective } from '@ogcio/design-system-angular';

@Component({
  selector: 'app-page-section',
  imports: [GiStackDirective, GiH2Directive],
  template: `
    <section giStack direction="column" [gap]="4" align="stretch" [attr.aria-labelledby]="anchor()">
      <h2 giHeading size="md" tabindex="-1" class="scroll-mt-6 focus:outline-none" [id]="anchor()">{{ heading() }}</h2>
      <ng-content />
    </section>
  `,
})
export class PageSection {
  readonly anchor = input.required<string>();
  readonly heading = input.required<string>();
}
