import { useMetadata } from '@builder.io/mitosis';
import GiMoreHorizontalIcon from '../icons/MoreHorizontal.lite';
import { listItemClasses } from './BreadcrumbLink.styles';
import type { IconProps } from '../icons/types';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'core-breadcrumb-ellipsis' } });

export type Props = Omit<IconProps, 'label'>;

export default function BreadcrumbEllipsis(props: Props) {
  return (
    <li class={listItemClasses()} aria-hidden={true}>
      <GiMoreHorizontalIcon
        id={props.id}
        className={classes({ className: props.className })}
        size={props.size}
        color={props.color}
        dataTestId={props.dataTestId}
      />
    </li>
  );
}

const classes = tv({
  base: 'gi-text-gray-700 gi-shrink-0',
});
