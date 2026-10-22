import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import CoreBreadcrumbLink, { type Props } from '../atoms/breadcrumbs/BreadcrumbLink';
import CoreBreadcrumbItem from '../atoms/breadcrumbs/BreadcrumbItem';
import { breadcrumbClasses as classes } from '../atoms/breadcrumbs/BreadcrumbLink.styles';

@Component({
  selector: 'gi-breadcrumb-item-link',
  standalone: true,
  imports: [CoreBreadcrumbLink, CoreBreadcrumbItem],
  template: `
    <core-breadcrumb-item>
      <core-breadcrumb-link
        [className]="class"
        [href]="href"
        [current]="current"
        [styles]="style"
        [id]="id"
        [ariaLabel]="ariaLabel"
        [dataTestId]="dataTestId"
      >
        <ng-content />
      </core-breadcrumb-link>
    </core-breadcrumb-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.href]': 'null',
    '[attr.current]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiBreadcrumbItemLink {
  @Input() class = '';
  @Input({ required: true }) href!: Props['href'];
  @Input({ transform: booleanAttribute }) current = false;
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: 'a[giBreadcrumbLink]',
  standalone: true,
  host: { '[class]': 'classes', '[attr.aria-current]': 'current ? "page" : undefined' },
})
export class GiBreadcrumbLinkDirective {
  @Input({ transform: booleanAttribute }) current = false;
  get classes(): string {
    return classes();
  }
}
