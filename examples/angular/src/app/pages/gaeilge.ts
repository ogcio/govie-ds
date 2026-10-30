import { Component } from '@angular/core';
import { GiContainer, GiGrid, GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../shared/page-section';
import { Page } from '../shared/page';

@Component({
  selector: 'app-gaeilge',
  imports: [GiContainer, GiGrid, GiParagraphDirective, Page, PageSection],
  template: `
    <gi-container class="py-8 lg:py-12">
      <gi-grid container [columns]="{ base: 4, md: 8, lg: 12 }" [gap]="8">
        <gi-grid [size]="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
          <app-page
            heading="Gaeilge"
            headingLang="ga"
            lead="We are committed to providing our services and content in both Irish and English."
          >
            <app-page-section anchor="irish-language" heading="Irish language content">
              <p giParagraph>
                Irish versions of the pages on this website are being prepared. The Angular components carry no built-in
                text, so the Irish pages reuse the same layout and components with their own labels.
              </p>
            </app-page-section>
          </app-page>
        </gi-grid>
      </gi-grid>
    </gi-container>
  `,
})
export class Gaeilge {}
