import type { SVGProps } from 'react';

export interface CheckProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function Check({ size = 24, ...props }: CheckProps) {
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
      <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
    </svg>
  );
}

export default Check;
