import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import CorePaginationButton, { type Props } from '../atoms/pagination/PaginationButton';
import CorePaginationItem from '../atoms/pagination/PaginationItem';
import classes from '../atoms/pagination/PaginationButton.styles';

@Component({
  selector: 'gi-pagination-item-button',
  imports: [CorePaginationButton, CorePaginationItem],
  standalone: true,
  template: `
    <core-pagination-item>
      <core-pagination-button
        [className]="class"
        [styles]="style"
        [id]="id"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        [current]="current"
        [dataTestId]="dataTestId"
      >
        <ng-content />
      </core-pagination-button>
    </core-pagination-item>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.current]': 'null',
    '[attr.disabled]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiPaginationItemButton {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ transform: booleanAttribute }) current = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: 'button[giPaginationButton]',
  standalone: true,
  host: {
    '[class]': 'classes',
    '[disabled]': 'disabled',
    '[attr.aria-current]': 'current || undefined',
    '[attr.type]': '"button"',
  },
})
export class GiPaginationButtonDirective {
  @Input({ transform: booleanAttribute }) current = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  get classes(): string {
    return classes({ variant: this.current ? 'primary' : 'flat', disabled: this.disabled });
  }
}
