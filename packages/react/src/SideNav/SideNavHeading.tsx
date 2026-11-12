import CoreSideNavHeading, { type Props } from '@/atoms/sidenav/SideNavHeading';
import { headingListItemClasses } from '@/atoms/sidenav/SideNavItem.styles';

export type SideNavHeadingProps = Props & {
  style?: React.CSSProperties;
};

export default function SideNavHeading({ style, styles, ...props }: SideNavHeadingProps) {
  return (
    <li className={headingListItemClasses()}>
      <CoreSideNavHeading {...props} styles={(style as Props['styles']) ?? styles} />
    </li>
  );
}
