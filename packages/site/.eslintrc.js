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
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/no-unnecessary-type-constraint': 0,
    '@typescript-eslint/no-shadow': 0,
    'import/no-named-as-default': 0,
    'no-void': 0,
    'import/extensions': 0,
  },
};
