import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-footer' } });

export type Props = {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function Footer(props: Props) {
  return (
    <footer
      id={props.id}
      class={props.className}
      style={props.styles}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      data-testid={props.dataTestId}
    >
      {props.children}
    </footer>
  );
}
