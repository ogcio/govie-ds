import { useMetadata } from '@builder.io/mitosis';
import Button from '../Button.lite';

useMetadata({ angular: { selector: 'core-pagination-button' } });

type Props = {
  current?: boolean;
  id?: string;
  className?: string;
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
      <Button
        id={props.id}
        className={props.className}
        variant={props.current ? 'primary' : 'flat'}
        disabled={props.disabled}
        size="lg"
        appearance="dark"
        ariaLabel={props.ariaLabel}
        ariaCurrent={props.current}
        onClick={(event) => props.onClick && props.onClick(event)}
        onFocus={(event) => props.onFocus && props.onFocus(event)}
        onBlur={(event) => props.onBlur && props.onBlur(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </Button>
    </li>
  );
}
