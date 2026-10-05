import { useMetadata } from '@builder.io/mitosis';
import type { ResponsiveValue, SpacingScale } from './constants';
import type { Props as BoxProps } from './Box.lite';
import classes from './Grid.styles';
import CoreBox from './Box.lite';

useMetadata({ angular: { selector: 'core-grid' } });

export type Props = {
  container?: boolean;
  columns?: ResponsiveValue<SpacingScale>;
  gap?: ResponsiveValue<SpacingScale>;
  size?: ResponsiveValue<SpacingScale>;
} & BoxProps;

export default function Grid(props: Props) {
  return (
    <CoreBox
      id={props.id}
      role={props.role}
      ariaLabel={props.ariaLabel}
      ariaLabelledBy={props.ariaLabelledBy}
      styles={props.styles}
      className={classes({
        container: props.container,
        columns: props.columns,
        gap: props.gap,
        size: props.size,
        className: props.className,
      })}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </CoreBox>
  );
}
