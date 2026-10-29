import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-support',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Support"
      lead="Delivery teams can reach our team while they build, whatever stage the service is at."
    >
      <app-page-section anchor="how-to-get-help" heading="How to get help">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Ask questions in the shared support channel</span></li>
          <li><span giText>Join the fortnightly drop-in sessions</span></li>
          <li><span giText>Request a new component or a change to an existing one</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="response-times" heading="Response times">
        <p giParagraph>We answer support questions within two working days.</p>
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/contact" class="font-bold">Contact us</a>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class Support {}
