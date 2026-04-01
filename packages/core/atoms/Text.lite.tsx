import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

export const Size = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type Props = {
  children: any;
  size?: (typeof Size)[keyof typeof Size];
  whitespace?: 'normal' | 'pre' | 'pre-wrap' | 'break-spaces';
  className?: string;
  id?: string;
  dataTestid?: string;
  styles?: Record<string, any>;
};

export const Whitespace = {
  NORMAL: 'normal',
  PRE: 'pre',
  PRE_WRAP: 'pre-wrap',
  BREAK_SPACES: 'break-spaces',
} as const;

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
  },
  defaultVariants: {
    size: 'md',
    whitespace: 'normal',
  },
});

useMetadata({ angular: { selector: 'gi-text' } });

export default function Text(props: Props) {
  return (
    <span
      className={textVariants({
        size: getSize(props.size),
        whitespace: getWhitespace(props.whitespace),
        class: props.className,
      })}
      id={props.id}
      style={props.styles}
      data-testid={props.dataTestid}
    >
      {props.children}
    </span>
  );
}

const getSize = (x: Props['size'] = Size.MD) => (Object.values(Size).includes(x) ? x : Size.MD);
const getWhitespace = (x: Props['whitespace'] = Whitespace.NORMAL) =>
  Object.values(Whitespace).includes(x) ? x : Whitespace.NORMAL;
