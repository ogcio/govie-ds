import { Footer, Header } from '@govie-ds/react';
import '@govie-ds/react/styles.css';
import '@govie-ds/theme-govie/theme.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';

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

const headerProps = {
  fullWidth: true,
  title: 'Design System',
  logo: {
    href: '/',
  },
  navLinks: [
    {
      href: '/get-started',
      label: 'Get Started',
    },
    {
      href: '/foundations',
      label: 'Foundations',
    },
    {
      href: '/components',
      label: 'Components',
    },
    {
      href: '/patterns',
      label: 'Patterns',
    },
    {
      href: '/resources',
      label: 'Resources',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
