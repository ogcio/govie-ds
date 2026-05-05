import { IconProps } from '../types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-facebook-icon' } });

export default function Facebook(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size ?? 24}
      height={props.size ?? 24}
      class={props.className}
      id={props.id}
      role={props.label ? 'img' : undefined}
      aria-label={props.label}
      aria-hidden={!props.label}
      fill={props.color ?? 'currentColor'}
      data-testid={props.dataTestId ?? 'facebook'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 1C5.925 1 1 5.95031 1 12.0565C1 17.5999 5.0625 22.1768 10.356 22.9764V14.987H7.6345V12.0807H10.356V10.1468C10.356 6.9449 11.908 5.53921 14.5555 5.53921C15.8235 5.53921 16.494 5.63369 16.8115 5.67692V8.21389H15.0055C13.8815 8.21389 13.489 9.28486 13.489 10.492V12.0807H16.783L16.336 14.987H13.489V23C18.858 22.2678 23 17.6537 23 12.0565C23 5.95031 18.075 1 12 1Z" />
    </svg>
  );
}
