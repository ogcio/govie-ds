import { Component } from '@angular/core';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-frameworks',
  imports: [GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Tools and frameworks"
      lead="The Design System meets your team where it already works. Every implementation shares the same tokens and the same visual result."
    >
      <app-page-section anchor="libraries" heading="Component libraries">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>HTML and CSS for server-rendered websites and content management systems</span></li>
          <li><span giText>React for single-page applications and Next.js websites</span></li>
          <li><span giText>Angular for enterprise applications, including this website</span></li>
          <li><span giText>Vue for teams that build with Vue</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="design-tools" heading="Design tools">
        <p giParagraph>Designers work from a Figma library of foundations and components.</p>
      </app-page-section>

      <app-page-section anchor="tokens" heading="Design tokens and themes">
        <p giParagraph>
          Colour, typography and spacing are defined once as design tokens. Themes let a department adapt the system to
          its needs without losing the shared government identity.
        </p>
        <ul class="space-y-4">
          <li>
            <a giLink href="https://ds.services.gov.ie/" target="_blank" rel="noreferrer noopener" class="font-bold"
              >Browse the components on the Design System website (opens in a new tab)</a
            >
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class Frameworks {}
