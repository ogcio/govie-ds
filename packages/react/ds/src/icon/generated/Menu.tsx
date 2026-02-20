import type { SVGProps } from 'react';

export interface MenuProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function Menu({ size = 24, ...props }: MenuProps) {
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
      <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
    </svg>
  );
}

export default Menu;
