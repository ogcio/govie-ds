import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-box' } });

export type Props = {
  className?: string;
  children?: any;
  id?: string;
  dataTestId?: string;
  role?: 'region' | 'navigation' | 'complementary' | 'search' | 'form' | 'group';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  styles?: Record<string, string>;
};

export default function Box(props: Props) {
  return (
    <div
      id={props.id}
      class={props.className}
      role={props.role}
      aria-label={props.role ? props.ariaLabel : undefined}
      aria-labelledby={props.role ? props.ariaLabelledBy : undefined}
      style={props.styles}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}
