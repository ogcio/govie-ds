import { Component, Input } from '@angular/core';
import CoreHeaderTitle, { type Props } from '../atoms/header/HeaderTitle';

@Component({
  selector: 'gi-header-title',
  standalone: true,
  imports: [CoreHeaderTitle],
  template: `
    <core-header-title [className]="class" [styles]="style" [id]="id" [dataTestId]="dataTestId">
      <ng-content />
    </core-header-title>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderTitle {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
