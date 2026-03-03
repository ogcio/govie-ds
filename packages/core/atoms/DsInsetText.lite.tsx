export type Props = {
  id?: string;
  children?: any;
  cite?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
};

export default function DsInsetText(props: Props) {
  return (
    <blockquote
      id={props.id}
      class="gi-p-4 gi-border-l-2xl gi-border-gray-500 gi-text-sm md:gi-text-md gi-not-prose"
      cite={props.cite}
      aria-describedby={props.ariaDescribedBy || undefined}
      aria-labelledby={props.ariaLabelledBy || undefined}
      aria-label={
        props.ariaLabelledBy ? undefined : props.ariaLabel || undefined
      }
    >
      {props.children}
    </blockquote>
  );
}
