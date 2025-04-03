import { Footer, Header, HeaderProps, Link } from '@govie-ds/react';
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
      <body
        className={`${lato.variable} ${lato.className} transition duration-500 h-screen flex flex-col bg-white`}
      >
        <a href="#main" className="sr-only">
          Skip to main content
        </a>
        <Header {...headerProps} addDefaultMobileMenu />
        {children}
        <Footer
          secondarySlot={
            <div className="gi-flex gi-flex-row gi-gap-y-2 gi-gap-4">
              {footerLinks.map((link, index) => (
                <Link
                  noColor
                  aria-label={link.label}
                  href={link.href}
                  key={`footerlink-${index}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          }
          utilitySlot={
            <div className="gi-flex gi-flex-row gi-gap-4 gi-justify-center gi-flex-wrap">
              <div className="gi-text-sm">
                © {new Date().getFullYear()} Design System of Government of
                Ireland.
              </div>
            </div>
          }
        />
      </body>
    </html>
  );
}
