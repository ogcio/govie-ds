import GiDivider, { type Props as GiDividerProps } from './atoms/Divider';

export type DividerProps = GiDividerProps & {
  style?: React.CSSProperties;
};

export function Divider({ style, styles, ...props }: DividerProps) {
  return <GiDivider {...props} styles={(style ?? styles) as Record<string, string>} />;
}
