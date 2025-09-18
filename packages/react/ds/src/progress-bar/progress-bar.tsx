import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';

export type ProgressBarProps = {
  max?: number;
  value?: number;
  isIndeterminate?: boolean;
  label?: string;
  dataTestid?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ProgressBar({
  value = 0,
  max = 100,
  isIndeterminate,
  label,
  className,
  dataTestid,
  ...props
}: ProgressBarProps) {
  const fillPercentage = (value * 100) / max;

  return (
    <div className="gi-progress-bar-container">
      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={t('progressBar.progressBar', {
          defaultValue: 'Progress bar',
        })}
        className={cn('gi-progress-bar', className)}
        data-testid={dataTestid}
        {...props}
      >
        <div
          className={cn({
            'gi-progress-bar-indeterminate': isIndeterminate,
          })}
          style={isIndeterminate ? {} : { width: `${fillPercentage}%` }}
        />
      </div>
      {label && <span>{label}</span>}
    </div>
  );
}
