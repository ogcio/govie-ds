import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface DownloadProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const Download = forwardRef<SVGSVGElement, DownloadProps>(
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
      <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"/>
    </svg>
  ),
);

Download.displayName = 'Download';
export default Download;
