import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import '@govie-ds/theme-govie/theme.css';
import { Container } from '@/components/chrome/container';
import { Footer } from '@/components/chrome/footer';
import { TopBar } from '@/components/chrome/top-bar';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
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
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${lato.className} transition duration-500 bg-white h-full`}
        // style={{ backgroundColor: "var(--ods-surface-primary)" }}
      >
        <ThemeProvider>
          <div className="flex flex-col gap-2xl h-full">
            <TopBar />
            <Container as="main" className="grow">
              {children}
            </Container>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
