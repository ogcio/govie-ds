import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-side-nav' } });

export type Props = {
  children?: any;
  ariaLabel?: string;
  className?: string;
  id?: string;
  dataTestId?: string;
};

export default function SideNav(props: Props) {
  return (
    <nav
      id={props.id}
      class={`gi-max-w-[400px] ${props.className}`}
      aria-label={props.ariaLabel}
      data-testid={props.dataTestId}
    >
      <ul class="gi-list-none gi-p-0 gi-m-0">{props.children}</ul>
    </nav>
  );
}
