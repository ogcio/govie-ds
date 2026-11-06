import { Component, Input } from '@angular/core';
import CoreSideNav, { type Props } from '../atoms/sidenav/SideNav';

@Component({
  selector: 'gi-side-nav',
  standalone: true,
  imports: [CoreSideNav],
  template: `
    <core-side-nav
      [className]="class"
      [styles]="style"
      [id]="id"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [dataTestId]="dataTestId"
    >
      <ng-content />
    </core-side-nav>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.arialabelledby]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiSideNav {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() dataTestId: Props['dataTestId'];
}
