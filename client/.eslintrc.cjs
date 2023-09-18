/* eslint-env node */

module.exports = {
  env: { browser: true, node: true, es2020: true },
  parser: '@typescript-eslint/parser',
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': ['warn'],

    // TODO: temporarily disabled
    'react/prop-types': 0,
    'react/display-name': 0,
  },
}
