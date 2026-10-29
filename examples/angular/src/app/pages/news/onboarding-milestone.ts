import { Component } from '@angular/core';
import { GiParagraphDirective } from '@ogcio/design-system-angular';
import { Article } from '../../shared/article';
import { PageSection } from '../../shared/page-section';

@Component({
  selector: 'app-onboarding-milestone',
  imports: [GiParagraphDirective, Article, PageSection],
  template: `
    <app-article
      heading="Public bodies complete Design System onboarding"
      date="2026-08-28"
      lead="A new group of public bodies has completed onboarding and released their first pages on the Design System."
    >
      <app-page-section anchor="milestone" heading="A growing community">
        <p giParagraph>
          Teams from departments, agencies and local authorities have completed onboarding this quarter. Each released
          its first pages on the Design System within eight weeks.
        </p>
        <p giParagraph>
          Every team that joins makes the system stronger: questions, feedback and component requests from delivery
          teams shape each new release.
        </p>
      </app-page-section>
    </app-article>
  `,
})
export class OnboardingMilestone {}
