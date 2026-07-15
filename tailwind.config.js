/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone:       'var(--bone)',
        paper:      'var(--paper)',
        ink:        'var(--ink)',
        steel:      'var(--steel)',
        hairline:   'var(--hairline)',
        volt:        'var(--volt)',
        'volt-ink':  'var(--volt-ink)',
        'volt-soft': 'var(--volt-soft)',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body:    ['"Inter Tight"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        '13': ['13px', { lineHeight: '1.5' }],
        '15': ['15px', { lineHeight: '1.5' }],
        '17': ['17px', { lineHeight: '1.6' }],
        '22': ['22px', { lineHeight: '1.3' }],
        '32': ['32px', { lineHeight: '1.15' }],
        '48': ['48px', { lineHeight: '1.05' }],
        '64': ['64px', { lineHeight: '1.0' }],
      },
      borderColor: {
        DEFAULT: 'var(--hairline)',
      },
    },
  },
  plugins: [],
}

