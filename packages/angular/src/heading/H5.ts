import { Component, Directive, Input } from '@angular/core';
import classes, { getSize } from '../atoms/heading/styles';
import { Size, type Props } from '../atoms/heading/types';

@Component({
  selector: 'gi-h5',
  standalone: true,
  template: `
    <h5 [class]="classes" [attr.style]="style" [attr.id]="id" [attr.data-testid]="dataTestId">
      <ng-content></ng-content>
    </h5>
  `,
  styles: [':host { display: contents; }'],
})
export class GiH5 {
  @Input() class = '';
  @Input() style?: string;
  @Input() size: Props['size'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.XS), className: this.class });
  }
}

@Directive({
  selector: 'h5[giHeading]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiH5Directive {
  @Input() size: Props['size'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.XS) });
  }
}
