import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { tv } from 'tailwind-variants';
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
  const { container, bar, indeterminate } = styles({ isIndeterminate });
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
        className={cn(bar(), className)}
        data-testid={dataTestid}
        {...props}
      >
        <div
          className={indeterminate()}
          style={isIndeterminate ? {} : { width: `${fillPercentage}%` }}
        />
      </div>
      {label && <span>{label}</span>}
    </div>
  );
}

const styles = tv({
  slots: {
    container: 'gi-flex gi-items-center gi-flex-col',
    bar: 'gi-w-full gi-bg-gray-400 gi-overflow-hidden gi-rounded-sm gi-h-1',
    indeterminate: 'gi-transition-all gi-bg-gray-950 gi-h-1 gi-rounded-sm',
    label: 'gi-mt-2 gi-text-sm gi-text-gray-950',
  },
  variants: {
    isIndeterminate: {
      true: {
        indeterminate:
          'gi-relative gi-overflow-hidden gi-w-1/4 gi-animate-indeterminate-progress',
      },
    },
  },
});
