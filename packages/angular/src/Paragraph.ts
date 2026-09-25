import { Component, Directive, Input } from '@angular/core';
import classes from './atoms/Paragraph.styles';
import type { Props } from './atoms/Paragraph';
import { getAlign, getSize, getWhitespace } from './atoms/utilities';

@Component({
  selector: 'gi-paragraph',
  standalone: true,
  template: `
    <p
      [class]="classes"
      [attr.style]="style"
      [attr.id]="id"
      [attr.data-testid]="dataTestId"
      [attr.aria-hidden]="ariaHidden"
    >
      <ng-content></ng-content>
    </p>
  `,
  styles: [':host { display: contents; }'],
})
export class GiParagraph {
  @Input() class = '';
  @Input() style?: string;
  @Input() size: Props['size'];
  @Input() align: Props['align'];
  @Input() whitespace: Props['whitespace'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
  @Input() ariaHidden: Props['ariaHidden'];

  get classes(): string {
    return classes({
      size: getSize(this.size),
      align: getAlign(this.align),
      whitespace: getWhitespace(this.whitespace),
      className: this.class,
    });
  }
}

@Directive({
  selector: 'p[giParagraph]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiParagraphDirective {
  @Input() size: Props['size'];
  @Input() align: Props['align'];
  @Input() whitespace: Props['whitespace'];

  get classes(): string {
    return classes({
      size: getSize(this.size),
      align: getAlign(this.align),
      whitespace: getWhitespace(this.whitespace),
    });
  }
}
