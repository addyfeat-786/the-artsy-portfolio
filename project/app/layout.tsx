import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Providers from '@/components/providers/providers';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'THE ARTSY — Motion Designer · Visual Storyteller · Creative Director',
  description:
    'The Artsy is a multidisciplinary studio crafting motion graphics, video editing, brand identity, and photography for forward-thinking brands.',
  keywords: [
    'motion graphics',
    'video editing',
    'graphic design',
    'photography',
    'creative director',
    'brand identity',
    'portfolio',
  ],
  authors: [{ name: 'The Artsy' }],
  openGraph: {
    title: 'THE ARTSY — Motion Designer · Visual Storyteller · Creative Director',
    description:
      'A multidisciplinary studio crafting motion graphics, video editing, brand identity, and photography.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE ARTSY',
    description: 'Motion Designer · Visual Storyteller · Creative Director',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
