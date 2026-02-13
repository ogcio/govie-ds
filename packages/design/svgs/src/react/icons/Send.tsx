import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface SendProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const Send = forwardRef<SVGSVGElement, SendProps>(
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
      <path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z"/>
    </svg>
  ),
);

Send.displayName = 'Send';
export default Send;
