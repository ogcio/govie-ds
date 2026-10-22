import { Component, Input } from '@angular/core';
import CoreBreadcrumbEllipsis, { type Props } from '../atoms/breadcrumbs/BreadcrumbEllipsis';

@Component({
  selector: 'gi-breadcrumb-ellipsis',
  standalone: true,
  imports: [CoreBreadcrumbEllipsis],
  template: `
    <core-breadcrumb-ellipsis
      [className]="class"
      [styles]="style"
      [id]="id"
      [size]="size"
      [color]="color"
      [dataTestId]="dataTestId"
    />
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.size]': 'null',
    '[attr.color]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiBreadcrumbEllipsis {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() size: Props['size'];
  @Input() color: Props['color'];
  @Input() dataTestId: Props['dataTestId'];
}
