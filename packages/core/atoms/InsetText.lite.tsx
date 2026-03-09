export type Props = {
  id?: string;
  children: any;
  cite?: string;
  describedBy?: string;
  labelledBy?: string;
};

export default function InsetText(props: Props) {
  return (
    <blockquote
      id={props.id}
      class="gi-p-4 gi-border-l-2xl gi-border-gray-500 gi-text-sm md:gi-text-md gi-not-prose"
      cite={props.cite}
      aria-describedby={props.describedBy || undefined}
      aria-labelledby={props.labelledBy || undefined}
    >
      {props.children}
    </blockquote>
  );
}
