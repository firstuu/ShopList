import { Luckiest_Guy } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const LuckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'ShopList',
  description: 'Twoje listy zakupowe w jednym miejscu!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${LuckiestGuy.className} h-dvh max-h-dvh antialiased`}>{children}</body>
    </html>
  );
}
