'use client';
import analytics from '@/lib/analytics';
import { config } from '@/lib/config';
import { Heading, Link, Paragraph } from '@ogcio/design-system-react';

export default function ContactPage() {
  return (
    <main className="gi-layout-container flex-1 py-6 lg:py-8">
      <Heading>Contact</Heading>
      <Paragraph className="mt-2">
        You can contact the design system team using{' '}
        <Link
          external
          href={config.signUpFormUrl}
          onClick={() => {
            analytics.trackEvent({
              category: 'contact',
              action: 'click',
            });
          }}
        >
          this form
        </Link>
        .
      </Paragraph>
    </main>
  );
}
