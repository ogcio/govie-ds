import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'core-pagination' } });

export type Props = {
  id?: string;
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  dataTestId?: string;
};

export default function Pagination(props: Props) {
  return (
    <nav
      id={props.id}
      class={props.className}
      style={props.styles}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      data-testid={props.dataTestId}
    >
      <ol class="gi-list-none gi-flex gi-items-center gi-justify-center gi-gap-2">{props.children}</ol>
    </nav>
  );
}
