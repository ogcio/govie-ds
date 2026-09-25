import { Component, Directive, Input } from '@angular/core';
import classes, { getSize } from '../atoms/heading/styles';
import { Size, type Props } from '../atoms/heading/types';

@Component({
  selector: 'gi-h4',
  standalone: true,
  template: `
    <h4 [class]="classes" [attr.style]="style" [attr.id]="id" [attr.data-testid]="dataTestId">
      <ng-content></ng-content>
    </h4>
  `,
  styles: [':host { display: contents; }'],
})
export class GiH4 {
  @Input() class = '';
  @Input() style?: string;
  @Input() size: Props['size'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.SM), className: this.class });
  }
}

@Directive({
  selector: 'h4[giHeading]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiH4Directive {
  @Input() size: Props['size'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.SM) });
  }
}
