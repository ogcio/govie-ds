import _ from 'lodash';
import { useMetadata } from '@builder.io/mitosis';
import type { ResponsiveValue, BreakpointKey, SpacingScale } from './constants';

useMetadata({ angular: { selector: 'gi-grid' } });

export type Props = {
  id?: string;
  children: any;
  container?: boolean;
  columns?: ResponsiveValue<SpacingScale>;
  gap?: ResponsiveValue<SpacingScale>;
  size?: ResponsiveValue<SpacingScale>;
  role?: 'region' | 'navigation' | 'complementary' | 'search' | 'form';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  dataTestId?: string;
};

export default function Grid(props: Props) {
  return (
    <div
      id={props.id}
      role={props.role}
      aria-label={props.role ? props.ariaLabel : undefined}
      aria-labelledby={props.role ? props.ariaLabelledBy : undefined}
      class={
        props.container
          ? _.compact([
              'gi-grid-container',
              buildGridClasses(props.columns ?? FIGMA_COLUMNS, 'gi-grid-columns'),
              buildGridClasses(props.gap, 'gi-grid-gap'),
              props.className,
            ]).join(' ')
          : _.compact(['gi-grid-item', buildGridClasses(props.size, 'gi-grid-span'), props.className]).join(' ')
      }
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}

const FIGMA_COLUMNS: Partial<Record<BreakpointKey, SpacingScale>> = {
  base: 4,
  sm: 6,
  md: 8,
  lg: 12,
};

const buildGridClasses = (value: ResponsiveValue<SpacingScale> | undefined, prefix: string): string => {
  if (!value) {
    return '';
  }

  const source = _.isNumber(value)
    ? { base: Math.max(0, value) as SpacingScale }
    : (value as Partial<Record<BreakpointKey, SpacingScale>>);

  return (_.keys(source) as BreakpointKey[])
    .map((bp) => {
      const clamped = Math.max(0, source[bp] as number);
      return bp === 'base' ? `${prefix}-${clamped}` : `${bp}:${prefix}-${clamped}`;
    })
    .join(' ');
};
