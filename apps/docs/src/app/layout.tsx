import AnalyticsProvider from '@/components/analytics-provider';
import { GovieLink } from '@/components/navigation/custom-link';
import {
  Footer,
  HeaderProps,
  LoadFonts,
  Stack,
} from '@ogcio/design-system-react';
import '@ogcio/design-system-react/styles.css';
import '@ogcio/theme-govie/theme.css';
import type { Metadata } from 'next';
import './globals.css';
import CookieConsent from '@/components/cookies/cookie-consent';
import { Suspense } from 'react';
import { DocsHeader } from '@/components/navigation/header';

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
  const headerProps: HeaderProps = {
    fullWidth: true,
    title: 'Design System',
    logo: {
      href: '/',
    },
    items: [
      {
        label: 'Get Started',
        itemType: 'link',
        href: '/get-started/',
      },
      {
        label: 'Foundations',
        itemType: 'link',
        href: '/foundations/',
      },
      {
        label: 'Components',
        itemType: 'link',
        href: '/components/',
      },
      {
        label: 'Patterns',
        itemType: 'link',
        href: '/patterns/',
      },
      {
        label: 'Themes',
        itemType: 'link',
        href: '/themes/',
      },
      {
        label: 'Resources',
        itemType: 'link',
        href: '/resources/',
      },
    ],
  };

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
      label: 'Cookies Policy',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <LoadFonts />
      </head>
      <body
        className={`transition duration-500 h-screen flex flex-col bg-white`}
      >
        <Suspense>
          <AnalyticsProvider>
            <CookieConsent />
            <a href="#main" className="sr-only">
              Skip to main content
            </a>
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
                    <GovieLink
                      noColor
                      aria-label={link.label}
                      href={link.href}
                      key={`footerlink-${index}`}
                    >
                      {link.label}
                    </GovieLink>
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
