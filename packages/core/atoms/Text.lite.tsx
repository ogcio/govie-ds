import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { Align, Size, Whitespace } from './utilities';

export type Props = {
  children: any;
  size?: (typeof Size)[keyof typeof Size];
  whitespace?: (typeof Whitespace)[keyof typeof Whitespace];
  align?: (typeof Align)[keyof typeof Align];
  className?: string;
  id?: string;
  dataTestId?: string;
  styles?: Record<string, string>;
  ariaHidden?: boolean;
};

useMetadata({ angular: { selector: 'gi-text' } });

export default function Text(props: Props) {
  return (
    <span
      className={textVariants({
        size: getSize(props.size),
        whitespace: getWhitespace(props.whitespace),
        align: getAlign(props.align),
        class: props.className,
      })}
      id={props.id}
      style={props.styles}
      data-testid={props.dataTestId}
      aria-hidden={props.ariaHidden}
    >
      {props.children}
    </span>
  );
}

const textVariants = tv({
  base: 'gi-font-primary gi-not-prose',
  variants: {
    size: {
      sm: 'gi-text-sm',
      md: 'gi-text-md',
      lg: 'gi-text-lg',
      xl: 'gi-text-lg xs:gi-text-xl',
    },
    whitespace: {
      normal: 'gi-whitespace-normal',
      pre: 'gi-whitespace-pre',
      'pre-wrap': 'gi-whitespace-pre-wrap',
      'break-spaces': 'gi-whitespace-break-spaces',
    },
    align: {
      start: 'gi-text-start',
      center: 'gi-text-center',
      end: 'gi-text-end',
      justify: 'gi-text-justify',
    },
  },
  defaultVariants: {
    size: 'md',
    whitespace: 'normal',
    align: 'start',
  },
});

const getSize = (x: Props['size'] = Size.MD) => (Object.values(Size).includes(x) ? x : Size.MD);
const getWhitespace = (x: Props['whitespace'] = Whitespace.NORMAL) =>
  Object.values(Whitespace).includes(x) ? x : Whitespace.NORMAL;
const getAlign = (x: Props['align'] = Align.START) => (Object.values(Align).includes(x) ? x : Align.START);
