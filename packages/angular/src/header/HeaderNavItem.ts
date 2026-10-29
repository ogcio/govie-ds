import { Directive, Input } from '@angular/core';
import type { Props } from '../atoms/header/HeaderNavItem';
import { getVisibility } from '../atoms/header/HeaderNavItem.styles';

@Directive({
  selector: 'li[giHeaderNavItem]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiHeaderNavItemDirective {
  @Input() visible: Props['visible'] = true;

  get classes(): string {
    return getVisibility(this.visible);
  }
}
