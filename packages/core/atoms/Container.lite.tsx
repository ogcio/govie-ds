import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp, Size } from './utilities';

export type Props = {
  id?: string;
  children?: any;
  className?: string;
  inset?: boolean;
  gutters?: boolean;
  maxWidth?: (typeof MaxWidth)[keyof typeof MaxWidth];
  dataTestId?: string;
};
export const MaxWidth = { ...Size, '2xl': '2xl', full: 'full', screen: 'screen' } as const;

useMetadata({ angular: { selector: 'gi-container' } });

export default function Container(props: Props) {
  return (
    <div
      id={props.id}
      data-testid={props.dataTestId}
      class={styles({
        inset: props.inset ?? false,
        gutters: props.gutters ?? true,
        maxWidth: clamp(props.maxWidth, MaxWidth, MaxWidth.screen),
        class: props.className,
      })}
    >
      {props.children}
    </div>
  );
}

export const styles = tv({
  base: 'gi-w-full gi-container md:gi-mx-auto',
  variants: {
    inset: {
      true: 'gi-mx-auto gi-py-4 md:gi-py-6 lg:gi-py-8',
    },
    gutters: {
      true: 'gi-px-4 md:gi-px-6 lg:gi-px-8',
      false: 'gi-px-0',
    },
    maxWidth: {
      sm: 'gi-max-w-sm',
      md: 'gi-max-w-md',
      lg: 'gi-max-w-lg',
      xl: 'gi-max-w-xl',
      '2xl': 'gi-max-w-2xl',
      full: 'gi-max-w-full',
      screen: 'gi-max-w-[100vw]',
    },
  },
  defaultVariants: {
    inset: false,
    gutters: true,
    maxWidth: MaxWidth.screen,
  },
});
