import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface SortProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Sort = forwardRef<SVGSVGElement, SortProps>(
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
      <path d="M120-240v-60h240v60H120Zm0-210v-60h480v60H120Zm0-210v-60h720v60H120Z"/>
    </svg>
  ),
);

Sort.displayName = 'Sort';
export default Sort;
