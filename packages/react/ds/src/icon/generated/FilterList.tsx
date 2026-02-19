import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface FilterListProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const FilterList = forwardRef<SVGSVGElement, FilterListProps>(
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
      <path d="M400-240v-60h160v60H400ZM240-450v-60h480v60H240ZM120-660v-60h720v60H120Z"/>
    </svg>
  ),
);

FilterList.displayName = 'FilterList';
export default FilterList;
