import { useMetadata } from '@builder.io/mitosis';
import classes from './PaginationButton.styles';

useMetadata({ angular: { selector: 'core-pagination-button' } });

export type Props = {
  current?: boolean;
  id?: string;
  className?: string;
  styles?: Record<string, string>;
  children: any;
  disabled?: boolean;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  ariaLabel?: string;
};

export default function PaginationButton(props: Props) {
  return (
    <li>
      <button
        id={props.id}
        class={classes({
          variant: props.current ? 'primary' : 'flat',
          className: props.className,
          disabled: props.disabled,
        })}
        style={props.styles}
        disabled={props.disabled}
        aria-label={props.ariaLabel}
        aria-current={props.current}
        onClick={(event) => props.onClick && props.onClick(event)}
        onFocus={(event) => props.onFocus && props.onFocus(event)}
        onBlur={(event) => props.onBlur && props.onBlur(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </button>
    </li>
  );
}
