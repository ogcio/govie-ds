import CoreEllipsis from '@/atoms/breadcrumbs/BreadcrumbEllipsis';
import type { Props } from '@/atoms/breadcrumbs/BreadcrumbEllipsis';

export type BreadcrumbEllipsisProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function BreadcrumbEllipsis({ style, ...props }: BreadcrumbEllipsisProps) {
  return <CoreEllipsis {...props} styles={style as Record<string, string>} />;
}
