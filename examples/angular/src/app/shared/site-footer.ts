import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  GiDividerDirective,
  GiFooter,
  GiFooterLogo,
  GiFooterSection,
  GiGrid,
  GiH2Directive,
  GiLinkDirective,
  GiParagraphDirective,
  GiStack,
  GiTextDirective,
} from '@ogcio/design-system-angular';
import { LogoGoldGreen } from '@ogcio/design-system-angular/logos';

@Component({
  selector: 'app-site-footer',
  imports: [
    RouterLink,
    GiFooter,
    GiFooterSection,
    GiFooterLogo,
    GiGrid,
    GiStack,
    GiH2Directive,
    GiDividerDirective,
    GiLinkDirective,
    GiParagraphDirective,
    GiTextDirective,
    LogoGoldGreen,
  ],
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();
}
