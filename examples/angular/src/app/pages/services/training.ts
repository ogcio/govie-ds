import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-training',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Training"
      lead="Practical training helps your team make the most of the Design System from day one."
    >
      <app-page-section anchor="courses" heading="Courses">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Introduction to the Design System, for everyone on the team</span></li>
          <li><span giText>Building with the component libraries, for developers</span></li>
          <li><span giText>Designing with the Figma library, for designers</span></li>
          <li><span giText>Writing for government services, for content designers</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="format" heading="Format">
        <p giParagraph>
          Courses run online or in person and last half a day. We can also run a tailored workshop for your team.
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
export class Training {}
