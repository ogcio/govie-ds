import { Component } from '@angular/core';
import { GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-principles',
  imports: [GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Principles"
      lead="Four principles guide every component and pattern in the Design System. They apply equally to public-facing services and to internal tools."
    >
      <app-page-section anchor="citizen-centred" heading="Citizen-centred design">
        <p giParagraph>
          Prioritise the needs, expectations and experiences of the people who use the service throughout the design
          process.
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Research continuously to understand the diverse needs of users</span></li>
          <li><span giText>Build services that are intuitive and easy to navigate</span></li>
          <li><span giText>Use clear and simple language that everyone can understand</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="accessibility" heading="Accessibility and inclusivity">
        <p giParagraph>Design services that work for everyone, regardless of their abilities or circumstances.</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Meet WCAG 2.1 AA as a minimum</span></li>
          <li><span giText>Test with people who use assistive technology</span></li>
          <li><span giText>Offer alternative formats and support for different needs</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="consistency" heading="Consistency and reliability">
        <p giParagraph>Maintain a consistent and reliable experience across every government digital service.</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Use one design system for visual design, interaction and terminology</span></li>
          <li><span giText>Build on secure and dependable technology</span></li>
          <li><span giText>Review services regularly to keep standards high</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="transparency" heading="Transparency and trust">
        <p giParagraph>Be open and honest in the way services are designed and delivered.</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Explain the purpose, benefits and limits of each service</span></li>
          <li><span giText>Say plainly how personal data is collected and used</span></li>
          <li><span giText>Keep content accurate and up to date</span></li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class Principles {}
