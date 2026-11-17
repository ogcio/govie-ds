import CoreSideNavHeading, { type Props } from '@/atoms/sidenav/SideNavHeading';
import { headingListItemClasses } from '@/atoms/sidenav/SideNavItem.styles';

export type SideNavHeadingProps = Props;

export default function SideNavHeading(props: SideNavHeadingProps) {
  return (
    <li className={headingListItemClasses()}>
      <CoreSideNavHeading {...props} />
    </li>
  );
}
