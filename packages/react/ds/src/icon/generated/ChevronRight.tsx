import type { SVGProps } from 'react';

export interface ChevronRightProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ChevronRight({ size = 24, ...props }: ChevronRightProps) {
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
      <path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/>
    </svg>
  );
}

export default ChevronRight;
