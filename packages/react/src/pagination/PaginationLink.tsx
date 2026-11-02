import CorePaginationLink, { type Props } from '@/atoms/pagination/PaginationLink';
import CorePaginationItem from '@/atoms/pagination/PaginationItem';

export type PaginationLinkProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function PaginationLink({ style, ...props }: PaginationLinkProps) {
  return (
    <CorePaginationItem>
      <CorePaginationLink {...props} styles={style as Record<string, string>} />
    </CorePaginationItem>
  );
}
