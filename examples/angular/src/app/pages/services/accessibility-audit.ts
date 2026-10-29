import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-accessibility-audit',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Accessibility audits"
      lead="Our accessibility specialists test your service with assistive technology and against WCAG 2.1 AA."
    >
      <app-page-section anchor="how-we-test" heading="How we test">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Automated checks across every page of the service</span></li>
          <li><span giText>Manual testing with screen readers, magnification and keyboard only</span></li>
          <li><span giText>Sessions with people who use assistive technology every day</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="after-the-audit" heading="After the audit">
        <p giParagraph>
          Issues that come from Design System components are fixed centrally. Issues specific to your service come with
          clear guidance on how to fix them.
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
export class AccessibilityAudit {}
