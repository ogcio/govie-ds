import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-side-nav' } });

export type Props = {
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  dataTestId?: string;
};

export default function SideNav(props: Props) {
  return (
    <nav
      id={props.id}
      class={props.className}
      style={props.styles}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      data-testid={props.dataTestId}
    >
      <ul class={listClasses()}>{props.children}</ul>
    </nav>
  );
}

const listClasses = tv({
  base: 'gi-list-none gi-p-0 gi-m-0',
});
