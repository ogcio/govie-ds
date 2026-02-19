import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface LoginProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Login = forwardRef<SVGSVGElement, LoginProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/>
    </svg>
  ),
);

Login.displayName = 'Login';
export default Login;
