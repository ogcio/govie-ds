import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowOutwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ArrowOutward = forwardRef<SVGSVGElement, ArrowOutwardProps>(
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
      <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/>
    </svg>
  ),
);

ArrowOutward.displayName = 'ArrowOutward';
export default ArrowOutward;
