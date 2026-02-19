import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowLeftAltProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ArrowLeftAlt = forwardRef<SVGSVGElement, ArrowLeftAltProps>(
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
      <path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z"/>
    </svg>
  ),
);

ArrowLeftAlt.displayName = 'ArrowLeftAlt';
export default ArrowLeftAlt;
