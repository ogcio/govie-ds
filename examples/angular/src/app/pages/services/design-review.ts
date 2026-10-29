import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-design-review',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Design reviews"
      lead="A design review checks that your service meets government design standards before it reaches the public."
    >
      <app-page-section anchor="what-we-review" heading="What we review">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Use of the Design System components and patterns</span></li>
          <li><span giText>Clarity of content and plain English</span></li>
          <li><span giText>The journey through the service, from start page to confirmation</span></li>
          <li><span giText>Consistency with other government services</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="outcome" heading="What you receive">
        <p giParagraph>
          You receive a written report with prioritised recommendations, and a follow-up session to agree next steps.
        </p>
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/contact" class="font-bold">Contact us</a>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class DesignReview {}
