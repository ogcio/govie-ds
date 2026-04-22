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

/**
 * Container component when you need a centralised, consistent layout wrapper for content on your webpage.
 * @param props.id - The id of the container.
 * @param props.children - The content to be rendered inside the container.
 * @param props.className - The class name of the container.
 * @param props.inset - Boolean to apply responsive vertical inset padding to the container. Default is `false`.
 * @param props.gutters - Whether the container should have gutters. Default is `true`.
 * @param props.maxWidth - The max width of the container: `sm`, `md`, `lg`, `xl`, or `full`. Default is `full`.
 * @param props.dataTestId - The data test id of the container.
 */
export default function Container(props: Props) {
  return (
    <div
      class={styles({
        inset: props.inset ?? false,
        gutters: props.gutters ?? true,
        maxWidth: clamp(props.maxWidth, MaxWidth, MaxWidth.screen),
        class: props.className,
      })}
      id={props.id}
      data-testid={props.dataTestId}
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
