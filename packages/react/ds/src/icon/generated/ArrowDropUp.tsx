import type { SVGProps } from 'react';

export interface ArrowDropUpProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowDropUp({ size = 24, ...props }: ArrowDropUpProps) {
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
      <path d="m280-400 200-201 200 201H280Z" />
    </svg>
  );
}

export default ArrowDropUp;
