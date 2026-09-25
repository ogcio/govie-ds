import { Component, Directive, Input } from '@angular/core';
import classes, { getSize } from '../atoms/heading/styles';
import { Size, type Props } from '../atoms/heading/types';

@Component({
  selector: 'gi-h2',
  standalone: true,
  template: `
    <h2 [class]="classes" [attr.style]="style" [attr.id]="id" [attr.data-testid]="dataTestId">
      <ng-content></ng-content>
    </h2>
  `,
  styles: [':host { display: contents; }'],
})
export class GiH2 {
  @Input() class = '';
  @Input() style?: string;
  @Input() size: Props['size'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.LG), className: this.class });
  }
}

@Directive({
  selector: 'h2[giHeading]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiH2Directive {
  @Input() size: Props['size'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.LG) });
  }
}
