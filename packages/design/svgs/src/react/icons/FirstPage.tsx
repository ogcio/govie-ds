import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface FirstPageProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const FirstPage = forwardRef<SVGSVGElement, FirstPageProps>(
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
      <path d="M240-240v-480h60v480h-60Zm447-3L453-477l234-234 43 43-191 191 191 191-43 43Z"/>
    </svg>
  ),
);

FirstPage.displayName = 'FirstPage';
export default FirstPage;
