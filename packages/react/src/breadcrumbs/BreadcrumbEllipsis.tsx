import CoreBreadcrumbEllipsis, { type Props } from '@/atoms/breadcrumbs/BreadcrumbEllipsis';
import CoreBreadcrumbItem from '@/atoms/breadcrumbs/BreadcrumbItem';

export type BreadcrumbEllipsisProps = Props & {
  style?: React.CSSProperties;
};

export default function BreadcrumbEllipsis({ style, ...props }: BreadcrumbEllipsisProps) {
  return (
    <CoreBreadcrumbItem styles={style as Record<string, string>} ariaHidden={!props.label || undefined}>
      <CoreBreadcrumbEllipsis {...props} />
    </CoreBreadcrumbItem>
  );
}
