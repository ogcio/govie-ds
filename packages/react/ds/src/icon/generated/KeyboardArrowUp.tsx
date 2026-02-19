import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface KeyboardArrowUpProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const KeyboardArrowUp = forwardRef<SVGSVGElement, KeyboardArrowUpProps>(
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
      <path d="M480-554 283-357l-43-43 240-240 240 240-43 43-197-197Z"/>
    </svg>
  ),
);

KeyboardArrowUp.displayName = 'KeyboardArrowUp';
export default KeyboardArrowUp;
