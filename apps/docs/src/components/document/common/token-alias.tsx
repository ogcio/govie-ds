import { cn } from '@/lib/cn';

export function TokenAlias({ name }: { name: string }) {
  return (
    <div
      className={cn(
        'rounded-sm bg-blue-50 px-2xs py-xs lg:px-md lg:py-xs',
        'text-blue-300 text-center text-2xs',
      )}
    >
      {name}
    </div>
  );
}
