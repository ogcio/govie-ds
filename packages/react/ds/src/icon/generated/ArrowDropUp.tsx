import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowDropUpProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowDropUp = forwardRef<SVGSVGElement, ArrowDropUpProps>(
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
      <path d="m280-400 200-201 200 201H280Z"/>
    </svg>
  ),
);

ArrowDropUp.displayName = 'ArrowDropUp';
export default ArrowDropUp;
