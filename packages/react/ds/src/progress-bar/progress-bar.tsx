import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';

export type ProgressBarProps = {
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'green';
  indeterminate?: boolean;
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
      gray: 'gi-bg-gray-500',
      green: 'gi-bg-emerald-800',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'green',
  },
});

export function ProgressBar({
  value = 0,
  size,
  color,
  indeterminate,
}: ProgressBarProps) {
  return (
    <div
      data-testid="progress-bar"
      className={cn('gi-progress-bar-container', progressBarStyles({ size }))}
    >
      <div
        className={cn(progressBarStyles({ color, size }), {
          'gi-progress-bar-indeterminate': indeterminate,
        })}
        style={indeterminate ? undefined : { width: `${value}%` }}
      />
    </div>
  );
}
