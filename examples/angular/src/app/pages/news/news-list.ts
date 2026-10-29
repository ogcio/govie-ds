import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  GiBreadcrumbItemDirective,
  GiBreadcrumbLinkDirective,
  GiBreadcrumbs,
  GiContainer,
  GiDividerDirective,
  GiGrid,
  GiH1Directive,
  GiH2Directive,
  GiLinkDirective,
  GiParagraphDirective,
  GiStack,
  GiStackDirective,
  GiTextDirective,
} from '@ogcio/design-system-angular';

@Component({
  selector: 'app-news-list',
  imports: [
    RouterLink,
    GiBreadcrumbs,
    GiBreadcrumbItemDirective,
    GiBreadcrumbLinkDirective,
    GiContainer,
    GiGrid,
    GiStack,
    GiStackDirective,
    GiH1Directive,
    GiH2Directive,
    GiParagraphDirective,
    GiTextDirective,
    GiLinkDirective,
    GiDividerDirective,
  ],
  template: `
    <gi-container class="py-8 lg:py-12">
      <gi-grid container [columns]="{ base: 4, md: 8, lg: 12 }" [gap]="8">
        <gi-grid [size]="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
          <gi-stack direction="column" [gap]="8" align="stretch">
            <gi-breadcrumbs ariaLabel="Breadcrumb">
              <li giBreadcrumbItem><a giBreadcrumbLink routerLink="/">Home</a></li>
              <li giBreadcrumbItem><a giBreadcrumbLink routerLink="/news" current>News</a></li>
            </gi-breadcrumbs>

            <gi-stack direction="column" [gap]="6" align="stretch">
              <h1 giHeading size="lg">News</h1>
              <p giParagraph size="lg">Announcements and updates from the Department of Engagement.</p>

              <article giStack direction="column" [gap]="2">
                <span giText size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-10-14">14 October 2026</time>
                </span>
                <h2 giHeading size="sm">
                  <a giLink routerLink="/news/new-website-on-the-design-system"
                    >Department of Engagement launches its new website on the Design System</a
                  >
                </h2>
                <p giParagraph>
                  Our new website is built entirely with the Angular component library of the Government of Ireland
                  Design System.
                </p>
              </article>
              <hr giDivider />
              <article giStack direction="column" [gap]="2">
                <span giText size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-09-30">30 September 2026</time>
                </span>
                <h2 giHeading size="sm">
                  <a giLink routerLink="/news/angular-library-joins-the-design-system"
                    >Angular component library joins HTML, React and Vue</a
                  >
                </h2>
                <p giParagraph>
                  Teams that build with Angular can now use the same components as every other department, straight from
                  the public library.
                </p>
              </article>
              <hr giDivider />
              <article giStack direction="column" [gap]="2">
                <span giText size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-09-12">12 September 2026</time>
                </span>
                <h2 giHeading size="sm">
                  <a giLink routerLink="/news/accessibility-audits-for-every-department"
                    >Accessibility audits now available to every department</a
                  >
                </h2>
                <p giParagraph>
                  Any public body can now request a free accessibility audit of a service built on the Design System.
                </p>
              </article>
              <hr giDivider />
              <article giStack direction="column" [gap]="2">
                <span giText size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-08-28">28 August 2026</time>
                </span>
                <h2 giHeading size="sm">
                  <a giLink routerLink="/news/onboarding-milestone">Public bodies complete Design System onboarding</a>
                </h2>
                <p giParagraph>
                  A new group of public bodies has completed onboarding and released their first pages on the Design
                  System.
                </p>
              </article>
              <hr giDivider />
              <article giStack direction="column" [gap]="2">
                <span giText size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-07-22">22 July 2026</time>
                </span>
                <h2 giHeading size="sm">
                  <a giLink routerLink="/news/design-review-open-call"
                    >Open call: put your service forward for a design review</a
                  >
                </h2>
                <p giParagraph>
                  We are inviting delivery teams to put their services forward for a service design review.
                </p>
              </article>
            </gi-stack>
          </gi-stack>
        </gi-grid>
      </gi-grid>
    </gi-container>
  `,
})
export class NewsList {}
