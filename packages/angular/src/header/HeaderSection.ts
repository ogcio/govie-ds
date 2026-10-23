import { Component, Input } from '@angular/core';
import CoreHeaderSection, { type Props } from '../atoms/header/HeaderSection';

@Component({
  selector: 'gi-header-section',
  standalone: true,
  imports: [CoreHeaderSection],
  template: `
    <core-header-section
      [variant]="variant"
      [appearance]="appearance"
      [maxWidth]="maxWidth"
      [className]="class"
      [styles]="style"
      [id]="id"
      [role]="role"
      [ariaLabel]="ariaLabel"
      [dataTestId]="dataTestId"
    >
      <ng-content />
    </core-header-section>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.role]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiHeaderSection {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() variant: Props['variant'];
  @Input() appearance: Props['appearance'];
  @Input() maxWidth: Props['maxWidth'];
  @Input() id: Props['id'];
  @Input() role: Props['role'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() dataTestId: Props['dataTestId'];
}
