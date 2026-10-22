import { Component, Directive, Input } from '@angular/core';
import CoreHeaderNavItemButton, { type Props } from '../atoms/header/HeaderNavItemButton';
import { buttonClasses } from '../atoms/header/HeaderNavItem.styles';

@Component({
  selector: 'gi-header-nav-item-button',
  standalone: true,
  imports: [CoreHeaderNavItemButton],
  template: `
    <core-header-nav-item-button
      [className]="class"
      [styles]="style"
      [id]="id"
      [ariaLabel]="ariaLabel"
      [ariaExpanded]="ariaExpanded"
      [ariaControls]="ariaControls"
      [dataTestId]="dataTestId"
    >
      <ng-content />
    </core-header-nav-item-button>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.ariaexpanded]': 'null',
    '[attr.ariacontrols]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderNavItemButton {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaExpanded: Props['ariaExpanded'];
  @Input() ariaControls: Props['ariaControls'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: 'button[giHeaderNavItemButton]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiHeaderNavItemButtonDirective {
  readonly classes = buttonClasses();
}
