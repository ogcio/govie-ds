import { Directive } from '@angular/core';
import { listItemClasses } from '../atoms/sidenav/SideNavItem.styles';

@Directive({
  selector: 'li[giSideNavItem]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiSideNavItemDirective {
  readonly classes = listItemClasses();
}
