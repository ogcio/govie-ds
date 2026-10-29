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
            lang="ga"
            heading="Gaeilge"
            homeLabel="Baile"
            breadcrumbLabel="Conair nascleanúna"
            lead="Táimid tiomanta dár seirbhísí agus dár n-ábhar a chur ar fáil i nGaeilge agus i mBéarla."
          >
            <app-page-section anchor="abhar-gaeilge" heading="Ábhar Gaeilge">
              <p giParagraph>
                Tá leaganacha Gaeilge de leathanaigh an tsuímh ghréasáin seo á n-ullmhú. Níl aon téacs ionsuite sna
                comhpháirteanna Angular, mar sin úsáideann na leathanaigh Ghaeilge an leagan amach agus na
                comhpháirteanna céanna lena lipéid féin.
              </p>
            </app-page-section>
          </app-page>
        </gi-grid>
      </gi-grid>
    </gi-container>
  `,
})
export class Gaeilge {}
