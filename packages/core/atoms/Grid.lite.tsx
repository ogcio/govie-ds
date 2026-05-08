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
      className={
        props.container
          ? _.compact([
              'gi-grid-container',
              getGridClasses(props.columns ?? DEFAULT_COLUMNS, 'gi-grid-columns'),
              getGridClasses(props.gap, 'gi-grid-gap'),
              props.className,
            ]).join(' ')
          : _.compact(['gi-grid-item', getGridClasses(props.size, 'gi-grid-span'), props.className]).join(' ')
      }
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

const getGridClasses = (value: ResponsiveValue<SpacingScale> | undefined, prefix: string): string =>
  resolveResponsive(value, (v, bp) => `${bp}${prefix}-${_.clamp(v as number, 0, 12)}`);
