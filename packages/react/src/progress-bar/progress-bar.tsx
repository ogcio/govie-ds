import { tv } from 'tailwind-variants';
import { translate as t } from '@/i18n/utility.js';

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
  const { container, bar, progress, progressLabel } = styles({ isIndeterminate });

  return (
    <div className={container()}>
      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={t('progressBar.progressBar', {
          defaultValue: 'Progress bar',
        })}
        className={bar({ class: className })}
        data-testid={dataTestid}
        {...props}
      >
        <div className={progress()} style={isIndeterminate ? {} : { width: `${fillPercentage}%` }} />
      </div>
      {label && <span className={progressLabel()}>{label}</span>}
    </div>
  );
}

const styles = tv({
  slots: {
    container: 'gi-flex gi-items-center gi-flex-col',
    bar: 'gi-w-full gi-bg-gray-400 gi-overflow-hidden gi-rounded-sm gi-h-1',
    progress: 'gi-transition-all gi-bg-gray-950 gi-h-1 gi-rounded-sm',
    progressLabel: 'gi-mt-2 gi-text-sm gi-text-gray-950',
  },
  variants: {
    isIndeterminate: {
      true: {
        progress: 'gi-progress-bar-indeterminate',
      },
    },
  },
});
