import type { SVGProps } from 'react';

export interface LogoutProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function Logout({ size = 24, ...props }: LogoutProps) {
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
      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/>
    </svg>
  );
}

export default Logout;
