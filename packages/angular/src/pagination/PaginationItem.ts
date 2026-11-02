import { Directive } from '@angular/core';

/**  
 Directive is empty to follow the same architectural pattern for all Navigation components
*/
@Directive({
  selector: 'li[giPaginationItem]',
  standalone: true,
})
export class GiPaginationItemDirective {}
