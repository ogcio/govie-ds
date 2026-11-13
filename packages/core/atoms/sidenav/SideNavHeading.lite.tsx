import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'core-side-nav-heading' } });

export type Props = {
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function SideNavHeading(props: Props) {
  return (
    <h5 id={props.id} data-testid={props.dataTestId} class={classes({ class: props.className })} style={props.styles}>
      {props.children}
    </h5>
  );
}

const classes = tv({
  base: [
    'gi-border-l-sm',
    'gi-text-md',
    'gi-font-bold',
    'gi-mt-2',
    'gi-text-color-text-system-neutral-muted',
    'gi-px-3',
    'gi-py-2',
    'gi-border-transparent',
  ],
});
