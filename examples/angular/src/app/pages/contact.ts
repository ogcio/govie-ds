import { Component } from '@angular/core';
import {
  GiContainer,
  GiGrid,
  GiInsetTextDirective,
  GiLinkDirective,
  GiParagraphDirective,
} from '@ogcio/design-system-angular';
import { PageSection } from '../shared/page-section';
import { Page } from '../shared/page';

@Component({
  selector: 'app-contact',
  imports: [GiContainer, GiGrid, GiInsetTextDirective, GiLinkDirective, GiParagraphDirective, Page, PageSection],
  template: `
    <gi-container class="py-8 lg:py-12">
      <gi-grid container [columns]="{ base: 4, md: 8, lg: 12 }" [gap]="8">
        <gi-grid [size]="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
          <app-page
            heading="Contact"
            lead="Get in touch with the Department of Engagement about onboarding, reviews, audits or training."
          >
            <app-page-section anchor="email" heading="Email">
              <p giParagraph>
                Email the team at
                <a giLink href="mailto:hello&#64;engagement.example">hello&#64;engagement.example</a> and we will reply
                within two working days.
              </p>
            </app-page-section>

            <app-page-section anchor="opening-hours" heading="Opening hours">
              <p giParagraph>Monday to Friday, 9am to 5pm, except public holidays.</p>
            </app-page-section>

            <app-page-section anchor="demonstration" heading="About this contact page">
              <blockquote giInsetText>
                <p giParagraph>
                  This is a demonstration website. Messages sent to the example address are not received by anyone.
                </p>
              </blockquote>
            </app-page-section>
          </app-page>
        </gi-grid>
      </gi-grid>
    </gi-container>
  `,
})
export class Contact {}
