import { clsx } from 'clsx';
import {
  isButtonDisabled,
  getSizeClass,
  getVariantAppearanceClass,
} from './helpers.js';
import { ButtonAppearance, ButtonSize, ButtonVariant } from './types.js';
import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'govie-button',
  shadow: false,
})
export class GovieButton {
  @Element() el!: HTMLElement;

  @Prop() variant?: ButtonVariant;
  @Prop() appearance?: ButtonAppearance;
  @Prop() size?: ButtonSize;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ attribute: 'class' }) class?: string;

  private getForwardedAttrs() {
    const excluded = new Set([
      'variant',
      'appearance',
      'size',
      'disabled',
      'class',
    ]);

    const attrs: Record<string, string> = {};
    for (const attr of Array.from(this.el.attributes)) {
      if (!excluded.has(attr.name)) attrs[attr.name] = attr.value;
    }
    return attrs;
  }

  render() {
    const forwarded = this.getForwardedAttrs();

    return (
      <button
        {...forwarded}
        aria-disabled={this.disabled ? 'true' : null}
        disabled={this.disabled}
        class={clsx(
          'gi-btn',
          getVariantAppearanceClass({
            disabled: this.disabled,
            variant: this.variant,
            appearance: this.appearance,
          }),
          isButtonDisabled({
            disabled: this.disabled,
            variant: this.variant,
            appearance: this.appearance,
          }),
          getSizeClass(this.size),
          this.class,
        )}
      >
        <slot></slot>
      </button>
    );
  }
}
