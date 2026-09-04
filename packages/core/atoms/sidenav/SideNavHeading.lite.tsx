import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-side-nav-heading' } });

export type Props = {
  children?: any;
  className?: string;
  id?: string;
  dataTestId?: string;
};

export default function SideNavHeading(props: Props) {
  return (
    <li class="gi-list-none">
      <h5 id={props.id} data-testid={props.dataTestId} class={classes({ class: props.className })}>
        {props.children}
      </h5>
    </li>
  );
}

const classes = tv({
  base: [
    'gi-border-l-sm',
    'gi-text-md',
    'gi-font-bold',
    'gi-mt-2',
    'gi-text-color-text-system-neutral-muted',
    'gi-py-2',
    'gi-border-transparent',
  ],
});
