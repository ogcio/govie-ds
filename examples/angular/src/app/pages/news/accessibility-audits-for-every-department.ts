import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective } from '@ogcio/design-system-angular';
import { Article } from '../../shared/article';
import { PageSection } from '../../shared/page-section';

@Component({
  selector: 'app-accessibility-audits-for-every-department',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, Article, PageSection],
  template: `
    <app-article
      heading="Accessibility audits now available to every department"
      date="2026-09-12"
      lead="Any public body can now request a free accessibility audit of a service built on the Design System."
    >
      <app-page-section anchor="audits" heading="Free audits for public bodies">
        <p giParagraph>
          Our Accessibility and Inclusion Unit now offers audits to every public body. Each audit combines automated
          checks, manual testing and sessions with people who use assistive technology.
        </p>
        <a giLink routerLink="/services/accessibility-audit" class="self-start font-bold"
          >Read about accessibility audits</a
        >
      </app-page-section>
    </app-article>
  `,
})
export class AccessibilityAuditsForEveryDepartment {}
