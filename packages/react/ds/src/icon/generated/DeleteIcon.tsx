import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface DeleteIconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const DeleteIcon = forwardRef<SVGSVGElement, DeleteIconProps>(
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
      <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
    </svg>
  ),
);

DeleteIcon.displayName = 'DeleteIcon';
export default DeleteIcon;
