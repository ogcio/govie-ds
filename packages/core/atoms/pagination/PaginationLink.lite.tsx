import { useMetadata } from '@builder.io/mitosis';
import LinkButton from '../LinkButton.lite';

useMetadata({ angular: { selector: 'core-pagination-link' } });

type Props = {
  current?: boolean;
  href: string;
  id?: string;
  className?: string;
  children: any;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  ariaLabel?: string;
};

export default function PaginationLink(props: Props) {
  return (
    <li>
      <LinkButton
        href={props.href}
        id={props.id}
        className={props.className}
        variant={props.current ? 'primary' : 'flat'}
        ariaCurrent={props.current ? 'page' : undefined}
        size="lg"
        appearance="dark"
        ariaLabel={props.ariaLabel}
        onClick={(event) => props.onClick && props.onClick(event)}
        onFocus={(event) => props.onFocus && props.onFocus(event)}
        onBlur={(event) => props.onBlur && props.onBlur(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </LinkButton>
    </li>
  );
}
