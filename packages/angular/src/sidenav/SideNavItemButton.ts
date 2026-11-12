import { booleanAttribute, Component, Directive, EventEmitter, Input, Output } from '@angular/core';
import CoreSideNavItem from '../atoms/sidenav/SideNavItem';
import CoreSideNavItemButton, { type Props } from '../atoms/sidenav/SideNavItemButton';
import CoreSideNavItemAction from '../atoms/sidenav/SideNavItemAction';
import classes from '../atoms/sidenav/SideNavItem.styles';

@Component({
  selector: 'gi-side-nav-item-button',
  standalone: true,
  imports: [CoreSideNavItem, CoreSideNavItemButton, CoreSideNavItemAction],
  template: `
    <core-side-nav-item>
      <core-side-nav-item-button
        [className]="class"
        [styles]="style"
        [id]="id"
        [selected]="selected"
        [disabled]="disabled"
        [ariaCurrent]="ariaCurrent"
        [ariaLabel]="ariaLabel"
        [ariaHidden]="ariaHidden || undefined"
        [tabIndex]="tabIndex"
        [dataTestId]="dataTestId"
        (onClick)="itemClick.emit($event)"
      >
        <ng-content />
      </core-side-nav-item-button>
      <core-side-nav-item-action>
        <ng-content select="[actions]" />
      </core-side-nav-item-action>
    </core-side-nav-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.selected]': 'null',
    '[attr.disabled]': 'null',
    '[attr.ariacurrent]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.ariahidden]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiSideNavItemButton {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ transform: booleanAttribute }) selected = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() id: Props['id'];
  @Input() ariaCurrent: Props['ariaCurrent'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input({ transform: booleanAttribute }) ariaHidden = false;
  @Input() tabIndex: Props['tabIndex'];
  @Input() dataTestId: Props['dataTestId'];

  @Output() itemClick = new EventEmitter<MouseEvent>();
}

@Directive({
  selector: 'button[giSideNavButton]',
  standalone: true,
  host: {
    '[class]': 'classes',
    '[disabled]': 'disabled',
    '[attr.type]': '"button"',
  },
})
export class GiSideNavButtonDirective {
  @Input({ transform: booleanAttribute }) selected = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  get classes(): string {
    return classes({ selected: this.selected, disabled: this.disabled });
  }
}
