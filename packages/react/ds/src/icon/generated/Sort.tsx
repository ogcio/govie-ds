import type { SVGProps } from 'react';

export interface SortProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function Sort({ size = 24, ...props }: SortProps) {
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
      <path d="M120-240v-60h240v60H120Zm0-210v-60h480v60H120Zm0-210v-60h720v60H120Z" />
    </svg>
  );
}

export default Sort;
