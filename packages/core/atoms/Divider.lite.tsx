import { useMetadata } from '@builder.io/mitosis';
import type { Orientation, ValueOf } from './constants';
import { getOrientation } from './utilities';
import classes from './Divider.styles';

useMetadata({ angular: { selector: 'core-divider' } });

export type Props = {
  orientation?: ValueOf<typeof Orientation>;
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
      aria-orientation={getOrientation(props.orientation)}
      class={classes({
        orientation: getOrientation(props.orientation),
        className: props.className,
      })}
      style={props.styles}
    />
  );
}
