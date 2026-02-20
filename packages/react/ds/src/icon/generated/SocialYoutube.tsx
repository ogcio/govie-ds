import type { SVGProps } from 'react';

export interface SocialYoutubeProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function SocialYoutube({ size = 24, ...props }: SocialYoutubeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <g clipPath="url(#clip0_4049_2553)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.3682 4.50455C22.4045 4.79091 23.2227 5.60909 23.4955 6.64545C24 8.52727 24 12.4545 24 12.4545C24 12.4545 24 16.3818 23.5091 18.2636C23.2227 19.3136 22.4182 20.1318 21.3818 20.4045C19.5 20.9091 12 20.9091 12 20.9091C12 20.9091 4.5 20.9091 2.63182 20.4045C1.59545 20.1182 0.777273 19.3 0.504545 18.2636C0 16.3818 0 12.4545 0 12.4545C0 12.4545 0 8.52727 0.490909 6.64545C0.777273 5.59545 1.58182 4.77727 2.61818 4.50455C4.5 4 12 4 12 4C12 4 19.5 4 21.3682 4.50455ZM15.8182 12.4546L9.54545 8.88182V16.0273L15.8182 12.4546Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4049_2553">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SocialYoutube;
