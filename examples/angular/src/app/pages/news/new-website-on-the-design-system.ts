import { Component } from '@angular/core';
import { GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { Article } from '../../shared/article';
import { PageSection } from '../../shared/page-section';

@Component({
  selector: 'app-new-website-on-the-design-system',
  imports: [GiParagraphDirective, GiTextDirective, Article, PageSection],
  template: `
    <app-article
      heading="Department of Engagement launches its new website on the Design System"
      date="2026-10-14"
      lead="Our new website is built entirely with the Angular component library of the Government of Ireland Design System."
    >
      <app-page-section anchor="new-website" heading="A website that looks like government">
        <p giParagraph>
          The Department of Engagement has launched its new website, built from the ground up on the Government of
          Ireland Design System.
        </p>
        <p giParagraph>
          The header, navigation, typography, layout and footer all come from the Angular component library. Visitors
          who know other government websites will feel at home straight away.
        </p>
      </app-page-section>
      <app-page-section anchor="what-changed" heading="What has changed">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>The familiar government header and footer on every page</span></li>
          <li><span giText>Section navigation and breadcrumbs that show where you are</span></li>
          <li><span giText>Pages that adapt to phones, tablets and desktops</span></li>
          <li><span giText>Accessible components tested against WCAG 2.1 AA</span></li>
        </ul>
      </app-page-section>
    </app-article>
  `,
})
export class NewWebsiteOnTheDesignSystem {}
