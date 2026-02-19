import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowBackProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowBack = forwardRef<SVGSVGElement, ArrowBackProps>(
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
      <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z"/>
    </svg>
  ),
);

ArrowBack.displayName = 'ArrowBack';
export default ArrowBack;
