import { Footer, Header } from '@govie-ds/react';
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
  `${publicRuntimeConfig.basePath || ''}${path}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerProps = {
    fullWidth: true,
    title: 'Design System',
    logo: {
      href: getLink('/'),
    },
    navLinks: [
      {
        href: getLink('/get-started'),
        label: 'Get Started',
      },
      {
        href: getLink('/foundations'),
        label: 'Foundations',
      },
      {
        href: getLink('/components'),
        label: 'Components',
      },
      {
        href: getLink('/patterns'),
        label: 'Patterns',
      },
      {
        href: getLink('/resources'),
        label: 'Resources',
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
    <html
      lang="en"
      className="h-full overflow-y-scroll"
      suppressHydrationWarning
    >
      <body
        className={`${lato.variable} ${lato.className} transition duration-500 bg-white h-full`}
      >
        <Header {...headerProps} />
        {children}
        <Footer links={footerLinks} />
      </body>
    </html>
  );
}
