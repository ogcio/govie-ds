import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import CoreHeaderNavItem, { type Props as ItemProps } from '../atoms/header/HeaderNavItem';
import CoreHeaderNavItemLink, { type Props } from '../atoms/header/HeaderNavItemLink';
import { linkClasses } from '../atoms/header/HeaderNavItem.styles';

@Component({
  selector: 'gi-header-nav-item-link',
  standalone: true,
  imports: [CoreHeaderNavItem, CoreHeaderNavItemLink],
  template: `
    <core-header-nav-item [visible]="visible">
      <core-header-nav-item-link
        [href]="href"
        [className]="class"
        [styles]="style"
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
      >
        <ng-content />
      </core-header-nav-item-link>
    </core-header-nav-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.visible]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.arialabelledby]': 'null',
    '[attr.ariadescribedby]': 'null',
    '[attr.ariacurrent]': 'null',
    '[attr.ariahidden]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderNavItemLink {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() visible: ItemProps['visible'] = true;
  @Input({ required: true }) href!: Props['href'];
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
}

@Directive({
  selector: 'a[giHeaderNavLink]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiHeaderNavLinkDirective {
  readonly classes = linkClasses();
}
