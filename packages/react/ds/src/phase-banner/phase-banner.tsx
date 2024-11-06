export type PhaseBannerProps = {
  level: 'alpha' | 'beta';
  children: React.ReactNode;
};

export function PhaseBanner({ level, children }: PhaseBannerProps) {
  return (
    <div data-testid="phase-banner" className="gi-phase-banner-container">
      <div className="gi-phase-banner">{level}</div>
      <div>{children}</div>
    </div>
  );
}
