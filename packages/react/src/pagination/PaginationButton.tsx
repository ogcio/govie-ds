import CorePaginationButton, { type Props } from '@/atoms/pagination/PaginationButton';

export type PaginationButtonProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function PaginationButton({ style, ...props }: PaginationButtonProps) {
  return <CorePaginationButton {...props} styles={style as Record<string, string>} />;
}
