const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    webextensions: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'sort-keys-fix',
    'react-hooks'
  ],
  root: true,
  rules: {
    "import/no-unresolved": OFF,
    "import/prefer-default-export": OFF,
    "import/no-cycle": OFF,
    "import/no-default-export": ERROR,
    "max-classes-per-file": OFF,
    "max-len": OFF,
    "newline-before-return": [ERROR],
    "no-console": [WARN, { allow: ["info", "warn"] }],
    "no-multiple-empty-lines": [WARN, { max: 1, maxBOF: 0, maxEOF: 0 }],
    "no-shadow": OFF,
    "react/button-has-type": [WARN, {
      "button": true,
      "submit": true,
      "reset": true,
    }],
    "react/destructuring-assignment": OFF,
    "react/no-unused-state": OFF,
    "react/state-in-constructor": OFF,
    "react-hooks/rules-of-hooks": ERROR,
    "react-hooks/exhaustive-deps": WARN,
    "sort-keys": [WARN, "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}],
    "sort-keys-fix/sort-keys-fix": WARN,
  },
  settings: {
    react: {
      pragma: 'h',
    },
  },
};
