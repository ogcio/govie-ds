import type { SVGProps } from 'react';

export interface ChevronLeftProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ChevronLeft({ size = 24, ...props }: ChevronLeftProps) {
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
      <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
    </svg>
  );
}

export default ChevronLeft;
