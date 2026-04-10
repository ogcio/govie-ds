import { tv } from 'tailwind-variants';
import { useMetadata } from '@builder.io/mitosis';
import { getSize, getAlign, getWhitespace, type Align, type Size, type Whitespace } from './utilities';

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
  base: ['gi-font-primary', 'gi-max-w-prose'],
  variants: {
    size: {
      sm: 'gi-text-sm',
      md: 'gi-text-md',
      lg: 'gi-text-lg',
      xl: 'gi-text-lg xs:gi-text-xl',
    },
    align: {
      start: 'gi-text-start',
      center: 'gi-text-center',
      end: 'gi-text-end',
      justify: 'gi-text-justify',
    },
    whitespace: {
      normal: 'gi-whitespace-normal',
      pre: 'gi-whitespace-pre',
      'pre-wrap': 'gi-whitespace-pre-wrap',
      'break-spaces': 'gi-whitespace-break-spaces',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
});
