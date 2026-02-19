import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowOutwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowOutward = forwardRef<SVGSVGElement, ArrowOutwardProps>(
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
      <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/>
    </svg>
  ),
);

ArrowOutward.displayName = 'ArrowOutward';
export default ArrowOutward;
