module.exports = {
  extends: ['../../.eslintrc.js'],

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'jsdoc/require-jsdoc': 0,
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'build/'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/no-named-as-default': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    'no-void': 0,
    '@typescript-eslint/no-unnecessary-type-constraint': 0,
  },
};
