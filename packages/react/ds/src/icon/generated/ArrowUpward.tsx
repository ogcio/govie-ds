import type { SVGProps } from 'react';

export interface ArrowUpwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowUpward({ size = 24, ...props }: ArrowUpwardProps) {
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
      <path d="M450-160v-526L202-438l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/>
    </svg>
  );
}

export default ArrowUpward;
