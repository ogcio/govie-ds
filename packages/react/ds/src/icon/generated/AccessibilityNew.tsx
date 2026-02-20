import type { SVGProps } from 'react';

export interface AccessibilityNewProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function AccessibilityNew({
  size = 24,
  ...props
}: AccessibilityNewProps) {
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
      <path d="M480.08-734q-30.08 0-51.58-21.42t-21.5-51.5q0-30.08 21.42-51.58t51.5-21.5q30.08 0 51.58 21.42t21.5 51.5q0 30.08-21.42 51.58t-51.5 21.5ZM373-80v-533q-68-5-131.5-14T120-650l15-60q85 20 169 28.5t176 8.5q92 0 176-8.5T825-710l15 60q-58 14-121.5 23T587-612.88V-80h-60v-260h-94v260h-60Z" />
    </svg>
  );
}

export default AccessibilityNew;
