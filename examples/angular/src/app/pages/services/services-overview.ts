import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-services-overview',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, Page, PageSection],
  template: `
    <app-page
      heading="Services"
      lead="We support departments, agencies and local authorities at every step of moving their digital services onto the Design System."
    >
      <app-page-section anchor="our-services" heading="Our services">
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/services/onboarding" class="font-bold">Onboarding</a>
            <p giParagraph>A guided start for your team, from the first workshop to the first release.</p>
          </li>
          <li>
            <a giLink routerLink="/services/design-review" class="font-bold">Design reviews</a>
            <p giParagraph>A review of your service against government design standards.</p>
          </li>
          <li>
            <a giLink routerLink="/services/accessibility-audit" class="font-bold">Accessibility audits</a>
            <p giParagraph>Expert testing against WCAG 2.1 AA, with a clear plan to fix what we find.</p>
          </li>
          <li>
            <a giLink routerLink="/services/training" class="font-bold">Training</a>
            <p giParagraph>Practical sessions for designers, developers and content designers.</p>
          </li>
          <li>
            <a giLink routerLink="/services/support" class="font-bold">Support</a>
            <p giParagraph>Answers, advice and component requests while you build.</p>
          </li>
        </ul>
      </app-page-section>

      <app-page-section anchor="who-can-use" heading="Who can use these services">
        <p giParagraph>
          Our services are free for every public service body in Ireland. Priority is given to services with a large
          number of users and to services that are being rebuilt.
        </p>
      </app-page-section>
    </app-page>
  `,
})
export class ServicesOverview {}
