import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface CloseProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Close = forwardRef<SVGSVGElement, CloseProps>(
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
      <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
    </svg>
  ),
);

Close.displayName = 'Close';
export default Close;
