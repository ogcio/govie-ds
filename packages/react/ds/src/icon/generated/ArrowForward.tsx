import type { SVGProps } from 'react';

export interface ArrowForwardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowForward({ size = 24, ...props }: ArrowForwardProps) {
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
      <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" />
    </svg>
  );
}

export default ArrowForward;
