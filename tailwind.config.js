/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        gold: 'var(--gold)',
        stone: 'var(--stone)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Garamond', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
        prose: '62ch',
      },
      boxShadow: {
        hard: '6px 6px 0 0 var(--ink)',
        'hard-hover': '8px 8px 0 0 var(--ink)',
        'hard-gold': '6px 6px 0 0 var(--gold)',
        'hard-gold-hover': '8px 8px 0 0 var(--gold)',
        'hard-paper': '6px 6px 0 0 var(--paper)',
      },
      borderRadius: {
        none: '0', DEFAULT: '0', sm: '0', md: '0', lg: '0', xl: '0', '2xl': '0', '3xl': '0', full: '0',
      },
      letterSpacing: {
        mono: '0.18em',
        tightest: '-0.02em',
      },
      lineHeight: {
        display: '0.95',
      },
    },
  },
  plugins: [],
};
