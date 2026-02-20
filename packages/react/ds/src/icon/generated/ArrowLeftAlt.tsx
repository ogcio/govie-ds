import type { SVGProps } from 'react';

export interface ArrowLeftAltProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowLeftAlt({ size = 24, ...props }: ArrowLeftAltProps) {
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
      <path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z" />
    </svg>
  );
}

export default ArrowLeftAlt;
