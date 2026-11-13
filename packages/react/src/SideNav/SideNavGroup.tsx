import CoreSideNavGroup, { type Props } from '@/atoms/sidenav/SideNavGroup';

export type SideNavGroupProps = Props & {
  style?: React.CSSProperties;
};

export default function SideNavGroup({ style, styles, ...props }: SideNavGroupProps) {
  return <CoreSideNavGroup {...props} styles={(style as Props['styles']) ?? styles} />;
}
