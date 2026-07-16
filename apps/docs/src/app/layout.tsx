import AnalyticsProvider from '@/components/analytics-provider';
import { Container, Stack, Text } from '@ogcio/design-system-react';
import {
  Footer,
  FooterSection,
  FooterLogo,
  Link,
} from '@ogcio/design-system-react/next';
import { LogoGoldGreen } from '@ogcio/design-system-react/logos';
import '@ogcio/design-system-react/styles.css';
import '@ogcio/theme-govie/theme.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import CookieConsent from '@/components/cookies/cookie-consent';
import { Suspense } from 'react';
import { DocsHeader } from '@/components/navigation/header';
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
            <Footer>
              <FooterSection>
                <Container>
                  <Stack
                    gap={{ base: 0, md: 4 }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      gap={4}
                      wrap
                    >
                      {footerLinks.map((link, index) => (
                        <Link
                          asChild
                          variant="inline"
                          appearance="inherit"
                          key={`footerlink-${index}`}
                        >
                          <NextLink href={link.href}>{link.label}</NextLink>
                        </Link>
                      ))}
                    </Stack>

                    <FooterLogo>
                      <LogoGoldGreen label="Gov.ie logo" size={181} />
                    </FooterLogo>
                  </Stack>
                </Container>
              </FooterSection>
              <FooterSection
                variant="utility"
                className="gi-flex gi-justify-center"
              >
                <Text size="sm">
                  © {new Date().getFullYear()} Design System of Government of
                  Ireland.
                </Text>
              </FooterSection>
            </Footer>
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}

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
