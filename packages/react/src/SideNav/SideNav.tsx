import CoreSideNav, { type Props } from '@/atoms/sidenav/SideNav';

export type SideNavProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function SideNav({ style, ...props }: SideNavProps) {
  return <CoreSideNav {...props} styles={style as Props['styles']} />;
}
