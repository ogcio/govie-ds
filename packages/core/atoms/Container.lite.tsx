import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from './utilities';
import { Size } from './constants';

export type Props = {
  id?: string;
  children?: any;
  className?: string;
  inset?: boolean;
  gutters?: boolean;
  maxWidth?: (typeof MaxWidth)[keyof typeof MaxWidth];
  dataTestId?: string;
};
export const MaxWidth = { ...Size, default: 'default', '2xl': '2xl', full: 'full' } as const;

useMetadata({ angular: { selector: 'gi-container' } });

export default function Container(props: Props) {
  return (
    <div
      id={props.id}
      data-testid={props.dataTestId}
      class={styles({
        inset: props.inset ?? false,
        gutters: props.gutters ?? true,
        maxWidth: clamp(props.maxWidth, MaxWidth, MaxWidth.default),
        class: props.className,
      })}
    >
      {props.children}
    </div>
  );
}

export const styles = tv({
  base: 'gi-container gi-mx-auto',
  variants: {
    inset: {
      true: 'gi-py-4 md:gi-py-6 lg:gi-py-8',
    },
    gutters: {
      false: 'gi-px-0', // gi-container override
    },
    maxWidth: {
      default: 'gi-max-w-full 2xl:gi-max-w-screen-2xl', // defaults to gi-container
      sm: 'gi-max-w-screen-sm', // 640px
      md: 'gi-max-w-screen-md', // 768px
      lg: 'gi-max-w-screen-lg', // 1024px
      xl: 'gi-max-w-screen-xl', // 1280px
      '2xl': 'gi-max-w-screen-2xl', // 1536px
      full: 'gi-max-w-full', // parent 100%
    },
  },
  defaultVariants: {
    inset: false,
    gutters: true,
    maxWidth: 'default',
  },
});
