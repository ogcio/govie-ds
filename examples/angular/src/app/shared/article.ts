import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  GiBreadcrumbItemDirective,
  GiBreadcrumbLinkDirective,
  GiBreadcrumbs,
  GiContainer,
  GiDividerDirective,
  GiGrid,
  GiH1Directive,
  GiLinkDirective,
  GiParagraphDirective,
  GiStack,
  GiStackDirective,
  GiTextDirective,
} from '@ogcio/design-system-angular';
import { ArrowLeftIcon } from '@ogcio/design-system-angular/icons';

@Component({
  selector: 'app-article',
  imports: [
    DatePipe,
    RouterLink,
    GiBreadcrumbs,
    GiBreadcrumbItemDirective,
    GiBreadcrumbLinkDirective,
    GiContainer,
    GiGrid,
    GiStack,
    GiStackDirective,
    GiH1Directive,
    GiParagraphDirective,
    GiTextDirective,
    GiLinkDirective,
    GiDividerDirective,
    ArrowLeftIcon,
  ],
  template: `
    <gi-container class="py-8 lg:py-12">
      <gi-grid container [columns]="{ base: 4, md: 8, lg: 12 }" [gap]="8">
        <gi-grid [size]="{ base: 4, md: 8, lg: 8 }" class="mx-auto min-w-0">
          <gi-stack direction="column" [gap]="8" align="stretch">
            <gi-breadcrumbs ariaLabel="Breadcrumb">
              <li giBreadcrumbItem><a giBreadcrumbLink routerLink="/">Home</a></li>
              <li giBreadcrumbItem><a giBreadcrumbLink routerLink="/news">News</a></li>
              <li giBreadcrumbItem class="min-w-0">
                <a giBreadcrumbLink [routerLink]="[]" current>{{ heading() }}</a>
              </li>
            </gi-breadcrumbs>

            <article giStack direction="column" [gap]="10" align="stretch">
              <gi-stack direction="column" [gap]="4">
                <span giText size="sm" class="text-color-text-system-neutral-muted">
                  Press release · <time [attr.datetime]="date()">{{ date() | date: 'd MMMM y' }}</time>
                </span>
                <h1 giHeading size="lg">{{ heading() }}</h1>
                <p giParagraph size="lg">{{ lead() }}</p>
              </gi-stack>
              <ng-content />
            </article>

            <hr giDivider />
            <a giLink routerLink="/news" class="self-start inline-flex items-center gap-1 font-bold">
              <gi-arrow-left-icon [size]="20" />
              All news
            </a>
          </gi-stack>
        </gi-grid>
      </gi-grid>
    </gi-container>
  `,
})
export class Article {
  readonly heading = input.required<string>();
  readonly date = input.required<string>();
  readonly lead = input.required<string>();
}
