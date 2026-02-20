import type { SVGProps } from 'react';

export interface CloseProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function Close({ size = 24, ...props }: CloseProps) {
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
      <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </svg>
  );
}

export default Close;
