/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Deep, cool neutral used for text, dark sections, and the footer.
        // Warmer and less severe than pure slate, so the dark bands read as
        // considered rather than default-bootstrap.
        ink: {
          50: '#f5f7fa',
          100: '#e9edf3',
          200: '#cfd7e3',
          300: '#a7b4c8',
          400: '#7688a4',
          500: '#556785',
          600: '#42526c',
          700: '#364357',
          800: '#2d3849',
          900: '#1c2432',
          950: '#0f1620',
        },
        // The action colour. Anchored on the site's existing teal-600 so the
        // brand stays recognisable, but given a full scale to work with.
        accent: {
          50: '#effcf9',
          100: '#c9f4ec',
          200: '#96e8dc',
          300: '#5bd5c6',
          400: '#2dbcac',
          500: '#14a08f',
          600: '#0d8175',
          700: '#106861',
          800: '#12534e',
          900: '#134541',
          950: '#032926',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 22 32 / 0.04), 0 8px 24px -12px rgb(15 22 32 / 0.12)',
        lift: '0 2px 4px 0 rgb(15 22 32 / 0.04), 0 16px 40px -16px rgb(15 22 32 / 0.20)',
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              color: '#e2e8f0',
              backgroundColor: '#1c2432',
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
