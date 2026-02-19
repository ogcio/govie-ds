import type { SVGProps } from 'react';

export interface SpaceDashboardProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function SpaceDashboard({ size = 24, ...props }: SpaceDashboardProps) {
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
      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h270v-600H180v600Zm330 0h270v-301H510v301Zm0-361h270v-239H510v239Z"/>
    </svg>
  );
}

export default SpaceDashboard;
