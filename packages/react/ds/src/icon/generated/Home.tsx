import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface HomeProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Home = forwardRef<SVGSVGElement, HomeProps>(
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
      <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/>
    </svg>
  ),
);

Home.displayName = 'Home';
export default Home;
