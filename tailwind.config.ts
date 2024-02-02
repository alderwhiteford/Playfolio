import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fadeInFast': 'fadeInDown 0.5s ease-in-out',
        'fadeInSlow': 'fadeInDown 1s ease-in-out',
        'fadeInRight': 'fadeInRight 1s ease-in-out',
        'fadeIn': 'fadeIn 0.25s ease-in-out',
      },
      keyframes: {
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0px)'
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          }
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)'
          }
        },
      },
    },
  },
  plugins: [],
}
export default config
