import { Component } from '@angular/core';
import { GiInsetTextDirective, GiParagraphDirective, GiTextDirective } from '@ogcio/design-system-angular';
import { PageSection } from '../../shared/page-section';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-about-overview',
  imports: [GiInsetTextDirective, GiParagraphDirective, GiTextDirective, Page, PageSection],
  template: `
    <app-page
      heading="About us"
      lead="The Department of Engagement helps the public service deliver digital services that people recognise, trust and can use without help."
    >
      <app-page-section anchor="mission" heading="Our mission">
        <p giParagraph>
          We believe that every person in Ireland deserves public services that are simple, accessible and consistent,
          whichever department provides them.
        </p>
        <p giParagraph>
          We work with public bodies to adopt the Government of Ireland Design System, to raise the quality of their
          services and to share what works across government.
        </p>
      </app-page-section>

      <app-page-section anchor="what-we-do" heading="What we do">
        <ul class="list-disc pl-6 space-y-2">
          <li><span giText>Support departments in moving their services to the Design System</span></li>
          <li><span giText>Set and assure standards for government digital services</span></li>
          <li><span giText>Champion accessibility and the use of plain language</span></li>
          <li><span giText>Bring delivery teams together to share knowledge</span></li>
        </ul>
      </app-page-section>

      <app-page-section anchor="demonstration" heading="A demonstration department">
        <blockquote giInsetText>
          <p giParagraph>
            The Department of Engagement is fictional. This website demonstrates how a department website looks and
            works when it is built with the Government of Ireland Design System for Angular.
          </p>
        </blockquote>
      </app-page-section>
    </app-page>
  `,
})
export class AboutOverview {}
