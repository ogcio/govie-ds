import { useMetadata } from '@builder.io/mitosis';
import { parentList } from './BreadcrumbLink.styles';

useMetadata({ angular: { selector: 'gi-breadcrumbs' } });

export type Props = {
  id?: string;
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  dataTestId?: string;
};

export default function Breadcrumbs(props: Props) {
  return (
    <nav
      id={props.id}
      class={props.className}
      style={props.styles}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      data-testid={props.dataTestId}
    >
      <ol class={parentList()}>{props.children}</ol>
    </nav>
  );
}
