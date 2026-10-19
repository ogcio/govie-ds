import CorePagination, { type Props } from '@/atoms/pagination/Pagination';

export type PaginationProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function Pagination({ style, ...props }: PaginationProps) {
  return <CorePagination {...props} styles={style as Record<string, string>} />;
}
