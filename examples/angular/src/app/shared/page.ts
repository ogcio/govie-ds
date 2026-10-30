import { Component, contentChildren, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  GiBreadcrumbItemDirective,
  GiBreadcrumbLinkDirective,
  GiBreadcrumbs,
  GiGrid,
  GiH1Directive,
  GiH2Directive,
  GiLinkDirective,
  GiParagraphDirective,
  GiStack,
  GiStackDirective,
} from '@ogcio/design-system-angular';
import { PageSection } from './page-section';
import { SectionLayout } from './section-layout';

@Component({
  selector: 'app-page',
  imports: [
    RouterLink,
    GiBreadcrumbs,
    GiBreadcrumbItemDirective,
    GiBreadcrumbLinkDirective,
    GiGrid,
    GiStack,
    GiStackDirective,
    GiH1Directive,
    GiH2Directive,
    GiParagraphDirective,
    GiLinkDirective,
  ],
  template: `
    <gi-stack direction="column" [gap]="8" align="stretch">
      <gi-breadcrumbs ariaLabel="Breadcrumb">
        <li giBreadcrumbItem><a giBreadcrumbLink routerLink="/">Home</a></li>
        @if (section && section.heading() !== heading()) {
          <li giBreadcrumbItem>
            <a giBreadcrumbLink [routerLink]="section.url()">{{ section.heading() }}</a>
          </li>
        }
        <li giBreadcrumbItem>
          <a giBreadcrumbLink [routerLink]="[]" current [attr.lang]="headingLang()">{{ heading() }}</a>
        </li>
      </gi-breadcrumbs>

      <gi-grid container [columns]="{ base: 4, md: 8, lg: 12 }" [gap]="8">
        <gi-grid [size]="section ? { base: 4, md: 8, lg: 8 } : { base: 4, md: 8, lg: 12 }">
          <article giStack direction="column" [gap]="10" align="stretch">
            <gi-stack direction="column" [gap]="4">
              <h1 giHeading size="lg" [attr.lang]="headingLang()">{{ heading() }}</h1>
              <p giParagraph size="lg">{{ lead() }}</p>
            </gi-stack>
            <ng-content />
          </article>
        </gi-grid>

        @if (section) {
          <gi-grid [size]="{ base: 4, md: 8, lg: 4 }" class="hidden lg:block">
            <nav giStack direction="column" [gap]="4" aria-labelledby="on-this-page" class="lg:sticky lg:top-6">
              <h2 giHeading size="xs" id="on-this-page">On this page</h2>
              <ul class="space-y-2">
                @for (part of sections(); track part.anchor()) {
                  <li>
                    <a giLink [routerLink]="[]" [fragment]="part.anchor()">{{ part.heading() }}</a>
                  </li>
                }
              </ul>
            </nav>
          </gi-grid>
        }
      </gi-grid>
    </gi-stack>
  `,
})
export class Page {
  protected readonly section = inject(SectionLayout, { optional: true });

  readonly heading = input.required<string>();
  readonly headingLang = input<string>();
  readonly lead = input.required<string>();

  protected readonly sections = contentChildren(PageSection, { descendants: true });
}
