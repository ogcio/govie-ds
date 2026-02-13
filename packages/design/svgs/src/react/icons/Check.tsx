import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface CheckProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const Check = forwardRef<SVGSVGElement, CheckProps>(
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
      <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
    </svg>
  ),
);

Check.displayName = 'Check';
export default Check;
