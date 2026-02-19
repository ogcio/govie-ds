import type { SVGProps } from 'react';

export interface SwapVertProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function SwapVert({ size = 24, ...props }: SwapVertProps) {
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
      <path d="M323-450v-316L202-645l-42-42 193-193 193 193-42 42-121-121v316h-60ZM607-80 414-273l42-42 121 121v-316h60v316l121-121 42 42L607-80Z"/>
    </svg>
  );
}

export default SwapVert;
