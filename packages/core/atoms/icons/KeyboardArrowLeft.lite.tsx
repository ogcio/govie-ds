import { IconProps } from './types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-keyboard-arrow-left-icon' } });

export default function KeyboardArrowLeft(props: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={props.size ?? 24}
      height={props.size ?? 24}
      class={props.className}
      id={props.id}
      role={props.label ? 'img' : undefined}
      aria-label={props.label}
      aria-hidden={!props.label}
      fill={props.color ?? 'currentColor'}
      data-testid={props.dataTestId ?? 'keyboard_arrow_left'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  );
}
