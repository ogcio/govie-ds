'use client';
import { IconSize } from '../index.js';

export type SpinnerPropTypes = {
  size?: IconSize;
  inline?: boolean;
};

export function Spinner({ size = 'md', inline = false }: SpinnerPropTypes) {
  const sizeClass = (() => {
    switch (size) {
      case 'sm': {
        return 'gi-w-4 gi-h-4';
      }
      case 'lg': {
        return 'gi-w-8 gi-h-8';
      }
      case 'xl': {
        return 'gi-w-10 gi-h-10';
      }
      default: {
        return 'gi-w-6 gi-h-6';
      }
    }
  })();
  const display = inline ? '' : 'gi-block';

  return (
    <svg
      className={`gi-stroke-inherit ${display} ${sizeClass}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          stroke-width="3"
          stroke-linecap="round"
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
