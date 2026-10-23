import { Component, Input } from '@angular/core';
import CoreBreadcrumbs, { type Props } from '../atoms/breadcrumbs/Breadcrumbs';

@Component({
  selector: 'gi-breadcrumbs',
  standalone: true,
  imports: [CoreBreadcrumbs],
  template: `
    <core-breadcrumbs
      [className]="class"
      [styles]="style"
      [id]="id"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [dataTestId]="dataTestId"
    >
      <ng-content></ng-content>
    </core-breadcrumbs>
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
export class GiBreadcrumbs {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() dataTestId: Props['dataTestId'];
}
