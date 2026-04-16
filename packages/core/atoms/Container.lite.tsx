import { useMetadata } from '@builder.io/mitosis';
import clsx from 'clsx';

export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ContainerInsetSizeType = (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];

export type Props = {
  children?: any;
  id?: string;
  insetTop?: ContainerInsetSizeType;
  insetBottom?: ContainerInsetSizeType;
  className?: string;
  fullWidth?: boolean;
};

useMetadata({ angular: { selector: 'gi-container' } });

/**
 * Container component when you need a centralised, consistent layout wrapper for content on your webpage.
 * @param props - ContainerProps
 * @param props.children - The content to be rendered inside the container.
 * @param props.id - The id of the container.
 * @param props.insetTop - The inset top size of the container.
 * @param props.insetBottom - The inset bottom size of the container.
 * @param props.className - The class name of the container.
 * @param props.fullWidth - Whether the container should be full width.
 * @returns Container component
 */
export default function Container(props: Props) {
  return (
    <div
      data-testid="govie-container"
      data-inset-top={props.insetTop}
      data-inset-bottom={props.insetBottom}
      className={clsx('gi-layout-container', props.className, {
        'gi-layout-container-inset': props.insetTop || props.insetBottom,
        'gi-layout-container-full-width': props.fullWidth,
      })}
      id={props.id}
    >
      {props.children}
    </div>
  );
}
