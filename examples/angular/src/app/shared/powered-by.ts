import { Component } from '@angular/core';
import { GiTextDirective } from '@ogcio/design-system-angular';

@Component({
  selector: 'app-powered-by',
  imports: [GiTextDirective],
  host: { class: 'flex' },
  template: `
    <span giText size="sm" class="inline-flex items-center gap-2">
      <svg viewBox="0 0 250 250" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M125 30 31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1L125 30Zm0 22.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1Zm17 83.3h-34l17-40.9 17 40.9Z"
        />
      </svg>
      <span>
        Powered by
        <strong>Design System Angular</strong>
      </span>
    </span>
  `,
})
export class PoweredBy {}
