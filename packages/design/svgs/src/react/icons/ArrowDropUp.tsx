import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ArrowDropUpProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ArrowDropUp = forwardRef<SVGSVGElement, ArrowDropUpProps>(
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
      <path d="m280-400 200-201 200 201H280Z"/>
    </svg>
  ),
);

ArrowDropUp.displayName = 'ArrowDropUp';
export default ArrowDropUp;
