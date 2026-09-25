import { Component, Directive, Input } from '@angular/core';
import classes from './atoms/InsetText.styles';
import type { Props } from './atoms/InsetText';

@Component({
  selector: 'gi-inset-text',
  standalone: true,
  template: `
    <blockquote
      [class]="classes"
      [attr.style]="style"
      [attr.id]="id"
      [attr.cite]="cite"
      [attr.aria-describedby]="describedBy || undefined"
      [attr.aria-labelledby]="labelledBy || undefined"
    >
      <ng-content></ng-content>
    </blockquote>
  `,
  styles: [':host { display: contents; }'],
})
export class GiInsetText {
  @Input() class = '';
  @Input() style?: string;
  @Input() cite: Props['cite'];
  @Input() id: Props['id'];
  @Input() describedBy: Props['describedBy'];
  @Input() labelledBy: Props['labelledBy'];

  get classes(): string {
    return classes({ className: this.class });
  }
}

@Directive({
  selector: 'blockquote[giInsetText]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiInsetTextDirective {
  get classes(): string {
    return classes();
  }
}
