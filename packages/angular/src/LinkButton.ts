import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import classes from './atoms/LinkButton.styles';
import type { Props } from './atoms/LinkButton';
import { getAppearance, getSize, getVariant } from './atoms/Button.styles';
import { downloadAttribute } from './utils';

@Component({
  selector: 'gi-link-button',
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
export class GiLinkButton {
  @Input() class = '';
  @Input() style?: string;
  @Input({ required: true }) href!: Props['href'];
  @Input() variant: Props['variant'];
  @Input() appearance: Props['appearance'];
  @Input() size: Props['size'];
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
      variant: getVariant(this.variant),
      appearance: getAppearance(this.appearance),
      size: getSize(this.size),
      className: this.class,
    });
  }
}

@Directive({
  selector: 'a[giButton]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiLinkButtonDirective {
  @Input() variant: Props['variant'];
  @Input() appearance: Props['appearance'];
  @Input() size: Props['size'];

  get classes(): string {
    return classes({
      variant: getVariant(this.variant),
      appearance: getAppearance(this.appearance),
      size: getSize(this.size),
    });
  }
}
