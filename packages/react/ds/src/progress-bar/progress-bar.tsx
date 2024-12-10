import { useId } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';

export type ProgressBarProps = {
  finalValue?: number;
  currentValue?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green';
  isIndeterminate?: boolean;
  label?: string;
};

const progressBarStyles = tv({
  variants: {
    size: {
      sm: 'gi-h-2',
      md: 'gi-h-4',
      lg: 'gi-h-6',
    },
    color: {
      blue: 'gi-bg-blue-500',
      green: 'gi-bg-emerald-800',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'green',
  },
});

export function ProgressBar({
  currentValue = 0,
  finalValue = 100,
  size = 'sm',
  color = 'blue',
  isIndeterminate,
  label,
}: ProgressBarProps) {
  const fillPercentage = (currentValue * 100) / finalValue;

  return (
    <div className="gi-progress-bar-container">
      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : currentValue}
        aria-valuemin={0}
        aria-valuemax={finalValue}
        aria-labelledby={`progress-bar-${useId()}`}
        aria-label="Progress bar"
        data-testid="progress-bar"
        className={cn('gi-progress-bar', progressBarStyles({ size }))}
      >
        <div
          className={cn(progressBarStyles({ color, size }), {
            'gi-progress-bar-indeterminate': isIndeterminate,
          })}
          style={isIndeterminate ? {} : { width: `${fillPercentage}%` }}
        />
      </div>
      {label ? <span>{label}</span> : null}
    </div>
  );
}
