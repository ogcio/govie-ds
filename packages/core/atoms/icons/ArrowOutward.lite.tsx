import { IconProps } from './types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-arrow-outward-icon' } });

export default function ArrowOutward(props: IconProps) {
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
      data-testid={props.dataTestId ?? 'arrow_outward'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
  );
}
