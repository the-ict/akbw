import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const Kenao = localFont({
  src: [
    {
      path: '../../../public/fonts/Kenao.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-kenao',
  display: 'swap',
});

export const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const Radiant = localFont({
  src: [
    {
      path: '../../../public/fonts/OPTIRadiant-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-radiant',
  display: 'swap',
});

export const Didot = localFont({
  src: [
    {
      path: '../../../public/fonts/DidotBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-didot',
  display: 'swap',
});

export const Granjon = localFont({
  src: [
    {
      path: '../../../public/fonts/GranjonRoman.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-granjon',
  display: 'swap',
});

export const Rosan = localFont({
  src: [
    {
      path: '../../../public/fonts/Rosan.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-rosan',
  display: 'swap',
});

export const Futura = localFont({
  src: [
    {
      path: '../../../public/fonts/futuralight.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
  display: 'swap',
});
