import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { Orientation } from './constants';
import { getOrientation } from './utilities';

useMetadata({ angular: { selector: 'gi-divider' } });

export type Props = {
  orientation?: (typeof Orientation)[keyof typeof Orientation];
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
        className: props.className,
      })}
      style={props.styles}
    />
  );
}

const dividerStyles = tv({
  base: 'gi-border-color-border-system-neutral-muted gi-border-0',
  variants: {
    orientation: {
      [Orientation.HORIZONTAL]: 'gi-border-t-xs gi-w-full',
      [Orientation.VERTICAL]: 'gi-border-l-xs gi-self-stretch gi-h-auto',
    },
  },
  defaultVariants: {
    orientation: Orientation.HORIZONTAL,
  },
});
