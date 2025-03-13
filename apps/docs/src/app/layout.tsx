import { Anchor, Footer, Header, HeaderProps } from '@govie-ds/react';
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
        className={`${lato.variable} ${lato.className} transition duration-500 bg-white h-full`}
      >
        <a href="#main" className="sr-only">
          Skip to main content
        </a>
        <Header {...headerProps} addDefaultMobileMenu />
        {children}
        <Footer
          secondarySlot={
            <div className="gi-flex gi-flex-col md:gi-flex-row gi-space-y-4 md:gi-space-y-0 md:gi-space-x-6">
              <Anchor aria-label="About Us" href="/about-us">
                About Us
              </Anchor>
              <Anchor aria-label="Contact" href="/contact">
                Contact
              </Anchor>
              <Anchor aria-label="Sitemap" href="/sitemap">
                Sitemap
              </Anchor>
            </div>
          }
          utilitySlot={
            <div className="gi-flex gi-flex-col md:gi-flex-row gi-items-center gi-justify-between gi-space-y-4 md:gi-space-y-0 gi-py-4">
              <div className="gi-flex gi-flex-row gi-space-x-6 gi-text-sm">
                <Anchor aria-label="Privacy Policy" href="/privacy-policy">
                  Privacy Policy
                </Anchor>
                <Anchor aria-label="Accessibility" href="/accessibility">
                  Accessibility
                </Anchor>
                <div className="gi-text-sm">© 2025 Government of Ireland.</div>
              </div>
            </div>
          }
        />
      </body>
    </html>
  );
}
