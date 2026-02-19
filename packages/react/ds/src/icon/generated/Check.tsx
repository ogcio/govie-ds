import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface CheckProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Check = forwardRef<SVGSVGElement, CheckProps>(
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
      <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
    </svg>
  ),
);

Check.displayName = 'Check';
export default Check;
