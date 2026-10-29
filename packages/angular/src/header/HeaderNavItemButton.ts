import { Component, Directive, Input } from '@angular/core';
import CoreHeaderNavItem, { type Props as ItemProps } from '../atoms/header/HeaderNavItem';
import CoreHeaderNavItemButton, { type Props } from '../atoms/header/HeaderNavItemButton';
import { buttonClasses } from '../atoms/header/HeaderNavItem.styles';

@Component({
  selector: 'gi-header-nav-item-button',
  standalone: true,
  imports: [CoreHeaderNavItem, CoreHeaderNavItemButton],
  template: `
    <core-header-nav-item [visible]="visible">
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
    </core-header-nav-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.visible]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.ariaexpanded]': 'null',
    '[attr.ariacontrols]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderNavItemButton {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() visible: ItemProps['visible'] = true;
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaExpanded: Props['ariaExpanded'];
  @Input() ariaControls: Props['ariaControls'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: 'button[giHeaderNavButton]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiHeaderNavButtonDirective {
  readonly classes = buttonClasses();
}
