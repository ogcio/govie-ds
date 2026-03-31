import { tv } from 'tailwind-variants';

export type TextProps = {
  children: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  whitespace?: 'normal' | 'pre' | 'pre-wrap' | 'break-spaces';
  className?: string;
  id?: string;
  dataTestid?: string;
  styles?: Record<string, any>;
};

const textVariants = tv({
  base: 'gi-font-primary gi-leading-[1.5] gi-not-prose',
  variants: {
    size: {
      sm: 'gi-text-[1rem]',
      md: 'gi-text-[1.125rem]',
      lg: 'gi-text-[1.25rem]',
      xl: 'gi-text-[1.5rem]',
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
export default function Text(props: TextProps) {
  return (
    <span
      className={textVariants({ size: props.size, whitespace: props.whitespace, class: props.className })}
      id={props.id}
      style={props.styles}
      data-testid={props.dataTestid}
    >
      {props.children}
    </span>
  );
}
