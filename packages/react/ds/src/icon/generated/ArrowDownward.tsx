import type { SVGProps } from 'react';

export interface ArrowDownwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowDownward({ size = 24, ...props }: ArrowDownwardProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M450-800v526L202-522l-42 42 320 320 320-320-42-42-248 248v-526h-60Z"/>
    </svg>
  );
}

export default ArrowDownward;
