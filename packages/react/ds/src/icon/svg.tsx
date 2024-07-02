import { ReactNode } from 'react';

export type SvgProps = {
  width: number | string;
  height: number | string;
  children: ReactNode;
} & React.ComponentProps<'svg'>;

export function Svg({ width, height, children, ...props }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}
