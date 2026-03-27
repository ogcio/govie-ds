import { tv } from 'tailwind-variants';

export type TextProps = {
  children: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  whitespace?: 'normal' | 'pre' | 'pre-wrap' | 'break-spaces';
  className?: string;
  id?: string;
  dataTestid?: string;
};
const spanVariants = tv({
  base: 'gi-text-sm md:gi-text-md gi-not-prose',
  variants: {
    size: {
      sm: 'gi-span-sm',
      md: 'gi-span-md',
      lg: 'gi-span-lg',
      xl: 'gi-span-xl',
    },
    whitespace: {
      normal: 'gi-whitespace-normal',
      pre: 'gi-whitespace-pre',
      'pre-wrap': 'gi-whitespace-pre-wrap',
      'break-spaces': 'gi-whitespace-break-spaces',
    },
  },
});
export default function Text(props: TextProps) {
  return (
    <span
      className={spanVariants({ size: props.size, whitespace: props.whitespace, class: props.className })}
      id={props.id}
      data-testid={props.dataTestid}
    >
      {props.children}
    </span>
  );
}
