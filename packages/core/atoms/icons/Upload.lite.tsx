import { IconProps } from './types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-upload-icon' } });

export default function Upload(props: IconProps) {
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
      data-testid={props.dataTestId ?? 'upload'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
    </svg>
  );
}
