import { useMetadata } from '@builder.io/mitosis';
import classes from './PaginationButton.styles';

useMetadata({ angular: { selector: 'core-pagination-link' } });

export type Props = {
  current?: boolean;
  href: string;
  id?: string;
  className?: string;
  styles?: Record<string, string>;
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
      <a
        href={props.href}
        id={props.id}
        class={classes({ variant: props.current ? 'primary' : 'flat', className: props.className })}
        style={props.styles}
        aria-current={props.current ? 'page' : undefined}
        aria-label={props.ariaLabel}
        onClick={(event) => props.onClick && props.onClick(event)}
        onFocus={(event) => props.onFocus && props.onFocus(event)}
        onBlur={(event) => props.onBlur && props.onBlur(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </a>
    </li>
  );
}
