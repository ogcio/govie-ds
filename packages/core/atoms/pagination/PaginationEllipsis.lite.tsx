import { useMetadata } from '@builder.io/mitosis';
import GiMoreHorizontalIcon from '../icons/MoreHorizontal.lite';
import type { IconProps } from '../icons/types';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'core-pagination-ellipsis' } });

export type Props = Omit<IconProps, 'label'>;

export default function PaginationEllipsis(props: Props) {
  return (
    <li aria-hidden={true}>
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
