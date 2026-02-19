import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface LinkProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Link = forwardRef<SVGSVGElement, LinkProps>(
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
      <path d="M432-288H288q-79.68 0-135.84-56.23T96-480.23q0-79.77 56.16-135.77T288-672h144v72H288q-50 0-85 35t-35 85q0 50 35 85t85 35h144v72Zm-96-156v-72h288v72H336Zm192 156v-72h144q50 0 85-35t35-85q0-50-35-85t-85-35H528v-72h144q79.68 0 135.84 56.23T864-479.77q0 79.77-56.16 135.77T672-288H528Z"/>
    </svg>
  ),
);

Link.displayName = 'Link';
export default Link;
