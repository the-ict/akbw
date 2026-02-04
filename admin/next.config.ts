import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Suppress DEP0169: url.parse() behavior is not standardized
const originalEmit = process.emit;
// @ts-expect-error - process.emit types are complex
process.emit = (name: any, data: any, ...args: any[]) => {
  if (
    name === 'warning' &&
    typeof data === 'object' &&
    data?.name === 'DeprecationWarning' &&
    data.message.includes('url.parse()')
  ) {
    return false;
  }
  return (originalEmit as any).apply(process, [name, data, ...args]);
};

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
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
