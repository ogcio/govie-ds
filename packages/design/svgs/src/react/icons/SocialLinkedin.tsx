import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface SocialLinkedinProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const SocialLinkedin = forwardRef<SVGSVGElement, SocialLinkedinProps>(
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
    d="M21.3719 1C22.2689 1 22.9994 1.71022 22.9994 2.58626V21.4125C22.9994 22.2886 22.2689 23 21.3719 23H2.62264C1.72745 23 1 22.2886 1 21.4125V2.58626C1 1.71022 1.72745 1 2.62264 1H21.3719ZM19.7469 19.7463V13.9885C19.7469 11.1609 19.1364 8.98705 15.8326 8.98705C14.2451 8.98705 13.1804 9.8575 12.7453 10.6828H12.7007V9.24759H9.57286V19.7463H12.8319V14.5536C12.8319 13.184 13.091 11.8571 14.7888 11.8571C16.4633 11.8571 16.4843 13.4233 16.4843 14.6408V19.7463H19.7469ZM7.52588 9.24759H4.25963V19.7463H7.52588V9.24759ZM5.89362 4.02869C4.84566 4.02869 4.00064 4.87646 4.00064 5.92085C4.00064 6.9655 4.84566 7.81323 5.89362 7.81323C6.93745 7.81323 7.78488 6.9655 7.78488 5.92085C7.78488 4.87646 6.93745 4.02869 5.89362 4.02869Z"
    fill="#0B0C0C"
  />
    </svg>
  ),
);

SocialLinkedin.displayName = 'SocialLinkedin';
export default SocialLinkedin;
