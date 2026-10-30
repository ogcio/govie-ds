import { Component } from '@angular/core';
import { GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-privacy',
  imports: [GiParagraphDirective, Page, PageSection],
  template: `
    <app-page heading="Privacy notice" lead="This demonstration website does not collect any personal information.">
      <app-page-section anchor="what-we-collect" heading="What we collect">
        <p giParagraph>We do not ask for, store or share any personal information on this website.</p>
      </app-page-section>
    </app-page>
  `,
})
export class Privacy {}
