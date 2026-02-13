import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowForwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ArrowForward = forwardRef<SVGSVGElement, ArrowForwardProps>(
  ({ size = 24, title, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z"/>
    </svg>
  ),
);

ArrowForward.displayName = 'ArrowForward';
export default ArrowForward;
