import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import classes from './atoms/IconButton.styles';
import type { Props } from './atoms/IconButton';
import { getAppearance, getVariant } from './atoms/Button.styles';
import { getSize } from './atoms/utilities';

@Component({
  selector: 'gi-icon-button',
  standalone: true,
  template: `
    <button
      [class]="classes"
      [attr.style]="style"
      [attr.id]="id"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-haspopup]="ariaHasPopup"
      [attr.aria-controls]="ariaControls"
      [attr.aria-busy]="ariaBusy"
      [attr.role]="role"
      [attr.type]="type"
      [attr.form]="form"
      [attr.tabindex]="tabIndex"
      [attr.data-testid]="dataTestId"
    >
      <ng-content />
    </button>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.style]': 'null',
    '[attr.role]': 'null',
    '[attr.arialabel]': 'null',
    '[attr.arialabelledby]': 'null',
    '[attr.ariadescribedby]': 'null',
    '[attr.ariaexpanded]': 'null',
    '[attr.ariapressed]': 'null',
    '[attr.ariahaspopup]': 'null',
    '[attr.ariacontrols]': 'null',
    '[attr.ariabusy]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiIconButton {
  @Input() class = '';
  @Input() style?: string;
  @Input() variant: Props['variant'];
  @Input() appearance: Props['appearance'];
  @Input() size: Props['size'];
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() id: Props['id'];
  @Input() ariaLabel: Props['ariaLabel'];
  @Input() ariaLabelledBy: Props['ariaLabelledBy'];
  @Input() ariaDescribedBy: Props['ariaDescribedBy'];
  @Input() ariaExpanded: Props['ariaExpanded'];
  @Input() ariaPressed: Props['ariaPressed'];
  @Input() ariaHasPopup: Props['ariaHasPopup'];
  @Input() ariaControls: Props['ariaControls'];
  @Input() ariaBusy: Props['ariaBusy'];
  @Input() role: Props['role'];
  @Input() type: Props['type'];
  @Input() form: Props['form'];
  @Input() tabIndex: Props['tabIndex'];
  @Input() dataTestId: Props['dataTestId'];

  get classes(): string {
    return classes({
      variant: getVariant(this.variant),
      appearance: getAppearance(this.appearance),
      size: getSize(this.size),
      disabled: this.disabled,
      className: this.class,
    });
  }
}

@Directive({
  selector: 'button[giIconButton]',
  standalone: true,
  host: {
    '[class]': 'classes',
    '[disabled]': 'disabled',
  },
})
export class GiIconButtonDirective {
  @Input() variant: Props['variant'];
  @Input() appearance: Props['appearance'];
  @Input() size: Props['size'];
  @Input({ transform: booleanAttribute }) disabled = false;

  get classes(): string {
    return classes({
      variant: getVariant(this.variant),
      appearance: getAppearance(this.appearance),
      size: getSize(this.size),
      disabled: this.disabled,
    });
  }
}
