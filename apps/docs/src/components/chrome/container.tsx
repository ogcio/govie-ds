import { cn } from "@/lib/cn";

export function Container({
  as: As = "div",
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return <As className={cn("container mx-auto", className)}>{children}</As>;
}
