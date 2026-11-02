import { Component, Input } from '@angular/core';
import CorePagination, { type Props } from '../atoms/pagination/Pagination';

@Component({
  selector: 'gi-pagination',
  standalone: true,
  imports: [CorePagination],
  template: `
    <core-pagination
      [className]="class"
      [styles]="style"
      [id]="id"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [dataTestId]="dataTestId"
    >
      <ng-content />
    </core-pagination>
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
export class GiPagination {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() dataTestId: Props['dataTestId'];
}
