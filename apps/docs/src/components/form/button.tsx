import { cn } from "@/lib/cn";

export function Button({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "bg-emerald-800 hover:bg-emerald-900 text-md text-white",
        "no-underline rounded p-xl py-sm cursor-pointer block sm:inline-block"
      )}
      style={{
        boxShadow: "0 2px 0 #0b0c0c", // TODO: use shadow token
      }}
    >
      <span className="flex gap-lg items-center justify-center sm:justify-start">
        {children}
        {icon}
      </span>
    </a>
  );
}
