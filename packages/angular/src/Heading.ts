import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'gi-font-bold gi-font-primary',
  variants: {
    size: {
      xl: 'gi-text-4xl md:gi-text-5xl xl:gi-text-6xl',
      lg: 'gi-text-2xl md:gi-text-3xl xl:gi-text-4xl',
      md: 'gi-text-lg md:gi-text-xl xl:gi-text-2xl',
      sm: 'gi-text-lg xl:gi-text-xl',
      xs: 'gi-text-md',
      '2xs': 'gi-text-sm',
    },
  },
});

type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';

const defaultSizeMap: Record<string, Size> = {
  h1: 'xl',
  h2: 'lg',
  h3: 'md',
  h4: 'sm',
  h5: 'xs',
  h6: '2xs',
};

@Directive({
  selector: 'h1[dsHeading], h2[dsHeading], h3[dsHeading], h4[dsHeading], h5[dsHeading], h6[dsHeading]',
  standalone: true,
})
export class DsHeadingDirective {
  @Input() size?: Size;
  @Input() className?: string;

  constructor(private el: ElementRef) {}

  @HostBinding('class')
  get classes(): string {
    const tag = (this.el.nativeElement as HTMLElement).tagName.toLowerCase();
    const resolvedSize = this.size || defaultSizeMap[tag];
    return styles({ size: resolvedSize, class: this.className });
  }
}
