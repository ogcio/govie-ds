import { Analytics as MatomoAnalytics } from '@ogcio/analytics-sdk';

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

    if (typeof window !== 'undefined') {
      try {
        this.matomoAnalytics = new MatomoAnalytics({
          baseUrl: process.env.NEXT_PUBLIC_API_URL!,
          trackingWebsiteId: process.env.NEXT_PUBLIC_TRACKING_WEBSITE_ID,
          organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
        });

        await this.matomoAnalytics.initClientTracker();

        console.log('Analytics initialized');
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    }
  }

  async trackPageView(path: string): Promise<void> {
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

  async trackEvent(event: AnalyticEvent): Promise<void> {
    if (!this.initialized) {
      console.warn('Analytics not initialized, skipping event tracking');
      return;
    }
    console.log(`Event tracked: ${event}`);

    await this.matomoAnalytics?.track.event({ event });
  }
}

// Create a singleton instance
const analytics = new Analytics();
export default analytics;
