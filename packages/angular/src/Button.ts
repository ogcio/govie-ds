import { booleanAttribute, Component, Directive, Input } from '@angular/core';
import classes, { getAppearance, getSize, getVariant } from './atoms/Button.styles';
import type { Props } from './atoms/Button';

@Component({
  selector: 'gi-button',
  standalone: true,
  template: `
    <button
      [class]="classes"
      [attr.style]="style"
      [attr.id]="id"
      [attr.data-size]="sizeValue"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-checked]="ariaChecked"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-controls]="ariaControls"
      [attr.aria-haspopup]="ariaHasPopup"
      [attr.aria-busy]="ariaBusy"
      [attr.role]="role"
      [attr.type]="type"
      [attr.form]="form"
      [attr.value]="value"
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
    '[attr.ariachecked]': 'null',
    '[attr.ariapressed]': 'null',
    '[attr.ariaexpanded]': 'null',
    '[attr.ariacontrols]': 'null',
    '[attr.ariahaspopup]': 'null',
    '[attr.ariabusy]': 'null',
    '[attr.tabindex]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiButton {
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
  @Input() ariaChecked: Props['ariaChecked'];
  @Input() ariaPressed: Props['ariaPressed'];
  @Input() ariaExpanded: Props['ariaExpanded'];
  @Input() ariaControls: Props['ariaControls'];
  @Input() ariaHasPopup: Props['ariaHasPopup'];
  @Input() ariaBusy: Props['ariaBusy'];
  @Input() role: Props['role'];
  @Input() type: Props['type'];
  @Input() form: Props['form'];
  @Input() value: Props['value'];
  @Input() tabIndex: Props['tabIndex'];
  @Input() dataTestId: Props['dataTestId'];

  get sizeValue() {
    return getSize(this.size);
  }

  get classes(): string {
    return classes({
      variant: getVariant(this.variant),
      appearance: getAppearance(this.appearance),
      size: this.sizeValue,
      disabled: this.disabled,
      className: this.class,
    });
  }
}

@Directive({
  selector: 'button[giButton]',
  standalone: true,
  host: {
    '[class]': 'classes',
    '[attr.data-size]': 'sizeValue',
    '[disabled]': 'disabled',
  },
})
export class GiButtonDirective {
  @Input() variant: Props['variant'];
  @Input() appearance: Props['appearance'];
  @Input() size: Props['size'];
  @Input({ transform: booleanAttribute }) disabled = false;

  get sizeValue() {
    return getSize(this.size);
  }

  get classes(): string {
    return classes({
      variant: getVariant(this.variant),
      appearance: getAppearance(this.appearance),
      size: this.sizeValue,
      disabled: this.disabled,
    });
  }
}
