import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-help-overview',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, Page, PageSection],
  template: `
    <app-page
      heading="Help"
      lead="Find out how this website works, how we make it accessible and how we handle your information."
    >
      <app-page-section anchor="topics" heading="Help topics">
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/help/accessibility" class="font-bold">Accessibility statement</a>
            <p giParagraph>How accessible this website is.</p>
          </li>
          <li>
            <a giLink routerLink="/help/privacy" class="font-bold">Privacy notice</a>
            <p giParagraph>What information we collect and why.</p>
          </li>
          <li>
            <a giLink routerLink="/help/cookies" class="font-bold">Cookies</a>
            <p giParagraph>Cookies on this website.</p>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class HelpOverview {}
