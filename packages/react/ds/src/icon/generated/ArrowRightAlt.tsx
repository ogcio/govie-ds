import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowRightAltProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowRightAlt = forwardRef<SVGSVGElement, ArrowRightAltProps>(
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
      <path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z"/>
    </svg>
  ),
);

ArrowRightAlt.displayName = 'ArrowRightAlt';
export default ArrowRightAlt;
