import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  GiContainer,
  GiH1Directive,
  GiLinkDirective,
  GiParagraphDirective,
  GiStackDirective,
} from '@ogcio/design-system-angular';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, GiContainer, GiStackDirective, GiH1Directive, GiParagraphDirective, GiLinkDirective],
  template: `
    <gi-container class="py-12 md:py-16">
      <div giStack direction="column" [gap]="4" class="max-w-prose">
        <h1 giHeading size="lg">Page not found</h1>
        <p giParagraph>If you typed the web address, check it is correct.</p>
        <p giParagraph>If you pasted the web address, check you copied the entire address.</p>
        <p giParagraph>
          You can go to the <a giLink routerLink="/">homepage</a> or <a giLink routerLink="/contact">contact us</a> if
          you need help.
        </p>
      </div>
    </gi-container>
  `,
})
export class NotFound {}
