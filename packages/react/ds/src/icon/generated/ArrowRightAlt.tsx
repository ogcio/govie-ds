import type { SVGProps } from 'react';

export interface ArrowRightAltProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowRightAlt({ size = 24, ...props }: ArrowRightAltProps) {
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
      <path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" />
    </svg>
  );
}

export default ArrowRightAlt;
