import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import CoreStack, { type Props } from './atoms/Stack';
import classes, { getDirectionClasses, getGapClasses } from './atoms/Stack.styles';
import { getAlignItems, getJustify } from './atoms/utilities';

@Component({
  selector: 'gi-stack',
  standalone: true,
  imports: [CoreStack],
  template: `
    <core-stack
      [direction]="direction"
      [gap]="gap"
      [align]="align"
      [justify]="justify"
      [wrap]="wrap"
      [className]="class"
      [styles]="style"
      [id]="id"
      [role]="role"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [dataTestId]="dataTestId"
    >
      <ng-content></ng-content>
    </core-stack>
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
export class GiStack {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input() direction: Props['direction'];
  @Input() gap: Props['gap'];
  @Input() align: Props['align'];
  @Input() justify: Props['justify'];
  @Input({ transform: booleanAttribute }) wrap = false;
  @Input() id: Props['id'];
  @Input() role: Props['role'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: '[giStack]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiStackDirective {
  @Input() direction: Props['direction'];
  @Input() gap: Props['gap'];
  @Input() align: Props['align'];
  @Input() justify: Props['justify'];
  @Input({ transform: booleanAttribute }) wrap = false;

  get classes(): string {
    return classes({
      align: getAlignItems(this.align),
      justify: getJustify(this.justify),
      wrap: this.wrap,
      className: [getDirectionClasses(this.direction), getGapClasses(this.gap)],
    });
  }
}
