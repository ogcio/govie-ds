import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { Orientation } from './constants';
import { getOrientation } from './utilities';

useMetadata({ angular: { selector: 'gi-divider' } });

export type Props = {
  orientation?: (typeof Orientation)[keyof typeof Orientation];
  inset?: boolean;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function Divider(props: Props) {
  return (
    <hr
      id={props.id}
      data-testid={props.dataTestId}
      aria-orientation={getOrientation(props.orientation) === Orientation.VERTICAL ? Orientation.VERTICAL : undefined}
      class={dividerStyles({
        orientation: getOrientation(props.orientation),
        inset: props.inset ?? false,
        className: props.className,
      })}
      style={props.styles}
    />
  );
}

const dividerStyles = tv({
  base: 'gi-border-gray-300 gi-border-0',
  variants: {
    orientation: {
      [Orientation.HORIZONTAL]: 'gi-border-t-xs',
      [Orientation.VERTICAL]: 'gi-border-l-xs',
    },
    inset: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      orientation: Orientation.HORIZONTAL,
      inset: false,
      class: 'gi-w-full',
    },
    {
      orientation: Orientation.HORIZONTAL,
      inset: true,
      class: 'gi-w-11/12 gi-mx-auto',
    },
    {
      orientation: Orientation.VERTICAL,
      class: 'gi-h-full',
    },
  ],
  defaultVariants: {
    orientation: Orientation.HORIZONTAL,
    inset: false,
  },
});
