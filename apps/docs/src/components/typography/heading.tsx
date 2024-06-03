import { cn } from '@/lib/cn';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export function Heading({
  as: As = 'h2',
  children,
  className,
}: {
  as?: HeadingAs;
  children: React.ReactNode;
  className?: string;
}) {
  const sizes: Record<HeadingAs, string> = {
    h1: 'text-4xl',
    h2: 'text-2xl',
    h3: 'text-lg',
    h4: 'text-md',
    h5: 'text-sm',
    h6: 'text-xs',
  };

  return (
    <As className={cn(sizes[As], 'text-gray-950', className)}>{children}</As>
  );
}
