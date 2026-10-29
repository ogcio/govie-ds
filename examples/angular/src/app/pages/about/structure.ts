import { Component } from '@angular/core';
import { GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-structure',
  imports: [GiParagraphDirective, Page, PageSection],
  template: `
    <app-page
      heading="Structure"
      lead="The Department is organised into four divisions that work closely with delivery teams across the public service."
    >
      <app-page-section anchor="digital-experience" heading="Digital Experience Division">
        <p giParagraph>Leads onboarding for departments.</p>
      </app-page-section>

      <app-page-section anchor="accessibility-inclusion" heading="Accessibility and Inclusion Unit">
        <p giParagraph>Carries out accessibility audits and promotes inclusive design across government.</p>
      </app-page-section>

      <app-page-section anchor="service-standards" heading="Service Standards Office">
        <p giParagraph>Runs service design reviews.</p>
      </app-page-section>

      <app-page-section anchor="corporate-services" heading="Corporate Services">
        <p giParagraph>Looks after finance, people and governance for the Department.</p>
      </app-page-section>
    </app-page>
  `,
})
export class Structure {}
