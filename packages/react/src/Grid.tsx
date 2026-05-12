import GiGrid, { type Props as GiGridProps } from './atoms/Grid.js';

export type GridProps = Omit<GiGridProps, 'children'> &
  React.PropsWithChildren<{
    style?: React.CSSProperties;
  }>;

export function Grid({ style, styles, ...props }: GridProps) {
  return <GiGrid {...props} styles={(style ?? styles) as Record<string, string>} />;
}
