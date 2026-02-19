import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface KeyboardArrowDownProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const KeyboardArrowDown = forwardRef<SVGSVGElement, KeyboardArrowDownProps>(
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
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z"/>
    </svg>
  ),
);

KeyboardArrowDown.displayName = 'KeyboardArrowDown';
export default KeyboardArrowDown;
