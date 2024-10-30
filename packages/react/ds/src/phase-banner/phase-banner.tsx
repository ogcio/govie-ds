export type PhaseBannerProps = {
  level: 'alpha' | 'beta';
  children: React.ReactNode;
};

export function PhaseBanner({ level, children }: PhaseBannerProps) {
  return (
    <div
      data-testid="phase-banner"
      className={`gi-flex gi-items-center gi-gap-2 gi-border-b-xs gi-py-2`}
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
