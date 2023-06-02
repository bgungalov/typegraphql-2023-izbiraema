module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    quotes: ['error', 'single'],
  },
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['build/'],
}
