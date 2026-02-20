import type { SVGProps } from 'react';

export interface FilterListProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function FilterList({ size = 24, ...props }: FilterListProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M400-240v-60h160v60H400ZM240-450v-60h480v60H240ZM120-660v-60h720v60H120Z" />
    </svg>
  );
}

export default FilterList;
