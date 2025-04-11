// hooks/useAnalytics.ts
'use client';

import { useEffect, useState } from 'react';
import analytics, { AnalyticEvent } from '@/lib/analytics';

export function useAnalytics() {
  const [isInitialized, setIsInitialized] = useState(false);

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

  return {
    trackEvent: (event: AnalyticEvent) => {
      analytics.trackEvent(event);
    },
    trackPageView: (path: string) => {
      analytics.trackPageView(path);
    },
    isInitialized,
  };
}
