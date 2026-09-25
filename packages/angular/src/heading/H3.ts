import { Component, Input } from '@angular/core';
import classes, { getSize } from '../atoms/heading/styles';
import { Size, type Props } from '../atoms/heading/types';

@Component({
  selector: 'gi-h3',
  standalone: true,
  template: `
    <h3 [class]="classes" [attr.style]="style" [attr.id]="id" [attr.data-testid]="dataTestId">
      <ng-content></ng-content>
    </h3>
  `,
  styles: [':host { display: contents; }'],
})
export class GiH3 {
  @Input() class = '';
  @Input() style?: string;
  @Input() size: Props['size'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];

  get classes(): string {
    return classes({ size: getSize(this.size, Size.MD), className: this.class });
  }
}
