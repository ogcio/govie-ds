import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface MailProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const Mail = forwardRef<SVGSVGElement, MailProps>(
  ({ size = 24, title, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"/>
    </svg>
  ),
);

Mail.displayName = 'Mail';
export default Mail;
