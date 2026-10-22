import { Component, Directive, Input } from '@angular/core';
import CoreHeaderNavItem, { type Props } from '../atoms/header/HeaderNavItem';
import { getVisibility } from '../atoms/header/HeaderNavItem.styles';

@Component({
  selector: 'gi-header-nav-item',
  standalone: true,
  imports: [CoreHeaderNavItem],
  template: `
    <core-header-nav-item [visible]="visible" [className]="class" [styles]="style">
      <ng-content />
    </core-header-nav-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.class]': 'null',
    '[attr.style]': 'null',
  },
})
export class GiHeaderNavItem {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() visible: Props['visible'] = true;
}

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
