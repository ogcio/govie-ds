import type { SVGProps } from 'react';

export interface KeyboardArrowUpProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function KeyboardArrowUp({ size = 24, ...props }: KeyboardArrowUpProps) {
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
      <path d="M480-554 283-357l-43-43 240-240 240 240-43 43-197-197Z"/>
    </svg>
  );
}

export default KeyboardArrowUp;
