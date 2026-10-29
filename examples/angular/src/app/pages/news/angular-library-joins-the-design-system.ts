import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiLinkDirective, GiParagraphDirective } from '@ogcio/design-system-angular';
import { Article } from '../../shared/article';
import { PageSection } from '../../shared/page-section';

@Component({
  selector: 'app-angular-library-joins-the-design-system',
  imports: [RouterLink, GiLinkDirective, GiParagraphDirective, Article, PageSection],
  template: `
    <app-article
      heading="Angular component library joins HTML, React and Vue"
      date="2026-09-30"
      lead="Teams that build with Angular can now use the same components as every other department, straight from the public library."
    >
      <app-page-section anchor="announcement" heading="Four frameworks, one design">
        <p giParagraph>
          Departments that build enterprise applications in Angular can now use the Design System directly in their
          code. The Angular library shares design tokens and styles with the HTML, React and Vue libraries, so every
          service looks the same whichever framework it uses.
        </p>
      </app-page-section>
      <app-page-section anchor="getting-started" heading="Getting started">
        <p giParagraph>
          The library covers layout, typography, actions, header, footer and navigation. More components are being
          added.
        </p>
        <a giLink routerLink="/design-system/frameworks" class="self-start font-bold">See the tools and frameworks</a>
      </app-page-section>
    </app-article>
  `,
})
export class AngularLibraryJoinsTheDesignSystem {}
