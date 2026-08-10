import { tv } from 'tailwind-variants';

export type Props = {
  children?: any;
  cite?: string;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  describedBy?: string;
  labelledBy?: string;
};

export default function InsetText(props: Props) {
  return (
    <blockquote
      id={props.id}
      class={classes({ className: props.className })}
      style={props.styles}
      cite={props.cite}
      aria-describedby={props.describedBy || undefined}
      aria-labelledby={props.labelledBy || undefined}
    >
      {props.children}
    </blockquote>
  );
}

const classes = tv({
  base: 'gi-font-primary gi-p-4 gi-border-l-2xl gi-border-gray-500 gi-text-sm md:gi-text-md gi-not-prose',
});
