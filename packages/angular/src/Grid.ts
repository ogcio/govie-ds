import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import CoreGrid, { type Props } from './atoms/Grid';
import classes from './atoms/Grid.styles';

@Component({
  selector: 'gi-grid',
  standalone: true,
  imports: [CoreGrid],
  template: `
    <core-grid
      [container]="container"
      [columns]="columns"
      [gap]="gap"
      [size]="size"
      [className]="class"
      [styles]="style"
      [id]="id"
      [role]="role"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [dataTestId]="dataTestId"
    >
      <ng-content></ng-content>
    </core-grid>
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
export class GiGrid {
  @Input() class = '';
  @Input() style: Props['styles'];
  @Input({ transform: booleanAttribute }) container = false;
  @Input() columns: Props['columns'];
  @Input() gap: Props['gap'];
  @Input() size: Props['size'];
  @Input() id: Props['id'];
  @Input() role: Props['role'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() dataTestId: Props['dataTestId'];
}

@Directive({
  selector: '[giGrid]',
  standalone: true,
  host: { '[class]': 'classes' },
})
export class GiGridDirective {
  @Input({ transform: booleanAttribute }) container = false;
  @Input() columns: Props['columns'];
  @Input() gap: Props['gap'];
  @Input() size: Props['size'];

  get classes(): string {
    return classes({ container: this.container, columns: this.columns, gap: this.gap, size: this.size });
  }
}
