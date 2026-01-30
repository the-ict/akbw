import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-kenao)', 'sans-serif'],
        kenao: ['var(--font-kenao)', 'sans-serif'],
      },
      colors: {
        'akbw-sand': '#a6a195',
        'akbw-white': '#f6f4f0',
        'akbw-black': '#000000',
        'akbw-gray': '#7C7A74',
        'akbw-olive': '#6B6E5F',
        'akbw-taupe': '#8A847A',
      },
    },
  },
  plugins: [],
}

export default config
