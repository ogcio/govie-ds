import { useMetadata } from '@builder.io/mitosis';
import GiMoreHorizontalIcon from '../icons/MoreHorizontal.lite';
import type { IconProps } from '../icons/types';
import { ellipsisClasses } from './PaginationButton.styles';

useMetadata({ angular: { selector: 'core-pagination-ellipsis' } });

export type Props = Omit<IconProps, 'label'> & {
  styles?: Record<string, string>;
};

export default function PaginationEllipsis(props: Props) {
  return (
    <li aria-hidden={true} style={props.styles}>
      <GiMoreHorizontalIcon
        id={props.id}
        className={ellipsisClasses({ className: props.className })}
        size={props.size}
        color={props.color}
        dataTestId={props.dataTestId}
      />
    </li>
  );
}
