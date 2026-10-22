import { Directive } from '@angular/core';
import { listItemClasses } from '../atoms/breadcrumbs/BreadcrumbLink.styles';

@Directive({
  selector: 'li[giBreadcrumbItem]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiBreadcrumbItemDirective {
  get classes(): string {
    return listItemClasses();
  }
}
