import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Favicon from '/public/favicon.ico';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Convert Excel to String',
  keywords: ['convert', 'excel', 'excel to json', 'excel to string', 'convert excel to json'],
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
