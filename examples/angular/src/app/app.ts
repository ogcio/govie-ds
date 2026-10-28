import { Component } from '@angular/core';
import {
  GiContainer,
  GiFooter,
  GiFooterLogo,
  GiFooterSection,
  GiH1Directive,
  GiHeader,
  GiHeaderLogo,
  GiHeaderSection,
  GiHeaderTitle,
  GiParagraphDirective,
  GiStack,
  GiTextDirective,
} from '@ogcio/design-system-angular';
import { LogoGoldGreen, LogoHarpWhite, LogoWhite } from '@ogcio/design-system-angular/logos';

@Component({
  selector: 'app-root',
  imports: [
    GiContainer,
    GiStack,
    GiHeader,
    GiHeaderSection,
    GiHeaderLogo,
    GiHeaderTitle,
    GiFooter,
    GiFooterSection,
    GiFooterLogo,
    GiH1Directive,
    GiParagraphDirective,
    GiTextDirective,
    LogoWhite,
    LogoHarpWhite,
    LogoGoldGreen,
  ],
  template: `
    <div class="flex min-h-screen flex-col">
      <gi-header ariaLabel="Site header">
        <gi-header-section>
          <gi-header-logo>
            <gi-logo-white [size]="132" className="hidden md:block" />
            <gi-logo-harp-white [size]="32" className="block md:hidden" />
          </gi-header-logo>
          <gi-header-title>Department of Engagement</gi-header-title>
        </gi-header-section>
      </gi-header>

      <main class="flex-1 py-12">
        <gi-container>
          <gi-stack direction="column" [gap]="4">
            <h1 giHeading size="xl">Department of Engagement</h1>
            <p giParagraph size="lg">This website is built with the Government of Ireland Design System for Angular.</p>
          </gi-stack>
        </gi-container>
      </main>

      <gi-footer ariaLabel="Site footer">
        <gi-footer-section variant="primary">
          <gi-stack [direction]="{ base: 'column', md: 'row' }" [gap]="6" justify="between">
            <p giParagraph size="sm">The Department of Engagement is a fictional department.</p>
            <gi-footer-logo>
              <gi-logo-gold-green size="181" label="Government of Ireland" />
            </gi-footer-logo>
          </gi-stack>
        </gi-footer-section>
        <gi-footer-section variant="utility">
          <gi-stack direction="row" justify="center">
            <span giText size="sm" class="text-center">© {{ year }} Department of Engagement</span>
          </gi-stack>
        </gi-footer-section>
      </gi-footer>
    </div>
  `,
})
export class App {
  protected readonly year = new Date().getFullYear();
}
