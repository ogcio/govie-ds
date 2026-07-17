import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-header-nav' } });

export type Props = {
  children: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  ariaLabel: string;
  dataTestId?: string;
};

export default function HeaderNav(props: Props) {
  return (
    <nav
      id={props.id}
      class={classes({ className: props.className })}
      style={props.styles}
      aria-label={props.ariaLabel}
      data-testid={props.dataTestId}
    >
      <ul class="gi-list-none gi-flex gi-items-center gi-m-0 gi-p-0 gi-gap-2">{props.children}</ul>
    </nav>
  );
}

const classes = tv({
  base: 'gi-flex gi-items-center gi-flex-none',
});
