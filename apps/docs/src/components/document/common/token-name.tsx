import { cn } from '@/lib/cn';

export function TokenName({ name }: { name: string }) {
  return (
    <div
      className={cn(
        'rounded-sm bg-gray-50 border-gray-100 border-xs px-2xs py-xs lg:px-md lg:py-xs',
        'text-gray-600 text-center text-2xs lg:text-sm',
      )}
    >
      {name}
    </div>
  );
}
