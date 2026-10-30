import CorePaginationButton, { type Props } from '@/atoms/pagination/PaginationButton';
import CorePaginationItem from '@/atoms/pagination/PaginationItem';

export type PaginationButtonProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function PaginationButton({ style, ...props }: PaginationButtonProps) {
  return (
    <CorePaginationItem>
      <CorePaginationButton {...props} styles={style as Record<string, string>} />
    </CorePaginationItem>
  );
}
