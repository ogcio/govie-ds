import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface SocialBlueskyProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const SocialBluesky = forwardRef<SVGSVGElement, SocialBlueskyProps>(
  ({ size = 24, title, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
    d="M5.76884 3.30802C8.29094 5.20793 11.0042 9.05965 12 11.1266V16.5861C12 16.4699 11.9553 16.6012 11.8591 16.8841C11.3393 18.4158 9.30912 24.394 4.66678 19.6148C2.22237 17.0986 3.354 14.5823 7.8035 13.8226C5.25803 14.2571 2.39631 13.5391 1.61119 10.7237C1.385 9.91387 1 4.92537 1 4.25162C1 0.876681 3.94903 1.93749 5.76884 3.30802ZM18.2312 3.30802C15.7091 5.20793 12.9958 9.05965 12 11.1266V16.5861C12 16.4699 12.0447 16.6012 12.1409 16.8841C12.6607 18.4158 14.6909 24.394 19.3332 19.6148C21.7776 17.0986 20.646 14.5823 16.1965 13.8226C18.742 14.2571 21.6037 13.5391 22.3888 10.7237C22.615 9.91387 23 4.92537 23 4.25162C23 0.876681 20.0513 1.93749 18.2312 3.30802Z"
    fill="#0B0C0C"
  />
    </svg>
  ),
);

SocialBluesky.displayName = 'SocialBluesky';
export default SocialBluesky;
