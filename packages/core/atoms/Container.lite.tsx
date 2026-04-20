import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { getContainerLayoutType } from './utilities';

export type Props = {
  children?: any;
  id?: string;
  insetTop?: (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];
  insetBottom?: (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];
  className?: string;
  maxWidth?: (typeof ContainerMaxWidthEnum)[keyof typeof ContainerMaxWidthEnum];
  fullWidth?: boolean;
  gutterSize?: (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];
};

useMetadata({ angular: { selector: 'gi-container' } });

/**
 * Container component when you need a centralised, consistent layout wrapper for content on your webpage.
 * @param props - ContainerProps
 * @param props.children - The content to be rendered inside the container.
 * @param props.id - The id of the container.
 * @param props.insetTop - The inset top size of the container. Default is `md`
 * @param props.insetBottom - The inset bottom size of the container. Default is `md`
 * @param props.className - The class name of the container.
 * @param props.fullWidth - Whether the container should be full width. Default is `false`
 * @param props.maxWidth - The max width of the container: `sm`, `md`, `lg`, `xl`, or `full`.
 * @param props.gutterSize - The gutter size of the container. Default is `md`
 * @returns Container component
 */
export default function Container(props: Props) {
  return (
    <div
      data-testid="govie-container"
      className={styles({
        layout: getContainerLayoutType(props),
        maxWidth: props.maxWidth || ContainerMaxWidthEnum.Full,
        gutterSize: props.gutterSize || ContainerGutterSizeEnum.Small,
        insetTop: props.insetTop,
        insetBottom: props.insetBottom,
        class: props.className,
      })}
      id={props.id}
    >
      {props.children}
    </div>
  );
}

export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export const ContainerMaxWidthEnum = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
  Full: 'full',
} as const;

export const ContainerGutterSizeEnum = {
  None: 'none',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

/** Utilities aligned with `packages/design/tailwind/css/layout.css` (gi-layout-container / -full-width / -inset + gutter + inset). */
export const styles = tv({
  base: '',
  variants: {
    layout: {
      /** `.gi-layout-container` — `!fullWidth && !hasInset` */
      standard: 'gi-w-full gi-max-w-[100vw] md:gi-container md:gi-mx-auto',
      /** `.gi-layout-container-full-width` — `fullWidth && !hasInset` */
      fullWidth: 'gi-w-full gi-max-w-[100vw] gi-px-6 lg:gi-px-8 2xl:gi-max-w-screen-2xl 2xl:gi-mx-auto',
      /** `.gi-layout-container-inset` — `hasInset` */
      inset: 'gi-w-full gi-max-w-[100vw] gi-container gi-mx-auto',
    },
    gutterSize: {
      [ContainerGutterSizeEnum.None]: 'gi-px-0',
      [ContainerGutterSizeEnum.Small]: 'gi-px-4',
      [ContainerGutterSizeEnum.Medium]: 'gi-px-6',
      [ContainerGutterSizeEnum.Large]: 'gi-px-8',
      [ContainerGutterSizeEnum.ExtraLarge]: 'gi-px-10',
    },
    insetTop: {
      [ContainerInsetSizeEnum.None]: 'gi-pt-0',
      [ContainerInsetSizeEnum.Medium]: 'lg:gi-pt-8 md:gi-pt-6 gi-pt-4',
      [ContainerInsetSizeEnum.Large]: 'lg:gi-pt-12 md:gi-pt-9 gi-pt-6',
      [ContainerInsetSizeEnum.ExtraLarge]: 'lg:gi-pt-16 md:gi-pt-12 gi-pt-8',
    },
    insetBottom: {
      [ContainerInsetSizeEnum.None]: 'gi-pb-0',
      [ContainerInsetSizeEnum.Medium]: 'lg:gi-pb-8 md:gi-pb-6 gi-pb-4',
      [ContainerInsetSizeEnum.Large]: 'lg:gi-pb-12 md:gi-pb-9 gi-pb-6',
      [ContainerInsetSizeEnum.ExtraLarge]: 'lg:gi-pb-16 md:gi-pb-12 gi-pb-8',
    },
    maxWidth: {
      [ContainerMaxWidthEnum.Small]: '!gi-max-w-sm',
      [ContainerMaxWidthEnum.Medium]: '!gi-max-w-md',
      [ContainerMaxWidthEnum.Large]: [
        'gi-w-full gi-max-w-[100vw] gi-px-6 lg:gi-px-8 gi-mx-auto sm:gi-max-w-[640px] md:gi-max-w-[768px] lg:gi-max-w-[1024px] md:gi-mx-auto',
      ],
      [ContainerMaxWidthEnum.ExtraLarge]: [
        'gi-w-full gi-max-w-[100vw] gi-px-6 lg:gi-px-8 gi-mx-auto sm:gi-max-w-[640px] md:gi-max-w-[768px] lg:gi-max-w-[1024px] xl:gi-max-w-[1280px] md:gi-mx-auto',
      ],
      [ContainerMaxWidthEnum.Full]: '',
    },
  },
  defaultVariants: {
    layout: 'standard',
    gutterSize: 'sm',
    maxWidth: ContainerMaxWidthEnum.Full,
  },
});
