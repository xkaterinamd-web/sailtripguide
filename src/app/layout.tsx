import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sailtripguide.com'),
  title: 'SailTripGuide — Find Your Boat Rental',
  description: 'Find the best boat rental deals on GetMyBoat, Boatsetter, and Boatbookings.',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
