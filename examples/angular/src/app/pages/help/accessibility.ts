import { Component } from '@angular/core';
import { GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-accessibility',
  imports: [GiParagraphDirective, Page, PageSection],
  template: `
    <app-page
      heading="Accessibility statement"
      lead="We want as many people as possible to be able to use this website."
    >
      <app-page-section anchor="standards" heading="Standards">
        <p giParagraph>
          This website is built with components from the Government of Ireland Design System, which are designed to meet
          WCAG 2.1 AA.
        </p>
      </app-page-section>
    </app-page>
  `,
})
export class Accessibility {}
