import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import { buttonClasses } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'core-header-nav-item-button' } });

useDefaultProps({
  ariaExpanded: undefined,
});

export type Props = {
  children?: any;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  dataTestId?: string;
};

export default function HeaderNavItemButton(props: Props) {
  return (
    <button
      type="button"
      id={props.id}
      class={buttonClasses({ className: props.className })}
      style={props.styles}
      aria-label={props.ariaLabel}
      aria-expanded={props.ariaExpanded}
      aria-controls={props.ariaControls}
      data-testid={props.dataTestId}
      onClick={(event) => props.onClick && props.onClick(event)}
      onFocus={(event) => props.onFocus && props.onFocus(event)}
      onBlur={(event) => props.onBlur && props.onBlur(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
    >
      {props.children}
    </button>
  );
}
