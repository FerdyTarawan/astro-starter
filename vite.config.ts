import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    astro: true,
    sortImports: {},
    sortTailwindcss: { stylesheet: './src/styles/global.css' },
    ignorePatterns: [
      'pnpm-lock.yaml',
      'dist/**',
      '.astro/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  lint: {
    plugins: ['typescript', 'react', 'unicorn', 'oxc', 'import', 'jsx-a11y', 'vitest'],
    categories: { correctness: 'error' },
    rules: { 'react/rules-of-hooks': 'error', 'react/exhaustive-deps': 'warn' },
    ignorePatterns: ['dist/**', '.astro/**', 'playwright-report/**', 'test-results/**'],
  },
});
