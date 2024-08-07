import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "@govie-ds/theme-govie/theme.css";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${lato.className} h-full`}>{children}</body>
    </html>
  );
}
