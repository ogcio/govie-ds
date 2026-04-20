import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

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
      data-inset-top={props.insetTop}
      data-inset-bottom={props.insetBottom}
      data-gutter-size={props.gutterSize || ContainerInsetSizeEnum.Medium}
      data-max-width={props.maxWidth || ContainerMaxWidthEnum.Full}
      data-full-width={props.fullWidth || false}
      className={styles({
        maxWidth: props.maxWidth || ContainerMaxWidthEnum.Full,
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

const styles = tv({
  base: 'gi-layout-container gi-layout-gutter-size gi-layout-container-inset',
  variants: {
    fullWidth: {
      true: 'gi-layout-container-full-width',
    },
    maxWidth: {
      [ContainerMaxWidthEnum.Small]: '!gi-max-w-sm',
      [ContainerMaxWidthEnum.Medium]: '!gi-max-w-md',
      [ContainerMaxWidthEnum.Large]: '!gi-max-w-lg',
      [ContainerMaxWidthEnum.ExtraLarge]: '!gi-max-w-xl',
      [ContainerMaxWidthEnum.Full]: '!gi-max-w-none',
    },
  },
  defaultVariants: {
    fullWidth: false,
    maxWidth: ContainerMaxWidthEnum.Full,
  },
});
