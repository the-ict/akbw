import type {
  Metadata
} from 'next';
import '../globals.css';
import {
  inter
} from '@/shared/config/fonts';
import {
  ThemeProvider
} from '@/shared/config/theme-provider';
import {
  PRODUCT_INFO
} from '@/shared/constants/data';
import {
  hasLocale,
  Locale,
  NextIntlClientProvider
} from 'next-intl';
import {
  routing
} from '@/shared/config/i18n/routing';
import {
  notFound
} from 'next/navigation';
import Footer from '@/widgets/footer/ui';
import Navbar from '@/widgets/navbar/ui';
import {
  ReactNode
} from 'react';
import {
  setRequestLocale
} from 'next-intl/server';
import QueryProvider from '@/shared/config/react-query/QueryProvider';
import Script from 'next/script';
import { Toaster } from '@/shared/ui/toast';

import {
  Kenao,
  Radiant,
  Didot,
  Granjon,
  Rosan,
  Futura
} from '@/shared/fonts';

export const metadata: Metadata = {
  title: PRODUCT_INFO.name + ' - ' + PRODUCT_INFO.fullName,
  description: PRODUCT_INFO.description,
  icons: PRODUCT_INFO.favicon,
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${Kenao.variable} ${Radiant.variable} ${Didot.variable} ${Granjon.variable} ${inter.variable} ${Rosan.variable} ${Futura.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider
            attribute={'class'}
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <Script
        src="https://buttons.github.io/buttons.js"
        strategy="lazyOnload"
        async
        defer
      />
    </html>
  );
}
