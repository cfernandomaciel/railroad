module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 'off',
    'no-prototype-builtins': 'off',
    'no-console': 'off',
    'padded-blocks': 'off',
    'no-trailing-spaces': 'off',
    'array-callback-return': 'off',
    'no-useless-escape': 'warn'
  },
};
