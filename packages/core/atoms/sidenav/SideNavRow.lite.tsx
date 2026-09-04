import { useMetadata } from '@builder.io/mitosis';
export type Props = {
  children?: any;
  ariaHidden?: boolean | 'true' | 'false';
};

useMetadata({ angular: { selector: 'gi-side-nav-row' } });

export default function SideNavRow(props: Props) {
  return (
    <li class="gi-list-none gi-mt-1 gi-relative" aria-hidden={props.ariaHidden}>
      {props.children}
    </li>
  );
}
