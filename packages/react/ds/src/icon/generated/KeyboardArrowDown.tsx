import type { SVGProps } from 'react';

export interface KeyboardArrowDownProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function KeyboardArrowDown({
  size = 24,
  ...props
}: KeyboardArrowDownProps) {
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
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
    </svg>
  );
}

export default KeyboardArrowDown;
