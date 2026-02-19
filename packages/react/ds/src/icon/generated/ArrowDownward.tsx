import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowDownwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowDownward = forwardRef<SVGSVGElement, ArrowDownwardProps>(
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
      <path d="M450-800v526L202-522l-42 42 320 320 320-320-42-42-248 248v-526h-60Z"/>
    </svg>
  ),
);

ArrowDownward.displayName = 'ArrowDownward';
export default ArrowDownward;
