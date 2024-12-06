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
    <As
      className={cn(
        'gi-prose xs:gi-prose-xs md:gi-prose-md xl:gi-prose-xl',
        className,
      )}
    >
      {children}
    </As>
  );
}
