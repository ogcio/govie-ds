// components/AnalyticsProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import analytics from '@/lib/analytics';

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize analytics once on component mount
  useEffect(() => {
    const initAnalytics = async () => {
      try {
        await analytics.init();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };

    initAnalytics();
  }, []);

  // Track page views when route changes or after initialization
  useEffect(() => {
    if (isInitialized && pathname) {
      const url = searchParams?.size ? `${pathname}?${searchParams}` : pathname;
      analytics.trackPageView(url);
    }
  }, [pathname, searchParams, isInitialized]);

  return <>{children}</>;
}
