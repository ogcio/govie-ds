import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowRightAltProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ArrowRightAlt = forwardRef<SVGSVGElement, ArrowRightAltProps>(
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
      <path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z"/>
    </svg>
  ),
);

ArrowRightAlt.displayName = 'ArrowRightAlt';
export default ArrowRightAlt;
