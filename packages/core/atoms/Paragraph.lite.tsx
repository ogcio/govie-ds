import { tv } from 'tailwind-variants';
import { useMetadata } from '@builder.io/mitosis';
import type { Align, Size, Whitespace } from './constants';
import { getSize, getAlign, getWhitespace } from './utilities';
import { textVariants } from './Text.lite';

export type Props = {
  id?: string;
  size?: (typeof Size)[keyof typeof Size];
  align?: (typeof Align)[keyof typeof Align];
  whitespace?: (typeof Whitespace)[keyof typeof Whitespace];
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  dataTestId?: string;
  ariaHidden?: boolean;
};

useMetadata({ angular: { selector: 'gi-paragraph' } });

export default function Paragraph(props: Props) {
  return (
    <p
      id={props.id}
      class={paragraphStyles({
        size: getSize(props.size),
        align: getAlign(props.align),
        whitespace: getWhitespace(props.whitespace),
        class: props.className,
      })}
      style={props.styles}
      data-testid={props.dataTestId}
      aria-hidden={props.ariaHidden}
    >
      {props.children}
    </p>
  );
}

export const paragraphStyles = tv({
  extend: textVariants,
  base: ['gi-max-w-prose'],
  variants: {
    align: {
      start: 'gi-text-start',
      center: 'gi-text-center',
      end: 'gi-text-end',
      justify: 'gi-text-justify',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});
