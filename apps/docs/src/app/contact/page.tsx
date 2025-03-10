import { Heading, Link, Paragraph } from '@govie-ds/react';
import { Metadata } from 'next';
import { config } from '@/lib/config';
import { getTitle } from '@/lib/documents';

export const metadata: Metadata = {
  title: getTitle('Contact us'),
  description: 'Contact us',
};

export default function ContactPage() {
  return (
    <main className="gi-layout-container flex-1 py-6 lg:py-8">
      <Heading>Contact</Heading>
      <Paragraph className="mt-2">
        You can contact the design system team using{' '}
        <Link external href={config.signUpFormUrl}>
          this form
        </Link>
        .
      </Paragraph>
    </main>
  );
}
