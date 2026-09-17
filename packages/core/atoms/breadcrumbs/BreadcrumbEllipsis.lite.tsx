import { useMetadata } from '@builder.io/mitosis';
import GiMoreHorizontalIcon from '../icons/MoreHorizontal.lite';
import listClasses, { moreHorizontalClasses } from './BreadcrumbLink.styles';
import type { IconProps } from '../icons/types';

useMetadata({ angular: { selector: 'gi-breadcrumb-ellipsis' } });

export type Props = Omit<IconProps, 'label'>;

export default function BreadcrumbEllipsis(props: Props) {
  return (
    <li class={listClasses()} aria-hidden={true}>
      <GiMoreHorizontalIcon
        id={props.id}
        className={moreHorizontalClasses({ className: props.className })}
        size={props.size}
        color={props.color}
        dataTestId={props.dataTestId}
      />
    </li>
  );
}
