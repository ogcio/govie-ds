import { Component, Input } from '@angular/core';
import CoreBreadcrumbEllipsis, { type Props } from '../atoms/breadcrumbs/BreadcrumbEllipsis';
import CoreBreadcrumbItem from '../atoms/breadcrumbs/BreadcrumbItem';
@Component({
  selector: 'gi-breadcrumb-item-ellipsis',
  standalone: true,
  imports: [CoreBreadcrumbEllipsis, CoreBreadcrumbItem],
  template: `
    <core-breadcrumb-item [ariaHidden]="!label || undefined" [styles]="style">
      <core-breadcrumb-ellipsis
        [className]="class"
        [id]="id"
        [size]="size"
        [color]="color"
        [dataTestId]="dataTestId"
        [label]="label"
      />
    </core-breadcrumb-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.label]': 'null',
    '[attr.size]': 'null',
    '[attr.color]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiBreadcrumbItemEllipsis {
  @Input() class = '';
  @Input() label: Props['label'];
  @Input() style: Record<string, string> | undefined;
  @Input() id: Props['id'];
  @Input() size: Props['size'];
  @Input() color: Props['color'];
  @Input() dataTestId: Props['dataTestId'];
}
