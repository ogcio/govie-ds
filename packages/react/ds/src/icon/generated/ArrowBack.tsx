import type { SVGProps } from 'react';

export interface ArrowBackProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ArrowBack({ size = 24, ...props }: ArrowBackProps) {
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
      <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z"/>
    </svg>
  );
}

export default ArrowBack;
