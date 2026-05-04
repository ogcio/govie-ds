import _ from 'lodash';
import { useMetadata } from '@builder.io/mitosis';
import type { ResponsiveValue, BreakpointKey } from './constants';

useMetadata({ angular: { selector: 'gi-grid' } });

export type Props = {
  container?: boolean;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
  size?: ResponsiveValue<number>;
  role?: 'region' | 'navigation' | 'complementary' | 'search' | 'form';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  id?: string;
  dataTestId?: string;
  children: any;
};

export default function Grid(props: Props) {
  return (
    <div
      id={props.id}
      role={props.role}
      aria-label={props.role ? props.ariaLabel : undefined}
      aria-labelledby={props.role ? props.ariaLabelledBy : undefined}
      class={`${props.className || ''} ${
        props.container
          ? `gi-grid-container ${buildGridClasses(props.columns, 'gi-grid-columns', 1)} ${buildGridClasses(props.gap, 'gi-grid-gap', 0)}`
          : `gi-grid-item ${buildGridClasses(props.size, 'gi-grid-span', 1)}`
      }`}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}

const buildGridClasses = (value: ResponsiveValue<number> | undefined, prefix: string, min: number): string => {
  if (_.isNumber(value)) {
    return `${prefix}-${Math.max(min, value)}`;
  }
  if (!_.isPlainObject(value)) {
    return '';
  }
  const responsive = value as Partial<Record<BreakpointKey, number>>;
  return (_.keys(responsive) as BreakpointKey[])
    .map((bp) => {
      const clamped = Math.max(min, responsive[bp] as number);
      if (bp === 'base') {
        return `${prefix}-${clamped}`;
      }
      return `${prefix}-${bp}-${clamped}`;
    })
    .join(' ');
};
