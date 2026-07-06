import AnalyticsProvider from '@/components/analytics-provider';
import { Footer, HeaderProps, Stack } from '@ogcio/design-system-react';
import '@ogcio/design-system-react/styles.css';
import '@ogcio/theme-govie/theme.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import CookieConsent from '@/components/cookies/cookie-consent';
import { Suspense } from 'react';
import { DocsHeader } from '@/components/navigation/header';
import { Link } from '@ogcio/design-system-react/next';
import NextLink from 'next/link';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Government of Ireland Design System',
  description:
    'A design system for the GOV.IE. We make it easier to build accessible, mobile-friendly government websites.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerLinks = [
    {
      label: 'Help',
      href: '/help/',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy-policy/',
    },
    {
      label: 'Cookies',
      href: '/cookies-policy/',
    },
    {
      label: 'Accessibility statement',
      href: '/accessibility-statement/',
    },
    {
      label: 'Contact',
      href: '/contact/',
    },
    {
      label: 'Government digital service',
      href: '/government-digital-service/',
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning className={lato.className}>
      <body
        className={`transition duration-500 h-screen flex flex-col bg-white`}
      >
        <Suspense>
          <AnalyticsProvider>
            <CookieConsent />
            <Link href="#main" className="sr-only">
              Skip to main content
            </Link>
            <DocsHeader />
            {children}
            <Footer
              secondarySlot={
                <Stack
                  direction={{ base: 'column', md: 'row', xs: 'column' }}
                  gap={4}
                  wrap
                >
                  {footerLinks.map((link, index) => (
                    <Link
                      asChild
                      variant="inline"
                      appearance="inherit"
                      ariaLabel={link.label}
                      href={link.href}
                      key={`footerlink-${index}`}
                    >
                      <NextLink href={link.href}>{link.label}</NextLink>
                    </Link>
                  ))}
                </Stack>
              }
              utilitySlot={
                <Stack
                  direction={{ base: 'column', md: 'row', xs: 'column' }}
                  gap={4}
                  itemsDistribution="center"
                >
                  <div className="gi-text-sm">
                    © {new Date().getFullYear()} Design System of Government of
                    Ireland.
                  </div>
                </Stack>
              }
            />
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}
