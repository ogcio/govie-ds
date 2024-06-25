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
    <As className={cn('prose xs:prose-xs md:prose-md xl:prose-xl', className)}>
      {children}
    </As>
  );
}
