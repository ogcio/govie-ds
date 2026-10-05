import { useMetadata } from '@builder.io/mitosis';
import type { AlignItems, Direction, Justify, ResponsiveValue, SpacingScale, ValueOf } from './constants';
import type { Props as BoxProps } from './Box.lite';
import { getAlignItems, getJustify } from './utilities';
import classes, { getDirectionClasses, getGapClasses } from './Stack.styles';
import CoreBox from './Box.lite';

useMetadata({ angular: { selector: 'core-stack' } });

export type Props = {
  direction?: ResponsiveValue<ValueOf<typeof Direction>>;
  gap?: ResponsiveValue<SpacingScale>;
  align?: ValueOf<typeof AlignItems>;
  justify?: ValueOf<typeof Justify>;
  wrap?: boolean;
} & BoxProps;

export default function Stack(props: Props) {
  return (
    <CoreBox
      id={props.id}
      role={props.role}
      ariaLabel={props.ariaLabel}
      ariaLabelledBy={props.ariaLabelledBy}
      styles={props.styles}
      className={classes({
        align: getAlignItems(props.align),
        justify: getJustify(props.justify),
        wrap: !!props.wrap,
        className: [getDirectionClasses(props.direction), getGapClasses(props.gap), props.className],
      })}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </CoreBox>
  );
}
