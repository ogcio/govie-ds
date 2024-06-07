import { cn } from '@/lib/cn';

export function Prose({
  as: As = 'div',
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <As className={cn('prose md:prose-lg lg:prose-xl', className)}>
      {children}
    </As>
  );
}
