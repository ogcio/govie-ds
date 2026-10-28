import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import classes from '../atoms/pagination/PaginationButton.styles';
import CorePaginationLink, { type Props } from '../atoms/pagination/PaginationLink';
import CorePaginationItem from '../atoms/pagination/PaginationItem';

@Component({
  selector: 'gi-pagination-item-link',
  standalone: true,
  imports: [CorePaginationLink, CorePaginationItem],
  template: `
    <core-pagination-item>
      <core-pagination-link
        [current]="current"
        [href]="href"
        [id]="id"
        [className]="class"
        [styles]="style"
        [ariaLabel]="ariaLabel"
        [dataTestId]="dataTestId"
      >
        <ng-content />
      </core-pagination-link>
    </core-pagination-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.current]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiPaginationItemLink {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ required: true }) href!: Props['href'];
  @Input({ transform: booleanAttribute }) current = false;
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: 'a[giPaginationLink]',
  standalone: true,
  host: {
    '[class]': 'classes',
    '[attr.aria-current]': "current ? 'page' : undefined",
  },
})
export class GiPaginationLinkDirective {
  @Input({ transform: booleanAttribute }) current = false;

  get classes(): string {
    return classes({ variant: this.current ? 'primary' : 'flat' });
  }
}
