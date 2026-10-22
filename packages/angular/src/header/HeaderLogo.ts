import { Component, Input } from '@angular/core';
import CoreHeaderLogo, { type Props } from '../atoms/header/HeaderLogo';

@Component({
  selector: 'gi-header-logo',
  standalone: true,
  imports: [CoreHeaderLogo],
  template: `
    <core-header-logo [className]="class" [styles]="style" [id]="id" [dataTestId]="dataTestId">
      <ng-content />
    </core-header-logo>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderLogo {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
