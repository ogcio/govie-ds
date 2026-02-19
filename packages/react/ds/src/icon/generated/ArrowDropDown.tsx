import type { SVGProps } from 'react';

export interface ArrowDropDownProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowDropDown({ size = 24, ...props }: ArrowDropDownProps) {
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
      <path d="M480-360 280-559h400L480-360Z"/>
    </svg>
  );
}

export default ArrowDropDown;
