import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import type { Align, Size, ValueOf, Whitespace } from './constants';
import { getSize, getAlign, getWhitespace } from './utilities';
import textClasses from './Text.styles';

export type Props = {
  id?: string;
  size?: ValueOf<typeof Size>;
  align?: ValueOf<typeof Align>;
  whitespace?: ValueOf<typeof Whitespace>;
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
      class={classes({
        size: getSize(props.size),
        align: getAlign(props.align),
        whitespace: getWhitespace(props.whitespace),
        className: props.className,
      })}
      style={props.styles}
      data-testid={props.dataTestId}
      aria-hidden={props.ariaHidden}
    >
      {props.children}
    </p>
  );
}

const classes = tv({
  extend: textClasses,
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
