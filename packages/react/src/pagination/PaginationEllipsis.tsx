import CorePaginationEllipsis, { type Props } from '@/atoms/pagination/PaginationEllipsis';
import CorePaginationItem from '@/atoms/pagination/PaginationItem';

export type PaginationEllipsisProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function PaginationEllipsis({ style, ...props }: PaginationEllipsisProps) {
  return (
    <CorePaginationItem styles={style as Record<string, string>} ariaHidden={!props.label || undefined}>
      <CorePaginationEllipsis {...props} />
    </CorePaginationItem>
  );
}
