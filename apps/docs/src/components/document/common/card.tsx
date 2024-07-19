import { Link } from '@/components/typography/link';

export function Card({
  href,
  label,
  children,
}: {
  href?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-md items-center justify-center bg-gray-50 p-xl rounded">
      {children}
      {href ? (
        <div>
          <Link href={href}>{label}</Link>
        </div>
      ) : null}
    </div>
  );
}
