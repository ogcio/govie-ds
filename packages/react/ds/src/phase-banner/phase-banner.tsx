'use client';

import { Container } from '../container/container.js';
import { useBreakpoint } from '../hooks/use-breakpoint.js';
import { Tag } from '../tag/tag.js';

export type PhaseBannerProps = {
  level: 'Alpha' | 'Beta';
  children: React.ReactNode;
  wrap?: 'none' | 'container' | 'container-full-width';
  padding?: boolean;
};

export function PhaseBanner({
  level,
  children,
  wrap = 'none',
  padding = true,
}: PhaseBannerProps) {
  const { breakpoint } = useBreakpoint();

  const paddingClasses: Record<string, string> = {
    xs: 'gi-px-4',
    sm: 'gi-px-4',
    md: 'gi-px-6',
    lg: 'gi-px-8',
    xl: 'gi-px-8',
  };

  const responsivePadding =
    padding && breakpoint ? paddingClasses[breakpoint] : '';

  const bannerContent = (
    <div
      data-testid="phase-banner"
      className={`gi-phase-banner-container ${responsivePadding}`}
    >
      <Tag text={level} type="info" />
      <div className="gi-phase-banner-content">{children}</div>
    </div>
  );

  if (wrap === 'container') {
    return <Container>{bannerContent}</Container>;
  }

  if (wrap === 'container-full-width') {
    return <Container fullWidth>{bannerContent}</Container>;
  }

  return bannerContent;
}
