import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-design-system-overview',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Design System"
      lead="The Government of Ireland Design System gives every department the same trusted identity, the same accessible components and the same patterns, so people recognise an official service the moment they arrive."
    >
      <app-page-section anchor="why-it-matters" heading="Why a single design matters">
        <p giParagraph>
          People move between departments all the time: registering a birth, renewing a licence, applying for a grant.
          When every service looks and behaves differently, people have to learn each one from scratch, and it becomes
          harder to tell a genuine government website from an imitation.
        </p>
        <p giParagraph>
          A shared design makes official services recognisable. The harp, the colours, the typography and the page
          layout tell people they are in the right place. Buttons, links and forms that behave the same way everywhere
          tell them what will happen next.
        </p>
      </app-page-section>

      <app-page-section anchor="trust" heading="Consistency builds trust">
        <p giParagraph>
          Trust is earned through repetition. Each time a person completes a task on a government website that feels
          familiar and works as expected, their confidence in the next service grows.
        </p>
        <p giParagraph>
          Consistency also protects people. A predictable visual identity makes it easier to spot phishing pages and
          fraudulent websites that try to imitate public services.
        </p>
      </app-page-section>

      <app-page-section anchor="what-you-get" heading="What your department gets">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Guidelines for content, layout, accessibility and design patterns</span></li>
          <li><span giText>Design tokens for colour, typography and spacing, ready for any theme</span></li>
          <li><span giText>A Figma library of foundations and components</span></li>
          <li><span giText>Component libraries for HTML, React, Angular and Vue</span></li>
          <li><span giText>A dedicated team that onboards your department and supports your delivery</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="this-website" heading="About this website">
        <p giParagraph>
          This website is built entirely with the Angular component library of the Design System. The header,
          navigation, typography, layout and footer all come from the public library, exactly as they would in your own
          application.
        </p>
        <ul class="space-y-4">
          <li>
            <a giLink href="https://ds.services.gov.ie/" target="_blank" rel="noreferrer noopener" class="font-bold"
              >Read the Design System documentation (opens in a new tab)</a
            >
          </li>
          <li>
            <a giLink routerLink="/design-system/benefits" class="font-bold">Benefits</a>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class DesignSystemOverview {}
