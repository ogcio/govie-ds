import {
  Component,
  Prop,
  h,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';
import type { ButtonVariant } from '../button/types.js';

@Component({
  tag: 'govie-box-button',
  shadow: false,
})
export class GovieBoxButton {
  @Element() el!: HTMLElement;

  @Prop({ attribute: 'class' }) class?: string;
  @Prop() variant?: ButtonVariant;

  // Expose onCustomClick here just for API contract
  @Event()
  customClick!: EventEmitter<MouseEvent>;

  private handleNativeClick = (event: MouseEvent) => {
    console.log('GovieBoxButton native click');
  };

  render() {
    return (
      <div
        class={`gi-p-4 gi-rounded-md gi-border gi-border-slate-200 ${this.class ?? ''}`}
        onClick={this.handleNativeClick}
      >
        <govie-button variant={this.variant}>
          <slot></slot>
        </govie-button>
      </div>
    );
  }
}
