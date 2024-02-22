// cSpell:disable
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'space-mono': ['"Space Mono"'],
      },
      colors: {
        'bkg': 'hsl(var(--color-bkg) / <alpha-value>)',
        'dark-blue': 'hsl(var(--color-dark-blue) / <alpha-value>)',
        'dark-text': 'hsl(var(--color-dark-text) / <alpha-value>)',
        'primary-blue': 'hsl(var(--color-primary-blue) / <alpha-value>)',
        'accent-blue': 'hsl(var(--color-accent-blue) / <alpha-value>)',
        'blue-pale': 'hsl(var(--color-blue-pale) / <alpha-value>)',
        'white': 'hsl(var(--color-white) / <alpha-value>)',
        'bkg-white': 'hsl(var(--color-bkg-white) / <alpha-value>)',
        'offwhite': 'hsl(var(--color-offwhite) / <alpha-value>)',
        'dark-input': 'hsl(var(--color-dark-input) / <alpha-value>)',
        'bkg-dark': 'hsl(var(--color-bkg-dark) / <alpha-value>)',
        'primary-dark': 'hsl(var(--color-primary-dark) / <alpha-value>)',
      }
    },
  },
  plugins: []
};