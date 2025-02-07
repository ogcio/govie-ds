'use client';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';

export const spinnerSizeVariants = {
  xl: 'gi-w-10 gi-h-10',
  lg: 'gi-w-8 gi-h-8',
  md: 'gi-w-6 gi-h-6',
  sm: 'gi-w-4 gi-h-4',
};

const spinnerVariants = tv({
  variants: {
    size: spinnerSizeVariants,
  },
});

export type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  inline?: boolean;
  dataTestid?: string;
};

export function Spinner({
  size = 'md',
  inline = false,
  dataTestid,
}: SpinnerProps) {
  const display = inline ? '' : 'gi-block';
  const sizeClasses = spinnerVariants({ size });

  return (
    <svg
      role="status"
      className={cn(display, sizeClasses)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-testid={dataTestid}
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
