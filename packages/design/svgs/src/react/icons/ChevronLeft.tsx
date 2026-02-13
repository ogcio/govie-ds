import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ChevronLeftProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ChevronLeft = forwardRef<SVGSVGElement, ChevronLeftProps>(
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
      <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/>
    </svg>
  ),
);

ChevronLeft.displayName = 'ChevronLeft';
export default ChevronLeft;
