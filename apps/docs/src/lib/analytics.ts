import { Analytics as MatomoAnalytics } from '@ogcio/analytics-sdk';
import {
  isConsentGiven,
  CookieCategory,
  ConsentChangeEvent,
} from '../utils/cookieConsent';
import { useEffect } from 'react';

export type AnalyticEvent = {
  category: string;
  action: string;
  name?: string;
  value?: number;
};

export class Analytics {
  private initialized: boolean = false;
  private matomoAnalytics: MatomoAnalytics | undefined;

  async init(): Promise<void> {
    if (this.initialized) return;

    if (globalThis.window) {
      try {
        this.matomoAnalytics = new MatomoAnalytics({
          baseUrl: process.env.NEXT_PUBLIC_API_URL!,
          trackingWebsiteId: process.env.NEXT_PUBLIC_TRACKING_WEBSITE_ID,
          organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
        });

        if (isConsentGiven('analytics')) {
          await this.matomoAnalytics.initClientTracker();
          console.log('Analytics initialized');
        }

        const handleConsentChange = async (
          event: ConsentChangeEvent,
        ): Promise<void> => {
          if (event.detail.status === 'all' && isConsentGiven('analytics')) {
            await this.matomoAnalytics?.initClientTracker();
            console.log('Analytics initialized');

            globalThis.window.removeEventListener(
              'consentStatusChanged',
              (event) => handleConsentChange(event as ConsentChangeEvent),
            );
          }
        };

        globalThis.window.addEventListener('consentStatusChanged', (event) =>
          handleConsentChange(event as ConsentChangeEvent),
        );

        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    }
  }

  async trackPageView(path: string): Promise<void> {
    if (isConsentGiven('analytics')) {
      if (!this.initialized) {
        console.warn('Analytics not initialized, skipping page view tracking');
        return;
      }
      console.log(`Page view tracked: ${path}`);

      await this.matomoAnalytics?.track.pageView({
        event: {
          title: path,
        },
      });
    }
  }

  async trackEvent(event: AnalyticEvent): Promise<void> {
    if (isConsentGiven('analytics')) {
      if (!this.initialized) {
        console.warn('Analytics not initialized, skipping event tracking');
        return;
      }
      console.log(`Event tracked: ${event}`);

      await this.matomoAnalytics?.track.event({ event });
    }
  }
}

// Create a singleton instance
const analytics = new Analytics();
export default analytics;
