import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-header' } });

export type Props = {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function Header(props: Props) {
  return (
    <header
      id={props.id}
      class={headerStyles({ className: props.className })}
      style={props.styles}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      data-testid={props.dataTestId}
    >
      {props.children}
    </header>
  );
}

const headerStyles = tv({
  base: 'gi-grid gi-relative gi-overflow-x-clip gi-w-full gi-font-primary',
});
