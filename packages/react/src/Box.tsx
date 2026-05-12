import GiBox, { type Props as GiBoxProps } from './atoms/Box.js';

export type BoxProps = Omit<GiBoxProps, 'children'> &
  React.PropsWithChildren<{
    style?: React.CSSProperties;
  }>;

export function Box({ style, styles, ...props }: BoxProps) {
  return <GiBox {...props} styles={(style ?? styles) as Record<string, string>} />;
}
