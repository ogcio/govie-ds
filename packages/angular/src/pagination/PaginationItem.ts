import { Directive, Input } from '@angular/core';
import type { Props } from '../atoms/pagination/PaginationItem';

@Directive({
  selector: 'li[giPaginationItem]',
  standalone: true,
  host: {
    '[attr.aria-hidden]': 'ariaHidden || undefined',
  },
})
export class GiPaginationItemDirective {
  @Input() ariaHidden: Props['ariaHidden'];
}
