import { IconProps } from '../types';
import { useMetadata } from '@builder.io/mitosis';

useMetadata({ angular: { selector: 'gi-x-icon' } });

export default function X(props: IconProps) {
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
      data-testid={props.dataTestId ?? 'x_social'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.8623 10.4686L21.1542 2H19.4263L13.0947 9.3532L8.03772 2H2.20508L9.85224 13.1193L2.20508 22H3.93312L10.6194 14.2348L15.96 22H21.7926L13.8623 10.4686ZM4.55576 3.29968H7.20993L19.4271 20.7594H16.7729L4.55576 3.29968Z" />
    </svg>
  );
}
