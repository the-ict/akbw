import { Inter } from 'next/font/google';

// Inter font for UI elements - AKBW brand standard
const inter = Inter({
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export { inter };
