import _ from 'lodash';
import { useMetadata } from '@builder.io/mitosis';
import type { ResponsiveValue, BreakpointKey, SpacingScale } from './constants';
import type { Props as BoxProps } from './Box.lite';
import { resolveResponsive } from './utilities';
import GiBox from './Box.lite';

useMetadata({ angular: { selector: 'gi-grid' } });

export type Props = {
  container?: boolean;
  columns?: ResponsiveValue<SpacingScale>;
  gap?: ResponsiveValue<SpacingScale>;
  size?: ResponsiveValue<SpacingScale>;
} & BoxProps;

export default function Grid(props: Props) {
  return (
    <GiBox
      id={props.id}
      role={props.role}
      ariaLabel={props.ariaLabel}
      ariaLabelledBy={props.ariaLabelledBy}
      styles={props.styles}
      className={classes([
        props.container && 'gi-grid-container',
        props.container && getGridClasses(props.columns ?? DEFAULT_COLUMNS, 'gi-grid-columns'),
        props.container && getGridClasses(props.gap, 'gi-grid-gap'),
        (!props.container || !_.isNil(props.size)) && 'gi-grid-item',
        (!props.container || !_.isNil(props.size)) && getGridClasses(props.size, 'gi-grid-span'),
        props.className,
      ])}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </GiBox>
  );
}

const DEFAULT_COLUMNS: Partial<Record<BreakpointKey, SpacingScale>> = {
  base: 4,
  sm: 6,
  md: 8,
  lg: 12,
};

const classes = (list: Array<string | boolean | undefined>) => _.compact(list).join(' ');

const getGridClasses = (value: ResponsiveValue<SpacingScale> | undefined, prefix: string): string =>
  resolveResponsive(value, (v, bp) => `${bp}${prefix}-${_.clamp(v as number, 0, 12)}`);
