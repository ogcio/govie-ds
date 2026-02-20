import type { SVGProps } from 'react';

export interface SendProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function Send({ size = 24, ...props }: SendProps) {
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
      <path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z" />
    </svg>
  );
}

export default Send;
