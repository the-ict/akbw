import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/shared/config/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './src/shared/config/i18n/messages/uz.json',
  },
});

export default withNextIntl(nextConfig);
