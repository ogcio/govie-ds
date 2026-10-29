import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-adoption',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Adoption"
      lead="Most departments move to the Design System in five steps. Our team supports you through each of them."
    >
      <app-page-section anchor="steps" heading="The five steps">
        <ol class="list-decimal pl-6 space-y-2">
          <li><span giText>Discover: review your current services and agree priorities with our team</span></li>
          <li><span giText>Plan: choose the framework, the theme and the first service to migrate</span></li>
          <li><span giText>Build: replace custom components with the Design System, page by page</span></li>
          <li><span giText>Assure: complete an accessibility audit and a service design review</span></li>
          <li><span giText>Launch and improve: release, measure and feed back into the Design System</span></li>
        </ol>
      </app-page-section>

      <app-page-section anchor="support" heading="Support along the way">
        <p giParagraph>
          Each department gets a named contact in our team, access to training for designers and developers, and a
          channel to raise questions or request new components.
        </p>
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/services/onboarding" class="font-bold">Onboarding</a>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class Adoption {}
