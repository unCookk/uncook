/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      keyframes: {
        'scale-up': {
          '0%': {
            transform: 'scale(0.5)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'scale-up-center': {
          '0%': {
            transform: 'scale(0.3)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'scale-up-bounce': {
          '0%': {
            transform: 'scale(0.3)',
            opacity: '0',
          },
          '70%': {
            transform: 'scale(1.1)',
          },
          '85%': {
            transform: 'scale(0.95)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        'scale-up': 'scale-up 0.2s ease-out',
        'scale-up-center': 'scale-up-center 0.3s ease-out',
        'scale-up-bounce': 'scale-up-bounce 0.4s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
} satisfies Config
