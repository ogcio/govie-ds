import { useMetadata } from '@builder.io/mitosis';
import GiMoreHorizontalIcon from '../icons/MoreHorizontal.lite';
import type { IconProps } from '../icons/types';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'core-pagination-ellipsis' } });

export type Props = IconProps & {
  styles?: Record<string, string>;
};

export default function PaginationEllipsis(props: Props) {
  return (
    <li aria-hidden={!props.label} style={props.styles}>
      <GiMoreHorizontalIcon
        id={props.id}
        className={classes({ className: props.className })}
        size={props.size}
        color={props.color}
        label={props.label}
        dataTestId={props.dataTestId}
      />
    </li>
  );
}
const classes = tv({
  base: 'gi-text-gray-700 gi-shrink-0 gi-w-12',
});
