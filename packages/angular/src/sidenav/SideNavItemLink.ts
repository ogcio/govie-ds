import { booleanAttribute, Component, Directive, EventEmitter, Input, Output } from '@angular/core';
import CoreSideNavItemLink, { type Props } from '../atoms/sidenav/SideNavItemLink';
import sideNavItemClasses from '../atoms/sidenav/SideNavItem.styles';

@Component({
  selector: 'gi-side-nav-item-link',
  standalone: true,
  imports: [CoreSideNavItemLink],
  template: `
    <core-side-nav-item-link
      [href]="href"
      [className]="class"
      [styles]="style"
      [selected]="selected"
      [external]="external"
      [target]="target"
      [rel]="rel"
      [download]="download"
      [id]="id"
      [ariaCurrent]="ariaCurrent"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [ariaDescribedBy]="ariaDescribedBy"
      [ariaHidden]="ariaHidden || undefined"
      [tabIndex]="tabIndex"
      [lang]="lang"
      [dataTestId]="dataTestId"
      (onClick)="itemClick.emit($event)"
    >
      <ng-content />
      <ng-container ngProjectAs="[actions]">
        <ng-content select="[actions]" />
      </ng-container>
    </core-side-nav-item-link>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.href]': 'null',
    '[attr.target]': 'null',
    '[attr.rel]': 'null',
    '[attr.download]': 'null',
    '[attr.lang]': 'null',
    '[attr.external]': 'null',
    '[attr.selected]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.arialabelledby]': 'null',
    '[attr.ariadescribedby]': 'null',
    '[attr.ariacurrent]': 'null',
    '[attr.ariahidden]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiSideNavItemLink {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ required: true }) href!: Props['href'];
  @Input({ transform: booleanAttribute }) selected = false;
  @Input({ transform: booleanAttribute }) external = false;
  @Input() target: Props['target'];
  @Input() rel: Props['rel'];
  @Input() download: Props['download'];
  @Input() id: Props['id'];
  @Input() ariaCurrent: Props['ariaCurrent'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() ariaDescribedBy: Props['ariaDescribedBy'];
  @Input({ transform: booleanAttribute }) ariaHidden = false;
  @Input() tabIndex: Props['tabIndex'];
  @Input() lang: Props['lang'];
  @Input() dataTestId: Props['dataTestId'];

  @Output() itemClick = new EventEmitter<MouseEvent>();
}

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
