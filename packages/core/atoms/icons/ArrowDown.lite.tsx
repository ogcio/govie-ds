import { IconProps } from './types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-arrow-down-icon' } });

export default function ArrowDown(props: IconProps) {
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
      data-testid={props.dataTestId ?? 'arrow_down'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
    </svg>
  );
}
