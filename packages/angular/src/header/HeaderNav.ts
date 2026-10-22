import { Component, Input } from '@angular/core';
import CoreHeaderNav, { type Props } from '../atoms/header/HeaderNav';

@Component({
  selector: 'gi-header-nav',
  standalone: true,
  imports: [CoreHeaderNav],
  template: `
    <core-header-nav [ariaLabel]="ariaLabel" [className]="class" [styles]="style" [id]="id" [dataTestId]="dataTestId">
      <ng-content />
    </core-header-nav>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderNav {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ required: true }) ariaLabel!: Props['ariaLabel'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
