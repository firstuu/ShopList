import type { Config } from 'tailwindcss';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#E5E5E5',
        background: '#F5F5F5',
        'accent-green': '#52B788',
        'accent-blue': '#3B82F6',
        'accent-red': 'E63946',
      },
      maxWidth: {
        '8xl': '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
