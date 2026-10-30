import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-onboarding',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Onboarding"
      lead="Onboarding gives your team everything it needs to start building with the Design System, with our team alongside you for the first release."
    >
      <app-page-section anchor="what-happens" heading="What happens">
        <ol class="list-decimal pl-6 space-y-2">
          <li><span giText>An introductory workshop with your product, design and engineering leads</span></li>
          <li><span giText>A review of your current service and a plan for the first migration</span></li>
          <li><span giText>Hands-on pairing while your team builds the first pages</span></li>
          <li><span giText>A release review before your service goes live</span></li>
        </ol>
      </app-page-section>

      <app-page-section anchor="how-long" heading="How long it takes">
        <p giParagraph>
          Most teams are ready to release their first pages on the Design System within six to eight weeks of the
          introductory workshop.
        </p>
      </app-page-section>

      <app-page-section anchor="book" heading="Book a session">
        <p giParagraph>Tell us about your service and your team, and we will arrange an introductory workshop.</p>
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/contact" class="font-bold">Contact us</a>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class Onboarding {}
