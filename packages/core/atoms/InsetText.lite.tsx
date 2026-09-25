import { useMetadata } from '@builder.io/mitosis';
import classes from './InsetText.styles';

useMetadata({ angular: { selector: 'gi-inset-text' } });

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
