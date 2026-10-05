import { Component, Directive, Input } from '@angular/core';
import CoreDivider, { type Props } from './atoms/Divider';
import classes from './atoms/Divider.styles';
import { getOrientation } from './atoms/utilities';

@Component({
  selector: 'gi-divider',
  standalone: true,
  imports: [CoreDivider],
  template: `
    <core-divider
      [orientation]="orientation"
      [className]="class"
      [styles]="style"
      [id]="id"
      [dataTestId]="dataTestId"
    />
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiDivider {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() orientation: Props['orientation'];
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: 'hr[giDivider]',
  standalone: true,
  host: { '[class]': 'classes', '[attr.aria-orientation]': 'orientationValue' },
})
export class GiDividerDirective {
  @Input() orientation: Props['orientation'];

  get orientationValue() {
    return getOrientation(this.orientation);
  }

  get classes(): string {
    return classes({ orientation: this.orientationValue });
  }
}
