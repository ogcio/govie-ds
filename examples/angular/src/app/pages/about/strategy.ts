import { Component } from '@angular/core';
import { GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-strategy',
  imports: [GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="Strategy"
      lead="Our strategy supports Connecting Government 2030, the digital and ICT strategy for the Irish public service, and its ambition of digital government for all."
    >
      <app-page-section anchor="goals" heading="Our goals">
        <ol class="list-decimal pl-6 space-y-2">
          <li><span giText>Every new government service is built on the Design System</span></li>
          <li><span giText>Every service meets WCAG 2.1 AA before it launches</span></li>
          <li><span giText>People can complete government tasks online without help</span></li>
          <li><span giText>Departments share components and patterns instead of rebuilding them</span></li>
        </ol>
      </app-page-section>

      <app-page-section anchor="user-first" heading="User first">
        <p giParagraph>
          We take a user-first and business-first approach, so that digital services work for the people and the
          businesses who rely on them.
        </p>
      </app-page-section>
    </app-page>
  `,
})
export class Strategy {}
