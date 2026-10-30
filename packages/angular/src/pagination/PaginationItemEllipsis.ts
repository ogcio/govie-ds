import { Component, Input } from '@angular/core';
import CorePaginationEllipsis, { type Props } from '../atoms/pagination/PaginationEllipsis';
import CorePaginationItem from '../atoms/pagination/PaginationItem';

@Component({
  selector: 'gi-pagination-item-ellipsis',
  standalone: true,
  imports: [CorePaginationEllipsis, CorePaginationItem],
  template: `
    <core-pagination-item [styles]="style" [ariaHidden]="!label || undefined">
      <core-pagination-ellipsis
        [id]="id"
        [className]="class"
        [size]="size"
        [color]="color"
        [label]="label"
        [dataTestId]="dataTestId"
      />
    </core-pagination-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.id]': 'null',
    '[attr.size]': 'null',
    '[attr.color]': 'null',
    '[attr.label]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiPaginationItemEllipsis {
  @Input() class = '';
  @Input() style: Record<string, string> | undefined;
  @Input() id: Props['id'];
  @Input() size: Props['size'];
  @Input() color: Props['color'];
  @Input() label: Props['label'];
  @Input() dataTestId: Props['dataTestId'];
}
