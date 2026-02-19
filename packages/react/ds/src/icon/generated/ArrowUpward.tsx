import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowUpwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowUpward = forwardRef<SVGSVGElement, ArrowUpwardProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M450-160v-526L202-438l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/>
    </svg>
  ),
);

ArrowUpward.displayName = 'ArrowUpward';
export default ArrowUpward;
