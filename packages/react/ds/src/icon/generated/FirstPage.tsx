import type { SVGProps } from 'react';

export interface FirstPageProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function FirstPage({ size = 24, ...props }: FirstPageProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M240-240v-480h60v480h-60Zm447-3L453-477l234-234 43 43-191 191 191 191-43 43Z"/>
    </svg>
  );
}

export default FirstPage;
