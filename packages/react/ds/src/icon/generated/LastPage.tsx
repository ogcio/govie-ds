import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface LastPageProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const LastPage = forwardRef<SVGSVGElement, LastPageProps>(
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
      <path d="m272-245-43-43 192-192-192-192 43-43 235 235-235 235Zm388 5v-480h60v480h-60Z"/>
    </svg>
  ),
);

LastPage.displayName = 'LastPage';
export default LastPage;
