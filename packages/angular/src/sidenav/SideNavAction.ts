import { Directive } from '@angular/core';
import { actionClasses } from '../atoms/sidenav/SideNavItem.styles';

@Directive({
  selector: '[giSideNavAction]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiSideNavActionDirective {
  readonly classes = actionClasses();
}
