import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import classes from './atoms/Link.styles';
import type { Props } from './atoms/Link';
import { downloadAttribute } from './utils';

@Component({
  selector: 'gi-link',
  standalone: true,
  template: `
    <a
      [class]="classes"
      [attr.style]="style"
      [attr.id]="id"
      [attr.href]="href"
      [attr.target]="target ?? (external ? '_blank' : undefined)"
      [attr.rel]="rel ?? (external ? 'noreferrer noopener' : undefined)"
      [attr.download]="download"
      [attr.aria-current]="ariaCurrent"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-hidden]="ariaHidden || undefined"
      [attr.tabindex]="ariaHidden ? -1 : tabIndex"
      [attr.lang]="lang"
      [attr.data-testid]="dataTestId"
    >
      <ng-content />
    </a>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.arialabelledby]': 'null',
    '[attr.ariadescribedby]': 'null',
    '[attr.ariacurrent]': 'null',
    '[attr.ariahidden]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiLink {
  @Input() class = '';
  @Input() style?: string;
  @Input({ required: true }) href!: Props['href'];
  @Input() variant: Props['variant'];
  @Input() underline: Props['underline'];
  @Input() appearance: Props['appearance'];
  @Input() visited: Props['visited'];
  @Input({ transform: booleanAttribute }) external = false;
  @Input() target: Props['target'];
  @Input() rel: Props['rel'];
  @Input({ transform: downloadAttribute }) download?: string;
  @Input() id: Props['id'];
  @Input() ariaCurrent: Props['ariaCurrent'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() ariaDescribedBy: Props['ariaDescribedBy'];
  @Input({ transform: booleanAttribute }) ariaHidden = false;
  @Input() tabIndex: Props['tabIndex'];
  @Input() lang: Props['lang'];
  @Input() dataTestId: Props['dataTestId'];

  get classes(): string {
    return classes({
      variant: this.variant,
      underline: this.underline,
      appearance: this.appearance,
      visited: this.visited,
      className: this.class,
    });
  }
}

@Directive({
  selector: 'a[giLink]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiLinkDirective {
  @Input() variant: Props['variant'];
  @Input() underline: Props['underline'];
  @Input() appearance: Props['appearance'];
  @Input() visited: Props['visited'];

  get classes(): string {
    return classes({
      variant: this.variant,
      underline: this.underline,
      appearance: this.appearance,
      visited: this.visited,
    });
  }
}
