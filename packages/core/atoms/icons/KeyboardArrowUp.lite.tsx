import { IconProps } from './types';


export default function KeyboardArrowUp (props: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={props.size ?? 24}
      height={props.size ?? 24}
      class={props.className}
      id={props.id}
      role={props.role}
      aria-label={props.ariaLabel}
      aria-hidden={props.ariaHidden ?? 'true'}
      fill={props.color ?? 'currentColor'}
      data-testid={props.dataTestId ?? 'keyboard_arrow_up'}
    >
      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
    </svg>
  );
}
