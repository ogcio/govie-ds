import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface UnfoldMoreProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const UnfoldMore = forwardRef<SVGSVGElement, UnfoldMoreProps>(
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
      <path d="M480-120 300-300l44-44 136 136 136-136 44 44-180 180ZM344-612l-44-44 180-180 180 180-44 44-136-136-136 136Z"/>
    </svg>
  ),
);

UnfoldMore.displayName = 'UnfoldMore';
export default UnfoldMore;
