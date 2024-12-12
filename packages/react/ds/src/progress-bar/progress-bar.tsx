import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';

export type ProgressBarProps = {
  max?: number;
  value?: number;
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
    size: 'sm',
    color: 'blue',
  },
});

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'sm',
  color = 'blue',
  isIndeterminate,
  label,
}: ProgressBarProps) {
  const fillPercentage = (value * 100) / max;

  return (
    <div className="gi-progress-bar-container">
      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
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
      {label && <span>{label}</span>}
    </div>
  );
}
