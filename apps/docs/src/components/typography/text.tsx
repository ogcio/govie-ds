import { cn } from '@/lib/cn';

export function Text({
  as: As = 'p',
  children,
  className,
}: {
  as?: 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <As className={cn('text-gray-950 text-md max-w-[65ch]', className)}>
      {children}
    </As>
  );
}
