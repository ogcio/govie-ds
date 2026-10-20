import { Component, Input } from '@angular/core';
import CoreFooterSection, { type Props } from '../atoms/footer/FooterSection';

@Component({
  selector: 'gi-footer-section',
  standalone: true,
  imports: [CoreFooterSection],
  template: `
    <core-footer-section
      [className]="class"
      [variant]="variant"
      [maxWidth]="maxWidth"
      [styles]="style"
      [id]="id"
      [dataTestId]="dataTestId"
    >
      <ng-content></ng-content>
    </core-footer-section>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiFooterSection {
  @Input() class = '';
  @Input() variant: Props['variant'];
  @Input() maxWidth: Props['maxWidth'];
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
