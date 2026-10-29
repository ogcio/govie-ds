import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-benefits',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, Page, PageSection],
  template: `
    <app-page
      heading="Benefits"
      lead="Moving to the Design System changes how quickly your department can deliver, how much it costs to maintain your services, and how confident people feel when they use them."
    >
      <app-page-section anchor="efficiency" heading="Efficiency">
        <p giParagraph>
          Teams start from a complete suite of components, patterns and guidelines instead of designing and building the
          basics again. Effort goes into the parts of the service that are unique to your department.
        </p>
      </app-page-section>

      <app-page-section anchor="consistency" heading="Consistency">
        <p giParagraph>
          A unified design language gives people the same experience across every service, so what they learn on one
          government website works on the next.
        </p>
      </app-page-section>

      <app-page-section anchor="accessibility" heading="Accessibility">
        <p giParagraph>
          Components are built and tested against WCAG 2.1 AA. Your services inherit that work and every fix made
          centrally reaches all departments when they update.
        </p>
      </app-page-section>

      <app-page-section anchor="performance" heading="Performance">
        <p giParagraph>
          Optimised components and assets keep pages fast, including on older devices and slower mobile connections.
        </p>
      </app-page-section>

      <app-page-section anchor="responsive" heading="Responsive by default">
        <p giParagraph>
          Layouts and components adapt to every screen size, from a phone in a waiting room to a desktop in an office.
        </p>
      </app-page-section>

      <app-page-section anchor="compliance" heading="Compliance">
        <p giParagraph>
          Following the Design System keeps services aligned with government standards on identity and accessibility,
          which makes assurance simpler and faster.
        </p>
        <ul class="space-y-4">
          <li>
            <a giLink routerLink="/design-system/adoption" class="font-bold">Adoption</a>
          </li>
        </ul>
      </app-page-section>
    </app-page>
  `,
})
export class Benefits {}
