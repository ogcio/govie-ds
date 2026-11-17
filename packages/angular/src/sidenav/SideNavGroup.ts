import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import CoreSideNavGroup from '../atoms/sidenav/SideNavGroup';
import CoreSideNavItemButton, { type Props } from '../atoms/sidenav/SideNavItemButton';
@Component({
  selector: 'gi-side-nav-group',
  standalone: true,
  imports: [CoreSideNavGroup, CoreSideNavItemButton],
  template: `
    <core-side-nav-group [open]="open" [listId]="ariaControls" [ariaHidden]="ariaHidden || undefined">
      <core-side-nav-item-button
        trigger
        [className]="class"
        [styles]="style"
        [id]="id"
        [disabled]="disabled"
        [ariaExpanded]="open"
        [ariaControls]="ariaControls"
        [ariaLabel]="ariaLabel"
        [ariaHidden]="ariaHidden || undefined"
        [tabIndex]="tabIndex"
        [dataTestId]="dataTestId"
        (onClick)="openChange.emit(!open)"
      >
        {{ label }}
        <ng-content select="[label]" />
      </core-side-nav-item-button>
      <ng-container ngProjectAs="[actions]">
        <ng-content select="[actions]" />
      </ng-container>
      <ng-content />
    </core-side-nav-group>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.label]': 'null',
    '[attr.open]': 'null',
    '[attr.disabled]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.ariacontrols]': 'null',
    '[attr.ariahidden]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiSideNavGroup {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) open = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaControls: Props['ariaControls'];
  @Input({ transform: booleanAttribute }) ariaHidden = false;
  @Input() tabIndex: Props['tabIndex'];
  @Input() dataTestId: Props['dataTestId'];

  @Output() openChange = new EventEmitter<boolean>();
}
