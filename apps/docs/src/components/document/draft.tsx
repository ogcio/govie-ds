import { cn } from '@/lib/cn';

export function Draft() {
  return (
    <span
      className={cn(
        `px-lg py-xs text-sm font-semibold rounded`,
        'text-gray-700 bg-gray-100',
      )}
    >
      Draft
    </span>
  );
}
