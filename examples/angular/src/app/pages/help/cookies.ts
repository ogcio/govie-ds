import { Component } from '@angular/core';
import { GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-cookies',
  imports: [GiParagraphDirective, Page, PageSection],
  template: `
    <app-page heading="Cookies" lead="This demonstration website does not set any cookies.">
      <app-page-section anchor="cookies-we-use" heading="Cookies we use">
        <p giParagraph>There are no analytics, advertising or functional cookies on this website.</p>
      </app-page-section>
    </app-page>
  `,
})
export class Cookies {}
