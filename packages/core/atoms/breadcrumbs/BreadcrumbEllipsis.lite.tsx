import { useMetadata } from '@builder.io/mitosis';
import GiMoreHorizontalIcon from '../icons/MoreHorizontal.lite';
import type { IconProps } from '../icons/types';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'core-breadcrumb-ellipsis' } });

export type Props = IconProps;

export default function BreadcrumbEllipsis(props: Props) {
  return (
    <GiMoreHorizontalIcon
      id={props.id}
      className={classes({ className: props.className })}
      label={props.label}
      size={props.size}
      color={props.color}
      dataTestId={props.dataTestId}
    />
  );
}

const classes = tv({
  base: 'gi-text-gray-700 gi-shrink-0',
});
