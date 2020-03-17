module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    project: 'tsconfig.json',
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error'],

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
        ],
      },
    ],
  },
};
