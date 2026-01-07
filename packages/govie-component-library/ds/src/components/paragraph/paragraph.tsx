import { Component, h, Host, Prop } from '@stencil/core';
import { clsx } from 'clsx';
export type ParagraphAs = 'p' | 'span';
export type ParagraphSize = 'lg' | 'md' | 'sm';
export type ParagraphAlign = 'start' | 'center' | 'end' | 'justify';
export type ParagraphWhitespace =
  | 'normal'
  | 'pre'
  | 'pre-wrap'
  | 'break-spaces';

function getSizeClass(as: ParagraphAs, size: ParagraphSize): string {
  switch (size) {
    case 'lg':
      return as === 'p' ? 'gi-paragraph-lg' : 'gi-span-lg';
    case 'sm':
      return as === 'p' ? 'gi-paragraph-sm' : 'gi-span-sm';
    default:
      return as === 'p' ? 'gi-paragraph-md' : 'gi-span-md';
  }
}

function getAlignClass(align: ParagraphAlign): string {
  switch (align) {
    case 'center':
      return 'gi-text-center';
    case 'end':
      return 'gi-text-end';
    case 'justify':
      return 'gi-text-justify';
    default:
      return 'gi-text-start';
  }
}

function getWhitespaceClass(ws: ParagraphWhitespace): string {
  switch (ws) {
    case 'pre':
      return 'gi-whitespace-pre';
    case 'pre-wrap':
      return 'gi-whitespace-pre-wrap';
    case 'break-spaces':
      return 'gi-whitespace-break-spaces';
    default:
      return 'gi-whitespace-normal';
  }
}

@Component({
  tag: 'govie-paragraph',
  scoped: true,
})
export class Paragraph {
  @Prop({ reflect: true }) as: ParagraphAs = 'p';
  @Prop({ reflect: true }) size: ParagraphSize = 'md';
  @Prop({ reflect: true }) align: ParagraphAlign = 'start';
  @Prop({ reflect: true }) whitespace: ParagraphWhitespace = 'normal';

  @Prop({ attribute: 'aria-label', reflect: true }) ariaLabel?: string;
  @Prop({ attribute: 'data-testid', reflect: true }) dataTestid?: string;

  render() {
    const common = {
      class: clsx(
        getSizeClass(this.as, this.size),
        getAlignClass(this.align),
        getWhitespaceClass(this.whitespace),
      ),
      'aria-label': this.ariaLabel,
      'data-testid': this.dataTestid,
    };

    return (
      <Host>
        {this.as === 'span' ? (
          <span {...common}>
            <slot />
          </span>
        ) : (
          <p {...common}>
            <slot />
          </p>
        )}
      </Host>
    );
  }
}
