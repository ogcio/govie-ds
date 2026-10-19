import CorePaginationEllipsis, { type Props } from '@/atoms/pagination/PaginationEllipsis';

export type PaginationEllipsisProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function PaginationEllipsis({ style, ...props }: PaginationEllipsisProps) {
  return <CorePaginationEllipsis {...props} styles={style as Record<string, string>} />;
}
