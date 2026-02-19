import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ChevronRightProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ChevronRight = forwardRef<SVGSVGElement, ChevronRightProps>(
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
      <path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/>
    </svg>
  ),
);

ChevronRight.displayName = 'ChevronRight';
export default ChevronRight;
