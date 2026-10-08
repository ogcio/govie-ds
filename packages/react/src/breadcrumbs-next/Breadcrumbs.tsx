import CoreBreadcrumbs from '@/atoms/breadcrumbs/Breadcrumbs';
import type { Props } from '@/atoms/breadcrumbs/Breadcrumbs';

export type BreadcrumbProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function Breadcrumbs({ style, ...props }: BreadcrumbProps) {
  return <CoreBreadcrumbs {...props} styles={style as Record<string, string>} />;
}
