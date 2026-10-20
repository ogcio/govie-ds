import { Component, Input } from '@angular/core';
import CoreFooterLogo, { type Props } from '../atoms/footer/FooterLogo';

@Component({
  selector: 'gi-footer-logo',
  standalone: true,
  imports: [CoreFooterLogo],
  template: `
    <core-footer-logo [className]="class" [styles]="style" [id]="id" [dataTestId]="dataTestId">
      <ng-content></ng-content>
    </core-footer-logo>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiFooterLogo {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
