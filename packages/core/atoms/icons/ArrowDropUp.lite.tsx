import { IconProps } from './types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-arrow-drop-up-icon' } });

export default function ArrowDropUp(props: IconProps) {
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
      data-testid={props.dataTestId ?? 'arrow-drop-up'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m280-400 200-200 200 200H280Z" />
    </svg>
  );
}
