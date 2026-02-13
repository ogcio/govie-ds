import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowDropDownProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ArrowDropDown = forwardRef<SVGSVGElement, ArrowDropDownProps>(
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
      <path d="M480-360 280-559h400L480-360Z"/>
    </svg>
  ),
);

ArrowDropDown.displayName = 'ArrowDropDown';
export default ArrowDropDown;
