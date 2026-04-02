/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Caveat', 'cursive'],
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              color: '#e2e8f0',
              backgroundColor: '#1e293b',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
