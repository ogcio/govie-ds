import { cn } from '@/lib/cn';

export type DocumentStatusProps = {
  status: 'coming-soon' | 'in-development';
};

export function DocumentStatus({ status }: DocumentStatusProps) {
  return (
    <span
      className={cn(
        `px-lg py-xs text-sm font-semibold rounded`,
        status === 'in-development' ? 'text-blue-700 bg-blue-100' : undefined,
        status === 'coming-soon'
          ? 'text-emerald-700 bg-emerald-100'
          : undefined,
      )}
    >
      {status === 'coming-soon' ? 'Coming Soon' : 'In Development'}
    </span>
  );
}
