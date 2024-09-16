export function PhaseBanner({
  level,
  children,
}: {
  level: 'alpha' | 'beta';
  children: React.ReactNode;
}) {
  return (
    <div
      className={`gi-flex gi-items-center gi-gap-2 gi-font-primary gi-border-b-xs gi-py-2`}
    >
      <div
        className={`gi-text-white gi-tracking-wider gi-bg-blue-600 gi-px-2 gi-rounded`}
      >
        {level}
      </div>
      <div>{children}</div>
    </div>
  );
}
