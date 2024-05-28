export function Button({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-center sm:text-left bg-emerald-800 hover:bg-emerald-900 text-md text-white no-underline rounded p-xl py-sm cursor-pointer block sm:inline-block"
      style={{
        boxShadow: "0 2px 0 #0b0c0c", // TODO: use shadow token
      }}
    >
      {children}
    </a>
  );
}
