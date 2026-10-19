import CorePaginationLink, { type Props } from '@/atoms/pagination/PaginationLink';

export type PaginationLinkProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function PaginationLink({ style, ...props }: PaginationLinkProps) {
  return <CorePaginationLink {...props} styles={style as Record<string, string>} />;
}
