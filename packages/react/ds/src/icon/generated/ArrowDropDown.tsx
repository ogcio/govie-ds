import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowDropDownProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowDropDown = forwardRef<SVGSVGElement, ArrowDropDownProps>(
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
      <path d="M480-360 280-559h400L480-360Z"/>
    </svg>
  ),
);

ArrowDropDown.displayName = 'ArrowDropDown';
export default ArrowDropDown;
