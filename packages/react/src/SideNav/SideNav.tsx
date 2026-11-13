import CoreSideNav, { type Props } from '@/atoms/sidenav/SideNav';

export type SideNavProps = Props & {
  style?: React.CSSProperties;
};

export default function SideNav({ style, styles, ...props }: SideNavProps) {
  return <CoreSideNav {...props} styles={(style as Props['styles']) ?? styles} />;
}
