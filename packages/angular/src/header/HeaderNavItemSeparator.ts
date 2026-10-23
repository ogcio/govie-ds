import { Component, Input } from '@angular/core';
import CoreHeaderNavItemSeparator, { type Props } from '../atoms/header/HeaderNavItemSeparator';

@Component({
  selector: 'gi-header-nav-item-separator',
  standalone: true,
  imports: [CoreHeaderNavItemSeparator],
  template: `
    <core-header-nav-item-separator
      [visible]="visible"
      [className]="class"
      [styles]="style"
      [id]="id"
      [dataTestId]="dataTestId"
    />
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderNavItemSeparator {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() visible: Props['visible'] = true;
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
