import { booleanAttribute, Directive, Input } from '@angular/core';
import sideNavItemClasses from '../atoms/sidenav/SideNavItem.styles';

@Directive({
  selector: 'a[giSideNavLink]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiSideNavLinkDirective {
  @Input({ transform: booleanAttribute }) selected = false;

  get classes(): string {
    return sideNavItemClasses({ selected: this.selected });
  }
}
