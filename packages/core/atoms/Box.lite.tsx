import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-box' } });

export type Props = {
  className?: string;
  children?: any;
  id?: string;
  dataTestId?: string;
};

export default function Box(props: Props) {
  return (
    <div id={props.id} class={props.className} data-testid={props.dataTestId}>
      {props.children}
    </div>
  );
}
