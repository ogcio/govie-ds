import { Footer, Header, HeaderProps } from '@govie-ds/react';
import '@govie-ds/react/styles.css';
import '@govie-ds/theme-govie/theme.css';
import type { Metadata } from 'next';
import getConfig from 'next/config';
import { Lato } from 'next/font/google';
import './globals.css';

const { publicRuntimeConfig } = getConfig();

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--gieds-font-family-primary',
});

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Design System',
};

const getLink = (path: string) =>
  `${publicRuntimeConfig?.basePath || ''}${path}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerProps: HeaderProps = {
    fullWidth: true,
    title: 'Design System',
    logo: {
      href: getLink('/'),
    },
    items: [
      {
        label: 'Get Started',
        itemType: 'link',
        details: {
          href: getLink('/get-started'),
        },
      },
      {
        label: 'Foundations',
        itemType: 'link',
        details: {
          href: getLink('/foundations'),
        },
      },
      {
        label: 'Components',
        itemType: 'link',
        details: {
          href: getLink('/components'),
        },
      },
      {
        label: 'Patterns',
        itemType: 'link',
        details: {
          href: getLink('/patterns'),
        },
      },
      {
        label: 'Resources',
        itemType: 'link',
        details: {
          href: getLink('/resources'),
        },
      },
    ],
  };

  const footerLinks = [
    {
      label: 'Help',
      href: getLink('/help'),
    },
    {
      label: 'Privacy Policy',
      href: getLink('/privacy-policy'),
    },
    {
      label: 'Cookies Policy',
      href: getLink('/cookies-policy'),
    },
    {
      label: 'Accessibility statement',
      href: getLink('/accessibility-statement'),
    },
    {
      label: 'Contact',
      href: getLink('/contact'),
    },
    {
      label: 'Government digital service',
      href: getLink('/government-digital-service'),
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${lato.className} transition duration-500 bg-white h-full`}
      >
        <a href="#main" className="sr-only">
          Skip to main content
        </a>
        <Header {...headerProps} addDefaultMobileMenu />
        {children}
        <Footer links={footerLinks} />
      </body>
    </html>
  );
}
