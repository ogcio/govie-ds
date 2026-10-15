import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes from './PaginationButton.styles';

useDefaultProps({
  current: undefined,
});

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
  dataTestId?: string;
};

export default function PaginationButton(props: Props) {
  return (
    <li>
      <button
        type="button"
        id={props.id}
        class={classes({
          variant: props.current ? 'primary' : 'flat',
          disabled: !!props.disabled,
          className: props.className,
        })}
        style={props.styles}
        disabled={props.disabled || undefined}
        aria-label={props.ariaLabel}
        aria-current={props.current}
        onClick={(event) => props.onClick && props.onClick(event)}
        onFocus={(event) => props.onFocus && props.onFocus(event)}
        onBlur={(event) => props.onBlur && props.onBlur(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
        data-testid={props.dataTestId}
      >
        {props.children}
      </button>
    </li>
  );
}
