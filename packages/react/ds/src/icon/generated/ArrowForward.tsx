import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowForwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowForward = forwardRef<SVGSVGElement, ArrowForwardProps>(
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
      <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z"/>
    </svg>
  ),
);

ArrowForward.displayName = 'ArrowForward';
export default ArrowForward;
