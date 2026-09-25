import { Component, Input } from '@angular/core';
import classes from './atoms/Text.styles';
import type { Props } from './atoms/Text';
import { getSize, getWhitespace } from './atoms/utilities';

@Component({
  selector: 'gi-text',
  standalone: true,
  template: `
    <span
      [class]="classes"
      [attr.style]="style"
      [attr.id]="id"
      [attr.data-testid]="dataTestId"
      [attr.aria-hidden]="ariaHidden"
      ><ng-content></ng-content
    ></span>
  `,
  styles: [':host { display: contents; }'],
})
export class GiText {
  @Input() class = '';
  @Input() style?: string;
  @Input() size: Props['size'];
  @Input() whitespace: Props['whitespace'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
  @Input() ariaHidden: Props['ariaHidden'];

  get classes(): string {
    return classes({
      size: getSize(this.size),
      whitespace: getWhitespace(this.whitespace),
      className: this.class,
    });
  }
}
