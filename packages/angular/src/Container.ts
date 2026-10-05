import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import CoreContainer, { type Props } from './atoms/Container';
import classes from './atoms/Container.styles';
import { getMaxWidth } from './atoms/utilities';

@Component({
  selector: 'gi-container',
  standalone: true,
  imports: [CoreContainer],
  template: `
    <core-container
      [inset]="inset"
      [gutters]="gutters"
      [maxWidth]="maxWidth"
      [className]="class"
      [styles]="style"
      [id]="id"
      [role]="role"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [dataTestId]="dataTestId"
    >
      <ng-content></ng-content>
    </core-container>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.role]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.arialabelledby]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiContainer {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ transform: booleanAttribute }) inset = false;
  @Input({ transform: guttersAttribute }) gutters = true;
  @Input() maxWidth: Props['maxWidth'];
  @Input() id: Props['id'];
  @Input() role: Props['role'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: '[giContainer]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiContainerDirective {
  @Input({ transform: booleanAttribute }) inset = false;
  @Input({ transform: guttersAttribute }) gutters = true;
  @Input() maxWidth: Props['maxWidth'];

  get classes(): string {
    return classes({ inset: this.inset, gutters: this.gutters, maxWidth: getMaxWidth(this.maxWidth) });
  }
}

function guttersAttribute(value: unknown): boolean {
  return value === undefined || booleanAttribute(value);
}
