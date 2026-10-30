import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective } from '@ogcio/design-system-angular';
import { Article } from '../../shared/article';
import { PageSection } from '../../shared/page-section';

@Component({
  selector: 'app-design-review-open-call',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, Article, PageSection],
  template: `
    <app-article
      heading="Open call: put your service forward for a design review"
      date="2026-07-22"
      lead="We are inviting delivery teams to put their services forward for a service design review."
    >
      <app-page-section anchor="open-call" heading="How to take part">
        <p giParagraph>
          Teams preparing to launch or rebuild a service can apply for a review by the Service Standards Office. Reviews
          take two weeks and finish with a written report and a follow-up session.
        </p>
        <a giLink routerLink="/services/design-review" class="self-start font-bold"
          >Read about service design reviews</a
        >
      </app-page-section>
    </app-article>
  `,
})
export class DesignReviewOpenCall {}
