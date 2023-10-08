import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FCFCFC',
      'main-purple': '#8A47CD',
      'secondary-purple': '#6750A4',
      'light-purple': '#D0BFE1',
      'dark-purple': '#0E051D',
      'gray-purple': '#2D243D',
      'dark-gray': '#49454F',
      'light-gray': '#B7B3BE',
      'very-light-gray': '#E7E7E7',
      'color-cm': '#ADB0F4',
      'color-td': '#E9CCA0',
      'color-tp': '#C4E4AA',
      'color-ds': '#F5D45E',
      'color-ex': '#F07676',
      'color-au': '#E27EF2',
    },
    extend: {
      boxShadow: {
        card: '0px 4px 6px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
