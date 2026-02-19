import type { SVGProps } from 'react';

export interface ArrowOutwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowOutward({ size = 24, ...props }: ArrowOutwardProps) {
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
      <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/>
    </svg>
  );
}

export default ArrowOutward;
